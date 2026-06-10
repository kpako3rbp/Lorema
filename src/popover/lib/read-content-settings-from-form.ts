import { POPOVER_IDS } from 'src/popover/config/constants';
import {
  AddressFormat,
  ContentType,
  EmailLengthPreset,
  Language,
  LengthMode,
  LengthPreset,
  LinkLengthPreset,
  LinkPrefix,
  NameLengthPreset,
  PhoneFormat,
  StorageSchema,
  TitleTopic,
} from 'src/shared/model/types';
import { queryElementById } from 'src/shared/utils/query-element';

import {
  getCheckboxValue,
  getInputValue,
  getSelectedValue,
  getSelectedValues,
  parsePositiveIntegerFromInput,
} from './form-utils';

export const readContentSettingsFromForm = (
  contentType: ContentType,
  form: HTMLFormElement,
  languageSelect: HTMLSelectElement,
  storage: StorageSchema,
): StorageSchema | null => {
  const getLanguage = (): Language => languageSelect.value as Language;

  const handlers: Record<ContentType, () => Partial<StorageSchema> | null> = {
    text: () => {
      const length = parsePositiveIntegerFromInput(queryElementById(form, POPOVER_IDS.textLengthInput));

      if (length === null) return null;

      const lengthMode = new FormData(form).get('lengthMode') as LengthMode;

      return {
        textSettings: {
          language: getLanguage(),
          length,
          lengthMode,
          keepWholeWords: lengthMode === 'exact' ? false : getCheckboxValue(form, POPOVER_IDS.keepWholeWords),
          withParagraphs: lengthMode === 'exact' ? false : getCheckboxValue(form, POPOVER_IDS.paragraphsCheckbox),
        },
      };
    },

    title: () => ({
      titleSettings: {
        language: getLanguage(),
        lengthPresets: getSelectedValues<LengthPreset>(form, POPOVER_IDS.titleLengthPresetSelect),
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
      const digitsCount = parsePositiveIntegerFromInput(queryElementById(form, POPOVER_IDS.digitsCountInput));

      if (digitsCount === null) return null;

      return {
        phoneSettings: {
          countryCode: getInputValue(form, POPOVER_IDS.countryCodeInput),
          digitsCount,
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

    firstName: () => {
      return {
        firstNameSettings: {
          language: getLanguage(),
          lengthPresets: getSelectedValues<NameLengthPreset>(form, POPOVER_IDS.firstNameLengthSelect),
        },
      };
    },

    lastName: () => {
      return {
        lastNameSettings: {
          language: getLanguage(),
          lengthPresets: getSelectedValues<NameLengthPreset>(form, POPOVER_IDS.lastNameLengthSelect),
        },
      };
    },
  };

  const contentSettings = handlers[contentType]();

  if (!contentSettings) return null;

  return {
    ...storage,
    generationLanguage: getLanguage(),
    ...contentSettings,
  };
};
