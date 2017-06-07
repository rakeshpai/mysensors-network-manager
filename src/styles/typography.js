import { css } from 'glamor';

export const headingFontFamily = `'Roboto', sans-serif`;
export const fontFamily = `'Roboto', sans-serif`;

export const pageHeading = css({
  fontFamily: headingFontFamily,
  fontWeight: 300,
  fontSize: 40,
  margin: '20px 0',
  color: '#888'
});

export const pageSubheading = css({
  color: '#888',
  fontSize: 16,
  fontFamily: headingFontFamily,
  marginBottom: 30
});

export const heading = css({
  fontFamily: headingFontFamily,
  fontWeight: 300,
  fontSize: 26,
  color: '#888',
  margin: '25px 0'
});

export const subheading = css({
  fontWeight: 'normal',
  marginTop: 30
});

export const unimportant = css({
  fontSize: 11,
  color: '#999'
});
