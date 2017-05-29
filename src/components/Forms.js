import React, { Component } from 'react';
import { css } from 'glamor';
import { generateId } from '../lib/utils';
import MediaQuery from 'react-responsive';

const rightAligned = {
  container: css({
    display: 'table',
    width: '100%'
  }),
  label: css({
    display: 'table-cell',
    width: '35%',
    textAlign: 'right',
    paddingRight: 10
  }),
  fields: css({
    display: 'table-cell'
  })
};

class InternalRightAlignedLabel extends Component {
  constructor(props) {
    super(props);
    this.id = generateId();
  }

  componentDidMount() { this.addId(); }
  componentDidUpdate() { this.addId(); }

  addId() {
    if(!this.fieldsContainer) return;
    const node = this.fieldsContainer.querySelector('input:not([type=\'hidden\']), select');
    if(node) node.setAttribute('id', this.id);
  }

  render() {
    return (
      <div className={rightAligned.container}>
        <label className={rightAligned.label} htmlFor={this.id}>
          {this.props.label}
        </label>
        <div className={rightAligned.fields} ref={e => this.fieldsContainer = e}>
          {this.props.children}
        </div>
      </div>
    )
  }
}

const breakpointWidth = 400;
export const RightAlignedLabel = props => (
  <div>
    <MediaQuery query={`(min-width: ${breakpointWidth + 1}px)`}>
      <InternalRightAlignedLabel {...props} />
    </MediaQuery>
    <MediaQuery query={`(max-width: ${breakpointWidth}px)`}>
      <TopAlignedLabel {...props} />
    </MediaQuery>
  </div>
)

const topAligned = {
  container: css({
    display: 'block',
    margin: '10px 0',

    '& input, & select': {
      display: 'block',
      width: '100%',
      marginTop: 3
    }
  })
}
export const TopAlignedLabel = ({ label, children }) => (
  <label className={topAligned.container}>
    {label}
    <br />
    {children}
  </label>
);

const inline = css({
  display: 'block',
  position: 'relative',
  padding: '3px 0 5px 25px',

  '& input': {
    position: 'absolute',
    top: 3,
    left: 0
  }
});
export const InlineLabel = ({ label, children }) => (
  <label className={inline}>
    {children}
    {label}
  </label>
);
