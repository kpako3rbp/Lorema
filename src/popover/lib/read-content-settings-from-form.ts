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

import { getSelectedValues, parsePositiveIntegerFromInput } from './form-utils';

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
          keepWholeWords:
            lengthMode === 'exact'
              ? false
              : queryElementById<HTMLInputElement>(form, POPOVER_IDS.keepWholeWords).checked,
          withParagraphs:
            lengthMode === 'exact'
              ? false
              : queryElementById<HTMLInputElement>(form, POPOVER_IDS.paragraphsCheckbox).checked,
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
          prefix: queryElementById<HTMLSelectElement>(form, POPOVER_IDS.linkPrefixSelect).value as LinkPrefix,
          lengthPresets: getSelectedValues<LinkLengthPreset>(form, POPOVER_IDS.linkLengthPresetSelect),
        },
      };
    },

    phone: () => {
      const digitsCount = parsePositiveIntegerFromInput(queryElementById(form, POPOVER_IDS.digitsCountInput));

      if (digitsCount === null) return null;

      return {
        phoneSettings: {
          countryCode: queryElementById<HTMLInputElement>(form, POPOVER_IDS.countryCodeInput).value,
          digitsCount,
          format: queryElementById<HTMLSelectElement>(form, POPOVER_IDS.phoneFormatSelect).value as PhoneFormat,
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
