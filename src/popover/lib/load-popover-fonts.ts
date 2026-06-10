// it needs to link the fonts for the Shadow DOM separately, otherwise, they won't work
export const loadPopoverFonts = async (): Promise<void> => {
  const regular = new FontFace('LoremGoogleSans', `url('${chrome.runtime.getURL('fonts/GoogleSans-Regular.woff2')}')`, {
    weight: '400',
    style: 'normal',
  });

  const medium = new FontFace('LoremGoogleSans', `url('${chrome.runtime.getURL('fonts/GoogleSans-Medium.woff2')}')`, {
    weight: '500',
    style: 'normal',
  });

  await Promise.all([regular.load(), medium.load()]);

  document.fonts.add(regular);
  document.fonts.add(medium);
};
