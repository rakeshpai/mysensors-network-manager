import { css } from 'glamor';

import { linkColor } from './colors';
import { fontFamily } from './typography';
import { outlineStyle } from './forms';

css.global('*', { boxSizing: 'border-box', fontFamily });
css.global('html, body', { margin: 0, padding: 0 })
css.global('a', { color: linkColor });

const blockInputTypes = ['text', 'number', 'password'];
const blockFields = [ ...blockInputTypes.map(t => `input[type=${t}]`), 'select' ];

css.global(blockFields.join(), {
  display: 'inline-block',
  fontSize: 18,
  padding: 5,
  border: '1px solid #ddd',
  transition: 'all 0.3s ease-in',
  background: '#fff',
  borderRadius: 5
});

css.global(blockFields.map(f => `${f}:focus`).join(), { ...outlineStyle });
css.global(blockFields.map(f => `${f}:invalid`).join(), { border: '1px solid red' });
css.global(blockFields.map(f => `${f}:invalid:focus`).join(), { boxShadow: '0px 0px 10px red' });
css.global('label', { cursor: 'pointer' });
css.global('fieldset', {
  border: '1px solid #eee',
  borderRadius: 5,
  marginTop: 20,
  padding: 10
});
