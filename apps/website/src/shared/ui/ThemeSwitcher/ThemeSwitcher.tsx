'use client';

import { Theme } from '@website/shared/model';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';

export const ThemeSwitcher = () => {
  const { setTheme } = useTheme();
  const t = useTranslations('Theme');

  return (
    <div>
      <button onClick={() => setTheme(Theme.light)}>{t(Theme.light)}</button>

      <button onClick={() => setTheme(Theme.dark)}>{t(Theme.dark)}</button>

      <button onClick={() => setTheme(Theme.system)}>{t(Theme.system)}</button>
    </div>
  );
};
