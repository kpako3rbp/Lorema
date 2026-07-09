import classNames from 'classnames';
import { ElementType, ReactNode } from 'react';

import s from './Typography.module.css';

type TypographyColor = 'black' | 'grey' | 'white';
// type TypographyVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'sm' | 'md' | 'lg';

type Props = {
  as?: ElementType;
  // variant?: TypographyVariant;
  color?: TypographyColor;
  size?: number;
  children: ReactNode;
  lineHeight?: number;
  className?: string;
};

export const Typography = (props: Props) => {
  const { as: Tag = 'p', size = 15, color = 'black', children, lineHeight, className } = props;

  return (
    <Tag
      style={{ fontSize: size, lineHeight: lineHeight ?? `${size * 2.2}px` }}
      className={classNames(s.root, s[color], className)}
    >
      {children}
    </Tag>
  );
};
