export const renderOptions = <T extends string>(items: readonly T[], selected: T, labels: Record<T, string>): string =>
  items
    .map((item) => /*html*/ `<option value="${item}" ${item === selected ? 'selected' : ''}>${labels[item]}</option>`)
    .join('');
