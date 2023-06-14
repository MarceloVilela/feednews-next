export const night = {
  primary300: '#0f1012',
  primary400: '#27242f',
  primary500: '#084d7e',
  primary600: '#0a63a2',

  background300: '#0f1012',
  background400: '#27242f',
  background500: '#33353b',
  background600: '#27242f',

  foreground300: '#f0f0f0',
  foreground400: '#bfbfc0',
  foreground500: '#bfbfc0',
  foreground600: '#bfbfc0',
};

export const day = {
  primary300: '#0c6eb5',
  primary400: '#0c6eb5',
  primary500: '#247cbc',
  primary600: '#5499cb',

  foreground300: '#0f1012',
  foreground400: '#27242f',
  foreground500: '#33353b',
  foreground600: '#999999',

  background300: '#bfbfc0',
  background400: '#bfbfc0',
  background500: '#fafafa',
  background600: '#fefefe',
};

export const theme = { ...day };

const styles = {
  spacing_int: 20,
  spacing: '20px',
  spacingSmall: '10px',
  colorLink: '#026AA2',

  font: '16px',

  fontTitle: {
    smaller: '22px',
    small: '23px',
    default: '24px',
    big: '25px',
    bigger: '26px',
  },

  fontSubTitle: {
    smaller: '18px',
    small: '19px',
    default: '20px',
    big: '21px',
    bigger: '22px',
  },

  fontParagraph: {
    smaller: '12px',
    small: '14px',
    default: '16px',
    big: '18px',
    bigger: '20px',
  },
};

export const preDefined = {
  link: {
    color: styles.colorLink,
    'text-decoration': 'underline',
  },
};

// 12,14,16,18,20,22,24,36,48
export const fontVariations = {
  '12px': {
    subTitle: '8px',
    lineHeight: '12px',
  },
  '14px': {
    subTitle: '10px',
    lineHeight: '14px',
  },
  '16px': {
    subTitle: '12px',
    lineHeight: '16px',
  },
  '18px': {
    subTitle: '14px',
    lineHeight: '20px',
  },
  '20px': {
    subTitle: '16px',
    lineHeight: '20px',
  },
  '22px': {
    subTitle: '18px',
    lineHeight: '26px',
  },
  '24px': {
    subTitle: '20px',
    lineHeight: '26px',
  },
  '36px': {
    subTitle: '20px',
    lineHeight: '40px',
  },
  '48px': {
    subTitle: '20px',
    lineHeight: '48px',
  },
};

export default styles;
