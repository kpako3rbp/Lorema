import { DataTab } from 'src/modules/data-type/config/constants';
import {
  AddressFormat,
  EmailLengthPreset,
  LengthMode,
  LinkLengthPreset,
  LinkPrefix,
  NameLengthPreset,
  PhoneFormat,
  TitleLengthPreset,
  TitleTopic,
} from 'src/modules/generators';
import { POPOVER_IDS } from 'src/modules/popover/config/constants';
import { StorageSchema } from 'src/modules/storage';
import { getCheckboxValue, getInputValue, getSelectedValue, getSelectedValues } from 'src/shared/lib/form-element';
import { Language } from 'src/shared/model/types';

export const readDataSettingsFromForm = (
  form: HTMLFormElement,
  languageSelect: HTMLSelectElement,
  storage: StorageSchema,
  dataTab?: DataTab,
): StorageSchema => {
  const getLanguage = (): Language => languageSelect.value as Language;

  const handlers: Record<DataTab, () => Partial<StorageSchema>> = {
    text: () => {
      const lengthMode = new FormData(form).get('lengthMode') as LengthMode;

      return {
        textSettings: {
          language: getLanguage(),
          length: Math.floor(Number(getInputValue(form, POPOVER_IDS.textLengthInput))),
          lengthMode,
          keepWholeSentencies: lengthMode === 'exact' ? false : getCheckboxValue(form, POPOVER_IDS.keepWholeSentencies),
          withParagraphs: lengthMode === 'exact' ? false : getCheckboxValue(form, POPOVER_IDS.paragraphsCheckbox),
        },
      };
    },

    title: () => ({
      titleSettings: {
        language: getLanguage(),
        lengthPresets: getSelectedValues<TitleLengthPreset>(form, POPOVER_IDS.titleLengthPresetSelect),
        topics: getSelectedValues<TitleTopic>(form, POPOVER_IDS.topicSelect),
      },
    }),

    email: () => ({
      emailSettings: {
        lengthPresets: getSelectedValues<EmailLengthPreset>(form, POPOVER_IDS.emailLengthPresetSelect),
      },
    }),

    link: () => {
      return {
        linkSettings: {
          prefix: getSelectedValue<LinkPrefix>(form, POPOVER_IDS.linkPrefixSelect),
          lengthPresets: getSelectedValues<LinkLengthPreset>(form, POPOVER_IDS.linkLengthPresetSelect),
        },
      };
    },

    phone: () => {
      return {
        phoneSettings: {
          countryCode: getInputValue(form, POPOVER_IDS.countryCodeInput),
          digitsCount: Math.floor(Number(getInputValue(form, POPOVER_IDS.digitsCountInput))),
          format: getSelectedValue<PhoneFormat>(form, POPOVER_IDS.phoneFormatSelect),
        },
      };
    },

    address: () => {
      return {
        addressSettings: {
          language: getLanguage(),
          formats: getSelectedValues<AddressFormat>(form, POPOVER_IDS.addressFormatSelect),
        },
      };
    },

    person: () => {
      return {
        firstNameSettings: {
          language: getLanguage(),
          lengthPresets: getSelectedValues<NameLengthPreset>(form, POPOVER_IDS.firstNameLengthSelect),
        },
        lastNameSettings: {
          language: getLanguage(),
          lengthPresets: getSelectedValues<NameLengthPreset>(form, POPOVER_IDS.lastNameLengthSelect),
        },
      };
    },
  };

  if (!dataTab) {
    const allDataGenerationSettings = Object.values(handlers).reduce<Partial<StorageSchema>>((acc, handler) => {
      return { ...acc, ...handler() };
    }, {});

    return { ...storage, generationLanguage: getLanguage(), ...allDataGenerationSettings };
  }

  const dataGenerationSettingsByType = handlers[dataTab]();

  return { ...storage, generationLanguage: getLanguage(), ...dataGenerationSettingsByType };
};
