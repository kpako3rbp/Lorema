import { Language } from 'src/shared/model/types';

export type ContentSettingsReader<TSettings> = (params: { form: HTMLFormElement; language: Language }) => TSettings;
