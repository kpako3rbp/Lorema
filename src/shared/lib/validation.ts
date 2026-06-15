type ValidationResult = {
  isValid: boolean;
  message?: string;
};

const ERROR_TIMEOUT = 1000;

export const validateCountryCode = (
  value: string,
  messages: {
    invalid: string;
  },
): ValidationResult => {
  const trimmedValue = value.trim();

  if (!trimmedValue) {
    return {
      isValid: true,
    };
  }

  if (!/^\+?\d+$/.test(trimmedValue)) {
    return {
      isValid: false,
      message: messages.invalid,
    };
  }

  return {
    isValid: true,
  };
};

export const validateNumberInput = (
  input: HTMLInputElement,
  min: number | undefined,
  max: number | undefined,
  messages: {
    invalid: string;
    min: string;
    max: string;
  },
): ValidationResult => {
  const value = Number(input.value);

  if (!input.value.trim() || !Number.isFinite(value)) {
    return {
      isValid: false,
      message: messages.invalid,
    };
  }

  if (!Number.isInteger(value)) {
    return {
      isValid: false,
      message: messages.invalid,
    };
  }

  if (min !== undefined && value < min) {
    return {
      isValid: false,
      message: messages.min,
    };
  }

  if (max !== undefined && value > max) {
    return {
      isValid: false,
      message: messages.max,
    };
  }

  return {
    isValid: true,
  };
};

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
