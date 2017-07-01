import { css } from 'glamor';

export const pop = `${css.keyframes({
  '0%': { transform: 'scale(0.1)', opacity: 0 },
  '60%': { transform: 'scale(1.1)', opacity: 1 },
  '100%': { transform: 'scale(1)' }
})} .3s`;
