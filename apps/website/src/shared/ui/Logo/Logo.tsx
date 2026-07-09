import Image from 'next/image';

import s from './Logo.module.css';

type Props = {
  color: 'dark' | 'light' | 'gradient';
  variant: 'icon' | 'text';
  width?: number;
  height?: number;
};

export const Logo = (props: Props) => {
  const { color, variant, width = 100, height = 30 } = props;

  return (
    <div className={s.root}>
      <Image width={width} height={height} src={`logo-${variant}-${color}.svg`} alt="logo" />
    </div>
  );
};
