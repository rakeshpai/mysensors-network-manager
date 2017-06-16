import React, { Component } from 'react';
import { css } from 'glamor';

const container = css({
  overflow: 'scroll',
  whiteSpace: 'pre',
  maxHeight: 500
});

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Component: props => <pre className={container}>{props.children}</pre>
    }
  }

  componentDidMount() {
    Promise.all([
      import('react-syntax-highlighter/dist/light'),
      import('react-syntax-highlighter/dist/languages/cpp'),
      import('react-syntax-highlighter/dist/styles/androidstudio')
    ]).then(([{ default: SyntaxHighlighter, registerLanguage }, {default: cpp}, {default: style}]) => {
      registerLanguage('cpp', cpp);

      this.setState({
        Component: props => (
          <SyntaxHighlighter language='cpp' style={style} className={container}>
            {this.props.children}
          </SyntaxHighlighter>
        )
      })
    })
  }

  render() {
    const Component = this.state.Component;

    return <Component>{this.props.children}</Component>;
  }
}
