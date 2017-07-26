import React, { Component } from 'react';

export default resolver => {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = { Component: null }
    }

    componentDidMount() {
      resolver().then(({ default: Component }) => {
        this.setState({ Component });
      });
    }

    render() {
      const { Component } = this.state;

      if(Component) return <Component {...this.props} />

      return <div>Loading...</div>
    }
  }
}
