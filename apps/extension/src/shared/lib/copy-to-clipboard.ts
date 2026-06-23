export const copyToClipboard = async (value: string): Promise<void> => {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(value);

    return;
  }

  const textarea = document.createElement('textarea');

  textarea.value = value;
  textarea.setAttribute('readonly', '');
  textarea.style.position = 'fixed';
  textarea.style.left = '-9999px';
  textarea.style.top = '-9999px';

  document.body.appendChild(textarea);

  textarea.focus();
  textarea.select();

  const isCopied = document.execCommand('copy');

  textarea.remove();

  if (!isCopied) {
    throw new Error('Failed to copy text');
  }
};
