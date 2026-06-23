import { DataTab, GenerationLanguage } from '@lorema/core';
import {
  AddressFormat,
  DateFormat,
  EmailLengthPreset,
  LengthMode,
  LinkLengthPreset,
  LinkPrefix,
  ListType,
  NameLengthPreset,
  NumberDecimalSeparator,
  PhoneFormat,
  TimeFormat,
  TitleLengthPreset,
  TitleTopic,
} from '@lorema/generators';
import { POPOVER_IDS } from 'src/modules/popover/config/constants';
import { StorageSchema } from 'src/modules/storage';
import { getCheckboxValue, getInputValue, getSelectedValue, getSelectedValues } from 'src/shared/lib/form-element';

export const readDataSettingsFromForm = (
  form: HTMLFormElement,
  languageSelect: HTMLSelectElement,
  storage: StorageSchema,
  dataTab?: DataTab,
): StorageSchema => {
  const getLanguage = (): GenerationLanguage => languageSelect.value as GenerationLanguage;

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
        domain: getInputValue(form, POPOVER_IDS.emailDomainInput),
      },
    }),

    link: () => {
      return {
        linkSettings: {
          prefix: getSelectedValue<LinkPrefix>(form, POPOVER_IDS.linkPrefixSelect),
          domain: getInputValue(form, POPOVER_IDS.linkDomainInput),
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

    list: () => ({
      listSettings: {
        language: getLanguage(),
        itemsCount: Math.floor(Number(getInputValue(form, POPOVER_IDS.listItemsCountInput))),
        lengthPresets: getSelectedValues<TitleLengthPreset>(form, POPOVER_IDS.listLengthPresetSelect),
        type: getSelectedValue<ListType>(form, POPOVER_IDS.listTypeSelect),
      },
    }),

    number: () => ({
      numberSettings: {
        min: Number(getInputValue(form, POPOVER_IDS.numberMinInput)),
        max: Number(getInputValue(form, POPOVER_IDS.numberMaxInput)),
        multipleOf: Number(getInputValue(form, POPOVER_IDS.numberMultipleOfInput)),
        decimalPlaces: Number(getInputValue(form, POPOVER_IDS.numberDecimalPlacesInput)),
        decimalSeparator: getSelectedValue<NumberDecimalSeparator>(form, POPOVER_IDS.numberDecimalSeparatorSelect),
      },
    }),

    date: () => ({
      dateSettings: {
        minYear: Math.floor(Number(getInputValue(form, POPOVER_IDS.dateMinYearInput))),
        maxYear: Math.floor(Number(getInputValue(form, POPOVER_IDS.dateMaxYearInput))),
        dateFormat: getSelectedValue<DateFormat>(form, POPOVER_IDS.dateFormatSelect),
        timeFormat: getSelectedValue<TimeFormat>(form, POPOVER_IDS.timeFormatSelect),
      },
    }),
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
