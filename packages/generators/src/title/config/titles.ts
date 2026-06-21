import { Language } from '@lorema/generators/shared/model/types';

import { TitleLengthPreset, TitleTopic } from '../model/types';

export const COMMON_TITLE_TEMPLATES: Record<Language, Record<TitleLengthPreset, string[]>> = {
  ru: {
    xsm: [
      'План {gen}',
      'Рост {gen}',
      'Цель {gen}',
      'Фокус {gen}',
      'Итоги {gen}',
      'Риск {gen}',
      'Модель {gen}',
      'Основа {gen}',
      'Анализ {gen}',
      'Качество {gen}',
    ],
    sm: [
      'Новый подход к развитию {gen}',
      'План работы с учетом {gen}',
      'Как повысить качество {gen}',
      'Поиск точек роста для {gen}',
      'Оптимизация работы {withInstr}',
      'Ключевые изменения в {prep}',
      'Что мешает развитию {gen}',
      'Контроль качества {gen}',
      'Повышение {result} через {acc}',
      'Быстрая проверка {gen}',
    ],
    md: [
      'Как команда улучшает работу {withInstr} на практике',
      'Практический план развития {gen} на ближайший период',
      'Как повысить эффективность процессов вокруг {gen}',
      'Развитие {gen} через анализ {context} и обратной связи',
      'Как снизить риски при работе {withInstr}',
      'Как выбрать приоритеты в работе {withInstr}',
      'Что помогает улучшить {result} без резких изменений',
      'Как связать цели команды с развитием {gen}',
      'Как определить реальные точки роста для {gen}',
      'Что важно учесть перед запуском нового этапа {gen}',
    ],
    lg: [
      'Практический подход к развитию {gen} в условиях высокой нагрузки и постоянных изменений',
      'Как выстроить работу {withInstr} и не потерять качество процессов внутри команды',
      'Развитие {gen} как основа для устойчивого результата и понятной командной работы',
      'Как команда может найти точки роста в работе {withInstr} при меняющихся условиях',
      'Как связать стратегические цели с ежедневной работой над {instr}',
      'Как снизить операционные риски при активной работе {withInstr}',
      'Как улучшить {result} через пересмотр процессов, ролей и ежедневных решений',
      'Почему развитие {gen} должно опираться на данные, обратную связь и реальные ограничения',
      'Как не потерять качество {gen}, когда команда одновременно решает несколько срочных задач',
      'Почему устойчивый процесс вокруг {gen} важнее разовых быстрых улучшений',
    ],
    xlg: [
      'Как выстроить долгосрочную стратегию развития {gen}, сохранить фокус команды и не потерять качество ежедневной работы',
      'Практический план развития {gen} с учетом ограниченных ресурсов, организационных рисков и меняющихся ожиданий участников процесса',
      'Почему устойчивое развитие {gen} зависит не только от идеи, но и от качества процессов, коммуникации и управления целями',
      'Как команда может подготовиться к новому этапу работы {withInstr}, распределить ответственность и заранее снизить ключевые риски',
      'Как выбрать приоритеты в работе {withInstr}, согласовать ожидания команды и сфокусироваться на задачах с максимальным эффектом',
      'Почему развитие {gen} требует не только новых идей, но и понятной ответственности, регулярной обратной связи и контроля результата',
      'Как перестроить модель работы {withInstr}, если текущие процессы замедляют решения и создают лишнюю нагрузку',
      'Как улучшить {result} за счет понятной системы решений, регулярного анализа {context} и внимательной работы с ограничениями',
      'Как организовать работу {withInstr}, чтобы сохранить скорость решений, снизить нагрузку и не потерять качество результата',
      'Почему стабильное повышение {result} требует не разовых решений, а регулярной настройки процессов вокруг {gen}',
    ],
  },

  en: {
    xsm: [
      '{topic} plan',
      '{topic} growth',
      '{topic} goal',
      '{topic} focus',
      '{topic} results',
      '{topic} risk',
      '{topic} model',
      '{topic} idea',
      '{topic} roadmap',
      '{topic} analysis',
    ],
    sm: [
      'New approach to {topic} development',
      'Practical plan for {topic}',
      'How to improve {topic} quality',
      'Key changes in {topic}',
      'New opportunities for {topic}',
      'Better process for {topic}',
      'Simple way to manage {topic}',
      'How to reduce {topic} risks',
      'How to improve {result}',
      'Simple checklist for {topic}',
    ],
    md: [
      'How the team improves {topic} in practice',
      'Practical plan for {topic} development',
      'How to improve processes around {topic}',
      'How to choose priorities when working with {topic}',
      'How to reduce risks when working with {topic}',
      'Why {context} analysis helps improve {result}',
      'How to find weak points in {topic} processes',
      'How to connect team goals with {topic} development',
      'Practical steps for improving {result}',
      'How to build a stable process around {topic}',
    ],
    lg: [
      'Practical approach to {topic} development under high workload and constant change',
      'How to organize work with {topic} without losing process quality inside the team',
      'How the team can find growth points while working with {topic}',
      'How to connect strategic goals with daily work on {topic}',
      'How to reduce operational risks during active work with {topic}',
      'How to improve {result} through process review, clear roles and daily decisions',
      'Why working with {topic} requires clear goals, transparent rules and regular checks',
      'How {context} analysis helps the team detect problems before they become critical',
      'What helps keep {topic} stable when workload grows and priorities change',
      'Why a stable process around {topic} is more valuable than one-time improvements',
    ],
    xlg: [
      'How to build a long-term {topic} development strategy, keep the team focused and preserve the quality of daily work',
      'Practical {topic} development plan based on limited resources, organizational risks and changing expectations',
      'Why stable {topic} development depends not only on ideas, but also on processes, communication and goal management',
      'How the team can prepare for a new stage of work with {topic}, assign responsibility and reduce key risks in advance',
      'How to choose priorities when working with {topic}, align team expectations and focus on the highest-impact tasks',
      'Why {topic} development requires not only new ideas, but also clear responsibility, regular feedback and result control',
      'How to rebuild the model of working with {topic} when current processes slow down decisions and create extra load',
      'How to improve {result} through a clear decision system, regular {context} analysis and careful work with constraints',
      'How to organize work with {topic} in a way that keeps decision speed, reduces workload and preserves quality',
      'Why stable improvement of {result} requires regular tuning of processes around {topic}, not one-time decisions',
    ],
  },
};

