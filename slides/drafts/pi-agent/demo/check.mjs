import assert from 'node:assert/strict';

const variant = process.argv[2] ?? 'after';
if (!['before', 'after'].includes(variant)) {
  throw new Error('Usage: node demo/check.mjs [before|after]');
}
const { parse } = await import(variant === 'before' ? './parser.before.mjs' : './parser.mjs');
const cases = [
  ['undefined', undefined, ''],
  ['null', null, ''],
  ['empty', '', ''],
  ['trim', '  pi  ', 'pi'],
];
let failures = 0;
for (const [name, input, expected] of cases) {
  try {
    assert.equal(parse(input), expected);
    console.log(`PASS ${name}`);
  } catch (error) {
    failures += 1;
    console.log(`FAIL ${name}: ${error.message}`);
  }
}
console.log(`${cases.length - failures}/${cases.length} passed (${variant})`);
process.exitCode = failures ? 1 : 0;
