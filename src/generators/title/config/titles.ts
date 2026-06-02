import { Language, TitleTopic } from 'src/shared/model/types';

export const TITLES: Record<Language, Record<Exclude<TitleTopic, 'random'>, string[]>> = {
  ru: {
    business: ['Новая стратегия роста', 'План развития команды', 'Запуск продукта для клиентов'],
    it: ['Обновление платформы', 'Безопасная архитектура сервиса', 'Автоматизация рабочих процессов'],
    project: ['Дорожная карта проекта', 'Итоги первого этапа', 'План запуска инициативы'],
    task: ['Проверка формы заказа', 'Подготовка отчета', 'Уточнение требований'],
    art: ['Городская выставка', 'Новые визуальные образы', 'Творческая мастерская'],
    education: ['Курс практических навыков', 'Обучение через проекты', 'Новая программа занятий'],
    science: ['Исследование данных', 'Экспериментальная модель', 'Открытия современной науки'],
    travel: ['Маршрут на выходные', 'Путешествие по северу', 'Гид по уютным городам'],
    finance: ['Финансовый план месяца', 'Обзор личного бюджета', 'Инвестиции без спешки'],
    marketing: ['Кампания для новой аудитории', 'Рост узнаваемости бренда', 'Контент-план сезона'],
    health: ['Здоровые привычки каждый день', 'Баланс работы и отдыха', 'План восстановления энергии'],
  },
  en: {
    business: ['New Growth Strategy', 'Team Development Plan', 'Product Launch for Customers'],
    it: ['Platform Update', 'Secure Service Architecture', 'Workflow Automation'],
    project: ['Project Roadmap', 'First Phase Results', 'Initiative Launch Plan'],
    task: ['Order Form Review', 'Report Preparation', 'Requirements Clarification'],
    art: ['City Art Exhibition', 'New Visual Ideas', 'Creative Studio Session'],
    education: ['Practical Skills Course', 'Project Based Learning', 'New Class Program'],
    science: ['Data Research', 'Experimental Model', 'Modern Science Discoveries'],
    travel: ['Weekend Route', 'Northern Journey', 'Guide to Cozy Cities'],
    finance: ['Monthly Finance Plan', 'Personal Budget Review', 'Investing Without Rush'],
    marketing: ['Campaign for a New Audience', 'Brand Awareness Growth', 'Seasonal Content Plan'],
    health: ['Healthy Habits Every Day', 'Work and Rest Balance', 'Energy Recovery Plan'],
  },
};
