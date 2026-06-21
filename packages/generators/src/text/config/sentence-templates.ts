const SENTENCE_TEMPLATES_EN_SHORT = [
  '{subject} {predicate} {object}.',
  '{subject} support {object}.',
  '{subject} improve {object}.',
  '{subject} reduce risks.',
  '{subject} help teams move forward.',
] as const;

const SENTENCE_TEMPLATES_EN_MEDIUM = [
  '{start} {subject} {predicate} {object} {ending}',
  '{subject} gradually improve {object} {ending}',
  '{subject} increasingly support {object} {ending}',
  '{subject} help maintain stability in {objectLoc} {ending}',
  '{subject} create conditions for {objectDat} {ending}',
] as const;
