'use client';

import classNames from 'classnames';
import { ReactNode, useEffect } from 'react';

import { Button } from '../Button';
import { Close } from '../Icons';
import s from './Drawer.module.css';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
  withCloseButton?: boolean;
  title?: ReactNode;
};

export const Drawer = (props: Props) => {
  const { isOpen, onClose, children, className, title, withCloseButton } = props;

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <>
      <button type="button" className={classNames(s.overlay, isOpen && s.open)} onClick={onClose} />

      <aside className={classNames(s.drawer, isOpen && s.open, className)}>
        {(title || withCloseButton) && (
          <div className={s.header}>
            {title}

            {withCloseButton && (
              <Button icon={<Close size={20} />} variant="outline" radius="sm" size="sm" onClick={onClose} />
            )}
          </div>
        )}

        <div className={s.content}>{children}</div>
      </aside>
    </>
  );
};
