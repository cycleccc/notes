// Actual Pi agent loop; scripted model responses; small, custom teaching tools.
// No model service or API key is used. All file changes stay in a fresh temp folder.
import assert from 'node:assert/strict'
import { execFile } from 'node:child_process'
import { mkdtemp, readFile, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { promisify } from 'node:util'
import { runAgentLoop } from '@earendil-works/pi-agent-core'

const exec = promisify(execFile)
const root = await mkdtemp(join(tmpdir(), 'pi-runtime-'))
const before = await readFile(new URL('../parser.before.mjs', import.meta.url), 'utf8')
const check = await readFile(new URL('../check.mjs', import.meta.url), 'utf8')
await writeFile(join(root, 'parser.mjs'), before)
await writeFile(join(root, 'parser.before.mjs'), before)
// Keep every assertion; label the mutable file rather than the original before/after fixture.
const runtimeCheck = check.replace('passed (${variant})', 'passed (parser.mjs)')
assert.notEqual(runtimeCheck, check)
await writeFile(join(root, 'check.mjs'), runtimeCheck)

const textResult = (text, details = {}, isError = false) => ({
  content: [{ type: 'text', text }], details, isError,
})
const object = properties => ({ type: 'object', properties, required: Object.keys(properties), additionalProperties: false })
const string = { type: 'string' }
const tools = [
  {
    name: 'read', label: 'Read', description: 'Read the example parser',
    parameters: object({ path: string }),
    async execute(_id, { path }) {
      assert.equal(path, 'parser.mjs')
      return textResult(await readFile(join(root, path), 'utf8'))
    },
  },
  {
    name: 'bash', label: 'Check', description: 'Run the four parser checks',
    parameters: object({ command: string }),
    async execute(_id, { command }) {
      assert.equal(command, 'node check.mjs')
      try {
        const { stdout } = await exec(process.execPath, ['check.mjs'], { cwd: root, timeout: 10000 })
        return textResult(stdout, { exitCode: 0 })
      }
      catch (error) {
        // An expected test failure is returned to Pi as tool evidence.
        if (error.code !== 1) throw error
        return textResult(error.stdout + error.stderr, { exitCode: 1 }, true)
      }
    },
  },
  {
    name: 'edit', label: 'Edit', description: 'Replace one expression in the parser',
    parameters: object({ path: string, oldText: string, newText: string }),
    async execute(_id, { path, oldText, newText }) {
      assert.equal(path, 'parser.mjs')
      assert.equal(oldText, 'input.trim()')
      assert.equal(newText, "(input ?? '').trim()")
      const current = await readFile(join(root, path), 'utf8')
      assert.equal(current.split(oldText).length, 2)
      await writeFile(join(root, path), current.replace(oldText, newText))
      return textResult('Updated parser.mjs')
    },
  },
]

const calls = [
  ['read', { path: 'parser.mjs' }],
  ['bash', { command: 'node check.mjs' }],
  ['edit', { path: 'parser.mjs', oldText: 'input.trim()', newText: "(input ?? '').trim()" }],
  ['bash', { command: 'node check.mjs' }],
]
const observations = []
const events = []
let turn = 0
// This replaces only the model connection. Pi itself schedules every tool,
// validates arguments, creates toolResult messages and calls this function again.
function scriptedStream(_model, context) {
  const last = context.messages.at(-1)
  if (turn > 0) {
    assert.equal(last.role, 'toolResult')
    assert.equal(last.toolCallId, `call_${turn}`)
    observations.push(structuredClone(last))
    if (turn === 2) assert.match(last.content[0].text, /2\/4 passed/)
    if (turn === 4) assert.match(last.content[0].text, /4\/4 passed/)
  }
  const call = calls[turn]
  const message = {
    role: 'assistant', api: 'openai-responses', provider: 'teaching-fixture', model: 'scripted',
    content: call
      ? [{ type: 'toolCall', id: `call_${turn + 1}`, name: call[0], arguments: call[1] }]
      : [{ type: 'text', text: 'The parser is fixed; the same four checks passed.' }],
    stopReason: call ? 'toolUse' : 'stop', timestamp: Date.now(),
    usage: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0, totalTokens: 0,
      cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0, total: 0 } },
  }
  turn++
  return {
    async *[Symbol.asyncIterator]() { yield { type: 'done', reason: message.stopReason, message } },
    async result() { return message },
  }
}

console.log('Pi core 1.4.0 | scripted model | custom tools | real files and tests')
const messages = await runAgentLoop(
  [{ role: 'user', content: [{ type: 'text', text: 'Fix null inputs and preserve string trimming.' }], timestamp: Date.now() }],
  { messages: [], tools },
  { model: { id: 'scripted', provider: 'teaching-fixture', api: 'openai-responses' },
    convertToLlm: messages => messages, toolExecution: 'sequential' },
  event => {
    events.push(structuredClone(event))
    if (event.type === 'tool_execution_start') console.log(`Pi executes ${event.toolCallId}: ${event.toolName}`)
    if (event.type === 'tool_execution_end') console.log(event.result.content[0].text.trim())
  },
  AbortSignal.timeout(30000),
  scriptedStream,
)
assert.equal(turn, 5)
assert.equal(observations.length, 4)
assert.equal(events.filter(e => e.type === 'tool_execution_end').length, 4)
assert.equal(events.at(-1).type, 'agent_end')
const after = await readFile(join(root, 'parser.mjs'), 'utf8')
assert.equal(after, before.replace('input.trim()', "(input ?? '').trim()"))
const report = {
  runtime: '@earendil-works/pi-agent-core@1.4.0',
  model: 'scripted, no inference', tools: 'custom teaching implementations',
  modelCalls: turn, toolExecutions: observations.length,
  before, after, observations, events, messages,
}
await writeFile(join(root, 'report.json'), JSON.stringify(report, null, 2) + '\n')
if (process.argv.includes('--record')) {
  const snapshot = {
    runtime: report.runtime, model: report.model, tools: report.tools,
    modelCalls: turn, toolExecutions: observations.length, before, after,
    results: observations.map(message => ({
      id: message.toolCallId, tool: message.toolName,
      text: message.content.map(c => c.text ?? '').join('\n'), isError: message.isError,
    })),
    finalEvent: events.at(-1).type,
  }
  await writeFile(new URL('./result.json', import.meta.url), JSON.stringify(snapshot, null, 2) + '\n')
}
console.log(`Verified: 5 model-boundary calls, 4 tool executions, tool results re-entered context.`)
console.log(`Evidence: ${join(root, 'report.json')}`)
