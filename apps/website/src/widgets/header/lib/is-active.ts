export const isActive = (pathname: string, href: string, exact = false) => {
  const [, str] = href.split('/');

  return exact ? pathname === href : pathname.startsWith(`/${str}`);
};
