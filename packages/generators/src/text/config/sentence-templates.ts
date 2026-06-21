export const SENTENCE_TEMPLATES_EN = [
  '{subject} {predicate} {object}.',
  '{start} {subject} {predicate} {object} {ending}',
  '{subject} gradually improve {object} {ending}',
  '{subject} increasingly support {object} {ending}',
  '{subject} not only improve {object}, but also create a basis for further development.',
  '{start} it becomes clear that {subject} strengthen {object} {ending}',
  '{start} practical results show that {subject} reduce {objectGen} {ending}',
  '{start} {subject} provide a more reliable foundation for {objectDat} {ending}',
  '{start} {subject} improve decision-making in {objectLoc} {ending}',
  '{start} {subject} help maintain stability in {objectLoc} {ending}',
] as const;

export const SENTENCE_TEMPLATES_RU = [
  '{subject} {predicate} {object}.',
  '{start} {subject} {predicate} {object} {ending}',
  '{start} именно {subject} {predicate} {object} {ending}',
  '{start} {subject} не только {predicate} {object}, но и создают основу для дальнейших изменений.',
  '{start} {subject} {predicate} {object}, особенно когда требуется устойчивый результат.',
  '{start} можно сказать, что {subject} {predicate} {object} {ending}',
  '{subject} в большинстве случаев {predicate} {object} {ending}',
  '{subject} постепенно приводят к {objectGen}, что особенно важно в современных условиях.',
  '{start} {subject} всё чаще {predicate} {object} {ending}',
  '{start} {subject} {predicate} {object}, если процесс организован последовательно.',
  '{start} {subject} помогают не просто решить задачу, а {predicate} {object} {ending}',
  '{start} {subject} подтверждают, что методы оценки помогают адаптироваться к {objectDat} {ending}',
  '{subject} обеспечивают устойчивость в {objectLoc} {ending}',
] as const;
