'use client';

import { Link, usePathname } from '@website/i18n/navigation';
import { Button } from '@website/shared/ui/Button';
import { Drawer } from '@website/shared/ui/Drawer';
import { Close, Menu } from '@website/shared/ui/Icons';
import { Typography } from '@website/shared/ui/Typography';
import classNames from 'classnames';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { NAVIGATION_ITEMS } from '../config/navigarion';
import { isActive } from '../lib/is-active';
import s from './Header.module.css';

export const MobileMenu = () => {
  const t = useTranslations('Navigation');
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className={s.menu}>
      <Button
        icon={isOpen ? <Close size={20} /> : <Menu size={20} />}
        variant="outline"
        radius="sm"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
      />

      <Drawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        className={s.sidebar}
        title={<Typography size={25}>{t('navigation')}</Typography>}
        withCloseButton
      >
        <div className={s.sidebarWrapper}>
          <nav className={s.sidebarNav}>
            {Object.values(NAVIGATION_ITEMS).map((item) => {
              if (item.children) {
                return (
                  <>
                    <div className={classNames(s.sidebarItem, isActive(pathname, item.href) && s.active)}>
                      {item.icon}
                      <Typography size={16} color="black">
                        {t(item.labelKey)}
                      </Typography>
                    </div>

                    <div className={s.childrenWrapper}>
                      {item.children?.map((child) => {
                        return (
                          <div
                            key={child.href}
                            className={classNames(s.sidebarItem, isActive(pathname, child.href, true) && s.active)}
                          >
                            {child.icon}
                            <Typography size={16} color="black">
                              <Link href={child.href} onClick={() => setIsOpen(false)}>
                                {t(child.labelKey)}
                              </Link>
                            </Typography>
                          </div>
                        );
                      })}
                    </div>
                  </>
                );
              }

              return (
                <div key={item.href} className={classNames(s.sidebarItem, isActive(pathname, item.href) && s.active)}>
                  {item.icon}
                  <Typography size={16}>
                    <Link href={item.href} onClick={() => setIsOpen(false)}>
                      {t(item.labelKey)}
                    </Link>
                  </Typography>
                </div>
              );
            })}
          </nav>
        </div>
      </Drawer>
    </div>
  );
};
