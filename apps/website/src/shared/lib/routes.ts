import { DataTab } from '@lorema/core';

export const appRoutes = {
  root: () => '/main',
  generators: (type: DataTab) => `/generators/${type}`,
  contacts: () => '/contacts',
};
