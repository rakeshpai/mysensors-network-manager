import React from 'react';
import SyntaxHighlighter, { registerLanguage } from 'react-syntax-highlighter/dist/light';
import cpp from 'react-syntax-highlighter/dist/languages/cpp';
import style from 'react-syntax-highlighter/dist/styles/gruvbox-dark';

registerLanguage('cpp', cpp);

export default ({children, ...props}) => (
  <SyntaxHighlighter language='cpp' style={style} {...props}>
    {children}
  </SyntaxHighlighter>
)
