import { EXTENSION_LINK } from '@lorema/core';
import { Link } from '@website/i18n/navigation';
import { appRoutes } from '@website/shared/lib';
import { ButtonLink } from '@website/shared/ui/Button';
import { Container } from '@website/shared/ui/Container';
import { Chrome } from '@website/shared/ui/Icons';
import { Logo } from '@website/shared/ui/Logo';
import { getTranslations } from 'next-intl/server';

import s from './Header.module.css';
import { HeaderNavigation } from './HeaderNavigation';
import { MobileMenu } from './MobileMenu';

export const Header = async () => {
  const t = await getTranslations('Header');

  return (
    <header className={s.root}>
      <Container>
        <div className={s.wrapper}>
          <Link href={appRoutes.root()}>
            <Logo variant="text" color="gradient" width={132} />
          </Link>

          <div className={s.items}>
            <HeaderNavigation />
            <ButtonLink href={EXTENSION_LINK} size="sm" radius="md" variant="outline" icon={<Chrome />}>
              {t('install')}
            </ButtonLink>
          </div>

          {/* <ThemeSwitcher /> */}

          <MobileMenu />
        </div>
      </Container>
    </header>
  );
};
