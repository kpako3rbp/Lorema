import classNames from 'classnames';
import Link from 'next/link';
import { ReactNode } from 'react';

import s from './Button.module.css';

type Size = 'sm' | 'md' | 'lg';
type Radius = 'sm' | 'md' | 'lg';
type Variant = 'outline' | 'gradient';

type BaseProps = {
  className?: string;
  children?: ReactNode;
  icon?: ReactNode;
  size?: Size;
  radius: Radius;
  variant: Variant;
};

type ButtonProps = BaseProps & { onClick: () => void };

type ButtonLinkProps = BaseProps & { href: string };

export const Button = (props: ButtonProps) => {
  const { onClick, children, size = 'md', radius = 'md', icon, variant, className } = props;

  return (
    <button
      onClick={onClick}
      className={classNames(
        s.root,
        s[`size-${size}`],
        s[`radius-${radius}`],
        s[variant],
        { [s.square]: icon && !children },
        className,
      )}
    >
      {icon && icon} {children && children}
    </button>
  );
};

export const ButtonLink = (props: ButtonLinkProps) => {
  const { href, children, size = 'md', radius = 'md', icon, variant, className } = props;

  return (
    <Link
      href={href}
      className={classNames(
        s.root,
        s[`size-${size}`],
        s[`radius-${radius}`],
        s[variant],
        { [s.square]: icon && !children },
        className,
      )}
    >
      {icon && icon} {children}
    </Link>
  );
};
