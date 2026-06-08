import rtkit from 'eslint-config-rtkit';

export default [
  ...rtkit.configs.recommended,
  {
    ignores: ['dist/**'],
  },
];