export const TOPIC_TITLE_TEMPLATES: Record<
  Language,
  Record<TitleTopic, Partial<Record<TitleLengthPreset, string[]>>>
> = {
  ru: {
    business: {
      xsm: ['Стратегия роста', 'Клиентский сервис', 'План продаж'],
      sm: ['Анализ ключевых показателей компании', 'Развитие клиентского сервиса', 'План роста выручки'],
      md: [
        'Как улучшить клиентский опыт без резкого роста затрат',
        'Почему сильная стратегия помогает бизнесу быстрее расти',
        'Как найти новые источники прибыли в текущей модели бизнеса',
      ],
      lg: [
        'Как выстроить систему продаж, которая помогает бизнесу расти без хаоса в процессах',
        'Почему качество клиентского сервиса напрямую влияет на повторные продажи и доверие к компании',
      ],
      xlg: [
        'Как пересмотреть стратегию развития бизнеса, чтобы сохранить прибыльность, повысить качество сервиса и не перегрузить команду лишними процессами',
      ],
    },

    it: {
      xsm: ['Архитектура API', 'Релиз модуля', 'Аудит кода'],
      sm: [
        'Оптимизация производительности приложения',
        'Переход на обновленный API',
        'Улучшение пользовательского интерфейса',
      ],
      md: [
        'Как снизить технический долг без остановки разработки',
        'Почему стабильность интерфейса важна для пользовательского опыта',
        'Как улучшить архитектуру платформы перед масштабированием',
      ],
      lg: [
        'Как команда может снизить количество ошибок в релизах через ревью, тесты и понятные процессы разработки',
        'Почему обновление API требует не только технического плана, но и согласованной работы команды',
      ],
      xlg: [
        'Как подготовить платформу к масштабированию, уменьшить технический долг, сохранить скорость разработки и не потерять стабильность пользовательского интерфейса',
      ],
    },

    science: {
      xsm: ['Гипотеза опыта', 'Анализ данных', 'Методика теста'],
      sm: ['Проверка научной гипотезы', 'Анализ экспериментальных данных', 'Методы обработки результатов'],
      md: [
        'Как выбрать методику исследования для проверки гипотезы',
        'Почему качество данных влияет на точность научных выводов',
        'Практическое применение результатов нового исследования',
      ],
      lg: [
        'Как построить исследование, чтобы данные помогали проверять гипотезы и не искажали итоговые выводы',
        'Почему воспроизводимость эксперимента важна для доверия к результатам исследования',
      ],
      xlg: [
        'Как организовать исследовательский процесс, чтобы гипотезы проверялись последовательно, данные оставались надежными, а выводы можно было применить на практике',
      ],
    },

    finance: {
      xsm: ['План бюджета', 'Рост доходов', 'Оценка рисков'],
      sm: ['Анализ структуры расходов', 'Планирование бюджета на квартал', 'Оценка инвестиционных рисков'],
      md: [
        'Как оптимизировать расходы без потери качества процессов',
        'Почему контроль бюджета помогает быстрее принимать решения',
        'Как оценить финансовые риски перед запуском нового направления',
      ],
      lg: [
        'Как выстроить бюджетирование, чтобы команда видела ограничения, риски и реальные возможности роста',
        'Почему финансовое планирование должно учитывать не только расходы, но и устойчивость будущих решений',
      ],
      xlg: [
        'Как пересмотреть финансовую модель, сократить лишние расходы, сохранить устойчивость бюджета и не потерять возможности для дальнейшего роста',
      ],
    },

    marketing: {
      xsm: ['План компании', 'Рост трафика', 'Анализ ЦА'],
      sm: ['Исследование целевой аудитории', 'Запуск рекламной компании', 'Рост конверсии через новые каналы'],
      md: [
        'Как улучшить конверсию без увеличения рекламного бюджета',
        'Почему анализ аудитории помогает точнее настроить компанию',
        'Как выбрать каналы продвижения для нового продукта',
      ],
      lg: [
        'Как запустить рекламную компанию, которая учитывает ожидания аудитории и реальные ограничения бюджета',
        'Почему контентная стратегия влияет не только на охваты, но и на качество привлеченных пользователей',
      ],
      xlg: [
        'Как построить маркетинговую компанию, которая помогает лучше понимать аудиторию, повышать конверсию и сохранять контроль над бюджетом продвижения',
      ],
    },

    art: {
      xsm: ['Идея выставки', 'Образ проекта', 'Язык формы'],
      sm: ['Концепция новой выставки', 'Развитие визуального языка', 'Современные художественные практики'],
      md: [
        'Как визуальный образ влияет на восприятие проекта',
        'Почему концепция выставки важна для зрительского опыта',
        'Как художественный метод помогает раскрыть идею автора',
      ],
      lg: [
        'Как выстроить концепцию выставки, чтобы визуальный язык работал на идею и усиливал зрительский опыт',
        'Почему современное искусство требует не только формы, но и понятного контекста для аудитории',
      ],
      xlg: [
        'Как создать цельную художественную концепцию, в которой визуальный язык, пространство выставки и зрительский опыт работают на одну идею',
      ],
    },
  },

  en: {
    business: {
      xsm: ['Growth strategy', 'Sales plan', 'Service quality'],
      sm: ['Customer service strategy', 'Revenue growth plan', 'Company performance review'],
      md: [
        'How to improve customer experience without increasing costs',
        'Why a clear strategy helps business grow faster',
        'How to find new profit sources in the current business model',
      ],
    },

    it: {
      xsm: ['API design', 'Code audit', 'Module release'],
      sm: ['Application performance review', 'User interface improvement', 'Platform architecture update'],
      md: [
        'How to reduce technical debt without stopping development',
        'Why interface stability matters for user experience',
        'How to improve platform architecture before scaling',
      ],
    },

    science: {
      xsm: ['Data review', 'Test method', 'Research goal'],
      sm: ['Scientific hypothesis testing', 'Experimental data analysis', 'Research method review'],
      md: [
        'How to choose a research method for hypothesis testing',
        'Why data quality affects the accuracy of scientific conclusions',
        'Practical use of new research results',
      ],
    },

    finance: {
      xsm: ['Budget plan', 'Risk review', 'Cost control'],
      sm: ['Expense structure analysis', 'Quarterly budget planning', 'Investment risk review'],
      md: [
        'How to optimize expenses without losing process quality',
        'Why budget control helps teams make decisions faster',
        'How to assess financial risks before launching a new direction',
      ],
    },

    marketing: {
      xsm: ['Campaign plan', 'Traffic growth', 'Audience review'],
      sm: ['Target audience research', 'Advertising campaign launch', 'Conversion growth plan'],
      md: [
        'How to improve conversion without increasing the advertising budget',
        'Why audience analysis helps tune a campaign more accurately',
        'How to choose promotion channels for a new product',
      ],
    },

    art: {
      xsm: ['Exhibition idea', 'Visual form', 'Art concept'],
      sm: ['New exhibition concept', 'Visual language development', 'Contemporary art practices'],
      md: [
        'How visual form affects the perception of a project',
        'Why an exhibition concept matters for audience experience',
        'How artistic method helps express the author’s idea',
      ],
    },
  },
};
