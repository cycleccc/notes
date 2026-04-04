import config from '@slidev/client/uno.config';
import { createLocalFontProcessor } from '@unocss/preset-web-fonts/local';
import { mergeConfigs, presetWebFonts } from 'unocss';

export default mergeConfigs([
  config,
  {
    shortcuts: {
      'text-gradient':
        'text-transparent bg-clip-text bg-gradient-to-tl from-amber-300 via-orange-400 to-cyan-300',
      'bg-main': 'bg-white dark:bg-black',
      'border-main': 'border-gray-400 border-opacity-30',
      'bg-faded': 'bg-gray-400 bg-opacity-10',
    },
    presets: [
      presetWebFonts({
        fonts: {
          mono: 'DM Mono',
          sans: 'Inter',
          strong: 'Rubik',
          hand: 'Caveat',
        },
        processors: createLocalFontProcessor(),
      }),
    ],
  },
]);
