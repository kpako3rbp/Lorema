import { DATA_TABS, DataTab } from '../config/constants';

export const isDataTab = (value: unknown): value is DataTab => {
  return typeof value === 'string' && DATA_TABS.includes(value as DataTab);
};
