'use client';

import { Link, usePathname } from '@website/i18n/navigation';
import { Dropdown } from '@website/shared/ui/Dropdown';
import { Typography } from '@website/shared/ui/Typography';
import classNames from 'classnames';
import { useTranslations } from 'next-intl';

import { NAVIGATION_ITEMS } from '../config/navigarion';
import { isActive } from '../lib/is-active';
import s from './Header.module.css';

export const HeaderNavigation = () => {
  const t = useTranslations('Navigation');
  const pathname = usePathname();

  return (
    <nav className={s.nav}>
      {Object.values(NAVIGATION_ITEMS).map((item, index) => {
        if (item.children) {
          return (
            <Dropdown
              key={index}
              triggerMode="hover"
              contentClassName={s.content}
              content={(p) => (
                <div className={s.dropdownWrapper}>
                  {item.children?.map((child) => {
                    return (
                      <Typography size={16} color="black" key={child.href}>
                        <Link
                          href={child.href}
                          onClick={p.close}
                          className={classNames(s.link, isActive(pathname, child.href, true) && s.active)}
                        >
                          {child.icon} {t(child.labelKey)}
                        </Link>
                      </Typography>
                    );
                  })}
                </div>
              )}
            >
              <Typography size={16} color="black">
                <Link href={item.href} className={classNames(s.link, isActive(pathname, item.href, true) && s.active)}>
                  {t(item.labelKey)}
                </Link>
              </Typography>
            </Dropdown>
          );
        }

        return (
          <Typography key={item.href} size={16}>
            <Link href={item.href} className={classNames(s.link, isActive(pathname, item.href) && s.active)}>
              {t(item.labelKey)}
            </Link>
          </Typography>
        );
      })}
    </nav>
  );
};
