import classNames from 'classnames';
import { ReactNode } from 'react';

import s from './Container.module.css';

type ContainerTag = 'div' | 'section' | 'main';

type Props = {
  children: ReactNode;
  tag?: ContainerTag;
  className?: string;
};

export const Container = (props: Props) => {
  const { children, tag: Tag = 'div', className } = props;

  return <Tag className={classNames(s.root, className)}>{children}</Tag>;
};
