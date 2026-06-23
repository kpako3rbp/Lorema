const ERROR_TIMEOUT = 1000;

export const showInputError = (inputEL: HTMLInputElement, errorEl: HTMLElement, message?: string): void => {
  if (!message) return;

  inputEL.classList.remove('error');
  errorEl.classList.remove('active');

  inputEL.classList.add('error');
  errorEl.textContent = message;
  errorEl.classList.add('active');

  window.setTimeout(() => {
    inputEL.classList.remove('error');
    errorEl.classList.remove('active');
    errorEl.textContent = '';
  }, ERROR_TIMEOUT);
};
