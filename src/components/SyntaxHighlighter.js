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
    import('./SyntaxHighlighterBundle').then(({default: SyntaxHighlighter}) => {
      this.setState({
        Component: props => (
          <SyntaxHighlighter className={container}>
            {this.props.children}
          </SyntaxHighlighter>
        )
      })
    });
  }

  render() {
    const Component = this.state.Component;

    return <Component>{this.props.children}</Component>;
  }
}
