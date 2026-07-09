import { appRoutes } from '@website/shared/lib';
import { Contact, Email, Generation, Home, Phone, Text, Title } from '@website/shared/ui/Icons';
import { ReactNode } from 'react';

type NavigationLabel = 'home' | 'generators' | 'text' | 'title' | 'email' | 'phone' | 'contacts';

type NavItem = {
  labelKey: NavigationLabel;
  href: string;
  icon?: ReactNode;
  children?: NavItem[];
};

export const NAVIGATION_ITEMS: Record<string, NavItem> = {
  main: {
    labelKey: 'home',
    href: appRoutes.root(),
    icon: <Home size={20} />,
  },
  generators: {
    labelKey: 'generators',
    href: appRoutes.generators('text'),
    icon: <Generation size={20} />,
    children: [
      { labelKey: 'text', href: appRoutes.generators('text'), icon: <Text size={20} /> },
      { labelKey: 'title', href: appRoutes.generators('title'), icon: <Title size={20} /> },
      { labelKey: 'email', href: appRoutes.generators('email'), icon: <Email size={20} /> },
      { labelKey: 'phone', href: appRoutes.generators('phone'), icon: <Phone size={20} /> },
    ],
  },
  contacts: {
    labelKey: 'contacts',
    href: appRoutes.contacts(),
    icon: <Contact size={20} />,
  },
} as const;
