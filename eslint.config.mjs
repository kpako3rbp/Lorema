import rtkit from 'eslint-config-rtkit';
import boundaries from 'eslint-plugin-boundaries';

export default [
  ...rtkit.configs.recommended,
  { ignores: ['apps/extension/dist/**'] },
  {
    plugins: { boundaries },
    settings: {
      'import/resolver': {
        typescript: {
          project: ['./tsconfig.json'],
        },
      },
      'boundaries/elements': [
        { type: 'app', pattern: 'src/app/*' },
        { type: 'modules', pattern: 'src/modules/*' },
        { type: 'shared', pattern: 'src/shared/*' },
      ],
    },
    rules: {
      'import/no-cycle': 'error',
      'boundaries/dependencies': [
        'error',
        {
          default: 'allow',
          rules: [
            {
              from: { type: 'app' },
              disallow: [{ to: { type: 'app' } }],
            },
            {
              from: { type: 'modules' },
              disallow: [{ to: { type: 'app' } }],
            },
            {
              from: { type: 'shared' },
              disallow: [{ to: { type: 'app' } }, { to: { type: 'modules' } }],
            },
          ],
        },
      ],
    },
  },
];
