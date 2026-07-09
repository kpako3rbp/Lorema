'use client';

import { ThemeProvider as NextThemeProvider } from 'next-themes';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export const ThemeProvider = (props: Props) => {
  return (
    <NextThemeProvider attribute="data-theme" defaultTheme="system" enableSystem>
      {props.children}
    </NextThemeProvider>
  );
};
