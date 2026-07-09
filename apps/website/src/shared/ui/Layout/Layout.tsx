import { ReactNode } from 'react';

import s from './Layout.module.css';

export const Layout = (props: { children: ReactNode }) => {
  const { children } = props;

  return <div className={s.root}>{children}</div>;
};
