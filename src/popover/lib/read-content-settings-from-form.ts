import { POPOVER_IDS } from 'src/popover/config/constants';
import { getCheckboxValue, getInputValue, getSelectedValue, getSelectedValues } from 'src/shared/lib/form-element';
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

export const readContentSettingsFromForm = (
  contentType: ContentType,
  form: HTMLFormElement,
  languageSelect: HTMLSelectElement,
  storage: StorageSchema,
): StorageSchema => {
  const getLanguage = (): Language => languageSelect.value as Language;

  const handlers: Record<ContentType, () => Partial<StorageSchema>> = {
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

  if (!contentSettings) return storage;

  return {
    ...storage,
    generationLanguage: getLanguage(),
    ...contentSettings,
  };
};
