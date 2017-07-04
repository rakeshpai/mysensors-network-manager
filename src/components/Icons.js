// Icons from https://feather.netlify.com/
import React from 'react';

const defaultProps = ({size, strokeWidth, color}) => ({
  strokeLinecap: 'round',
  fill: 'none',
  strokeLinejoin: 'round',
  width: size,
  height: size,
  strokeWidth,
  stroke: color,
  viewBox: '0 0 24 24'
});

export const SiteIcon = ({size = 24, strokeWidth = 1, color = '#ccc'}) => (
  <svg {...defaultProps({size, strokeWidth, color})}>
    <path d="M12.89 1.45l8 4A2 2 0 0 1 22 7.24v9.53a2 2 0 0 1-1.11 1.79l-8 4a2 2 0 0 1-1.79 0l-8-4a2 2 0 0 1-1.1-1.8V7.24a2 2 0 0 1 1.11-1.79l8-4a2 2 0 0 1 1.78 0z" />
    <polyline points="2.32 6.16 12 11 21.68 6.16" />
    <line x1="12" y1="22.76" x2="12" y2="11" />
    <line x1="7" y1="3.5" x2="17" y2="8.5" />
  </svg>
);

const defaultSize = 18;
const defaultStroke = 2;
const defaultColor = '#999';

export const EditIcon = ({size = defaultSize, strokeWidth = defaultStroke, color = defaultColor}) => (
  <svg {...defaultProps({size, strokeWidth, color})}>
    <path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34"/>
    <polygon points="18 2 22 6 12 16 8 16 8 12 18 2"/>
  </svg>
);

export const CodeIcon = ({size = defaultSize, strokeWidth = defaultStroke, color = defaultColor}) => (
  <svg {...defaultProps({size, strokeWidth, color})}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </svg>
);

export const HamburgerIcon = ({size = defaultSize, strokeWidth = defaultStroke, color = defaultColor}) => (
  <svg {...defaultProps({size, strokeWidth, color})}>
    <line x1="3" y1="12" x2="21" y2="12"/>
    <line x1="3" y1="6" x2="21" y2="6"/>
    <line x1="3" y1="18" x2="21" y2="18"/>
  </svg>
);

export const Trash = ({size = defaultSize, strokeWidth = defaultStroke, color = defaultColor}) => (
  <svg {...defaultProps({size, strokeWidth, color})}>
    <polyline points="3 6 5 6 21 6"/>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
    <line x1="10" y1="11" x2="10" y2="17"/>
    <line x1="14" y1="11" x2="14" y2="17"/>
  </svg>
);

export const Network = ({size = defaultSize, strokeWidth = defaultStroke, color = defaultColor}) => (
  <svg {...defaultProps({size, strokeWidth, color})}>
    <circle cx="18" cy="5" r="3"/>
    <circle cx="6" cy="12" r="3"/>
    <circle cx="18" cy="19" r="3"/>
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
  </svg>
);

export const Board = ({size = defaultSize, strokeWidth = defaultStroke, color = defaultColor}) => (
  <svg {...defaultProps({size, strokeWidth, color})}>
    <rect x="4" y="4" width="16" height="16" rx="2" ry="2"/>
    <rect x="9" y="9" width="6" height="6"/>
    <line x1="9" y1="1" x2="9" y2="4"/>
    <line x1="15" y1="1" x2="15" y2="4"/>
    <line x1="9" y1="20" x2="9" y2="23"/>
    <line x1="15" y1="20" x2="15" y2="23"/>
    <line x1="20" y1="9" x2="23" y2="9"/>
    <line x1="20" y1="14" x2="23" y2="14"/>
    <line x1="1" y1="9" x2="4" y2="9"/>
    <line x1="1" y1="14" x2="4" y2="14"/>
  </svg>
);

export const Plus = ({size = defaultSize, strokeWidth = defaultStroke, color = defaultColor}) => (
  <svg {...defaultProps({size, strokeWidth, color})}>
    <line x1="12" y1="5" x2="12" y2="19"/>
    <line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
)

export const Check = ({size = defaultSize, strokeWidth = defaultStroke, color = defaultColor}) => (
  <svg {...defaultProps({size, strokeWidth, color})}>
    <polyline points="9 11 12 14 23 3"/>
    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
  </svg>
);

export const Square = ({size = defaultSize, strokeWidth = defaultStroke, color = defaultColor}) => (
  <svg {...defaultProps({size, strokeWidth, color})}>
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
  </svg>
);

export const ThumbsUp = ({size = defaultSize, strokeWidth = defaultStroke, color = defaultColor}) => (
  <svg {...defaultProps({size, strokeWidth, color})}>
    <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/>
  </svg>
);

export const ThumbsDown = ({size = defaultSize, strokeWidth = defaultStroke, color = defaultColor}) => (
  <svg {...defaultProps({size, strokeWidth, color})}>
    <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"/>
  </svg>
);

export const Download = ({size = defaultSize, strokeWidth = defaultStroke, color = defaultColor}) => (
  <svg {...defaultProps({size, strokeWidth, color})}>
      <path d="M3 17v3a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-3"/>
      <polyline points="8 12 12 16 16 12"/>
      <line x1="12" y1="2" x2="12" y2="16"/>
  </svg>
)

export const Circle = ({size = defaultSize, strokeWidth = defaultStroke, color = defaultColor}) => (
  <svg {...defaultProps({size, strokeWidth, color})}>
    <circle cx="12" cy="12" r="10"/>
  </svg>
)

export const CheckCircle = ({size = defaultSize, strokeWidth = defaultStroke, color = defaultColor}) => (
  <svg {...defaultProps({size, strokeWidth, color})}>
    <path d="M22 11.07V12a10 10 0 1 1-5.93-9.14"/>
    <polyline points="23 3 12 14 9 11"/>
  </svg>
)
