'use client';

import classNames from 'classnames';
import { ReactNode, useCallback, useEffect, useId, useRef, useState } from 'react';

import s from './Dropdown.module.css';

type TriggerMode = 'click' | 'hover';

type DropdownContentProps = {
  close: () => void;
  isOpen: boolean;
};

type DropdownContent = ReactNode | ((props: DropdownContentProps) => ReactNode);

type Props = {
  children: ReactNode;
  content: DropdownContent;
  triggerMode?: TriggerMode;
  className?: string;
  contentClassName?: string;
};

const HOVER_CLOSE_DELAY = 150;

export const Dropdown = (props: Props) => {
  const { children, content, triggerMode = 'click', className, contentClassName } = props;

  const [isOpen, setIsOpen] = useState(false);

  const rootRef = useRef<HTMLDivElement>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const contentId = useId();

  const isHoverMode = triggerMode === 'hover';

  const clearCloseTimeout = useCallback(() => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  }, []);

  const open = useCallback(() => {
    clearCloseTimeout();
    setIsOpen(true);
  }, [clearCloseTimeout]);

  const close = useCallback(() => {
    clearCloseTimeout();
    setIsOpen(false);
  }, [clearCloseTimeout]);

  const closeFromContent = useCallback(() => {
    setIsOpen(false);
  }, []);

  const toggle = useCallback(() => {
    clearCloseTimeout();
    setIsOpen((value) => !value);
  }, [clearCloseTimeout]);

  const scheduleClose = useCallback(() => {
    clearCloseTimeout();

    closeTimeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, HOVER_CLOSE_DELAY);
  }, [clearCloseTimeout]);

  useEffect(() => {
    return clearCloseTimeout;
  }, [clearCloseTimeout]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        close();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        close();
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [close, isOpen]);

  const handleBlur = () => {
    requestAnimationFrame(() => {
      if (!rootRef.current?.contains(document.activeElement)) {
        close();
      }
    });
  };

  const renderedContent =
    typeof content === 'function'
      ? content({
          close: closeFromContent,
          isOpen,
        })
      : content;

  return (
    <div
      ref={rootRef}
      className={classNames(s.root, className)}
      onMouseEnter={isHoverMode ? open : undefined}
      onMouseLeave={isHoverMode ? scheduleClose : undefined}
      onBlur={handleBlur}
    >
      <button
        type="button"
        className={s.trigger}
        aria-expanded={isOpen}
        aria-controls={contentId}
        aria-haspopup="true"
        onClick={toggle}
        onFocus={isHoverMode ? open : undefined}
      >
        {children}
      </button>

      {isOpen && (
        <div
          id={contentId}
          className={classNames(s.content, contentClassName)}
          onMouseEnter={isHoverMode ? open : undefined}
          onMouseLeave={isHoverMode ? scheduleClose : undefined}
        >
          {renderedContent}
        </div>
      )}
    </div>
  );
};
