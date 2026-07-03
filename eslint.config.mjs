import nextPlugin from '@next/eslint-plugin-next';
import rtkit from 'eslint-config-rtkit';
import boundaries from 'eslint-plugin-boundaries';
import reactHooks from 'eslint-plugin-react-hooks';

export default [
  nextPlugin.configs['core-web-vitals'],
  reactHooks.configs.flat.recommended,
  ...rtkit.configs.recommended,
  { ignores: ['apps/extension/dist/**', 'apps/website/.next/**'] },
  {
    plugins: { boundaries },
    settings: {
      'import/resolver': {
        typescript: {
          project: ['./tsconfig.json'],
        },
      },
      'boundaries/elements': [
        { type: 'cross', pattern: 'src/**/@x/**' },

        { type: 'modules', pattern: 'src/modules/*' },
        { type: 'app', pattern: 'src/app/*' },
        { type: 'screens', pattern: 'src/screens/*' },
        { type: 'widgets', pattern: 'src/widgets/*' },
        { type: 'features', pattern: 'src/features/*' },
        { type: 'entities', pattern: 'src/entities/*' },
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
              from: { type: 'screens' },
              disallow: [{ to: { type: 'screens' } }],
            },
            {
              from: { type: 'widgets' },
              disallow: [
                { to: { type: 'screens' } },
                { to: { type: 'widgets' } },
              ],
            },
            {
              from: { type: 'features' },
              disallow: [
                { to: { type: 'screens' } },
                { to: { type: 'widgets' } },
                { to: { type: 'features' } },
              ],
            },
            {
              from: { type: 'entities' },
              disallow: [
                { to: { type: 'screens' } },
                { to: { type: 'widgets' } },
                { to: { type: 'features' } },
                { to: { type: 'entities' } },
              ],
            },
            {
              from: { type: 'shared' },
              disallow: [
                { to: { type: 'app' } },
                { to: { type: 'modules' } },
                { to: { type: 'screens' } },
                { to: { type: 'widgets' } },
                { to: { type: 'features' } },
                { to: { type: 'entities' } },
              ],
            },
          ],
        },
      ],
    },
  },
];
