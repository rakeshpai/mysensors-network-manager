import { css } from 'glamor';

import { linkColor } from './colors';
import { fontFamily } from './typography';
import { outlineStyle } from './forms';
import { transition } from './animations';

css.global('*', { boxSizing: 'border-box' });
css.global('html, body', { margin: 0, padding: 0, fontFamily })
css.global('a', { color: linkColor });

const blockInputTypes = ['text', 'number', 'password'];
const blockFields = [ ...blockInputTypes.map(t => `input[type=${t}]`), 'select' ];

css.global(blockFields.join(), {
  display: 'inline-block',
  fontSize: 16,
  padding: 5,
  border: '1px solid #ddd',
  transition,
  background: '#fff',
  borderRadius: 5
});

css.global(blockFields.map(f => `${f}:focus`).join(), { ...outlineStyle });
css.global(blockFields.map(f => `${f}:invalid`).join(), { border: '1px solid red' });
css.global(blockFields.map(f => `${f}:invalid:focus`).join(), { boxShadow: '0px 0px 10px red' });
css.global('label', { cursor: 'pointer' });
css.global('fieldset', {
  border: '1px solid #ddd',
  borderRadius: 5,
  padding: 10,
  marginBottom: 20
});
