import React, { Component } from 'react';
import Modal from 'react-modal';

import { dangerButton, buttonLink } from '../styles/forms';
import { brandBackground } from '../styles/colors';
import { css } from 'glamor';

css.global('.ReactModal__Body--open', { overflow: 'hidden' });

const center = 'translate(-50%, -50%)';

const styles = {
  contentBase: css({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: center,
    background: '#fff',
    boxShadow: '0 0 10px rgba(0,0,0,0.5)'
  }),

  contentAfterOpen: css({
    animation: `${css.keyframes({
      '0%': { transform: `${center} scale(0.1)`, opacity: 0 },
      '60%': { transform: `${center} scale(1.1)`, opacity: 1 },
      '100%': { transform: `${center} scale(1)` }
    })} .3s`
  }),

  modalHeading: css({
    margin: 0,
    fontSize: 20,
    fontWeight: 300,
    background: brandBackground,
    padding: 10
  }),

  confirmFooter: css({
    textAlign: 'right',
    padding: '15px 0 5px 0',
  })
};

class ModalContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      suppliedProps: {},
      isOpen: false
    }
  }

  show(suppliedProps, contents) {
    this.setState({
      suppliedProps,
      contents,
      isOpen: true
    })
  }

  hide() {
    this.setState({ isOpen: false });
  }

  render() {
    return (
      <Modal
        shouldCloseOnOverlayClick={true}
        onRequestClose={this.hide.bind(this)}
        {...this.state.suppliedProps}
        contentLabel='Modal'
        isOpen={this.state.isOpen}
        className={{
          base: css(styles.contentBase, { maxWidth: this.state.suppliedProps.maxWidth }),
          afterOpen: styles.contentAfterOpen
        }}>

        <h1 className={styles.modalHeading}>
          {this.state.suppliedProps.heading}
        </h1>
        <div className={css({padding: 10})}>
          {this.state.contents}
        </div>
      </Modal>
    )
  }
}

let modalReference;

export const modalStub = <ModalContainer ref={r => modalReference = r} />
export const show = (...args) => modalReference.show(...args);
export const hide = () => modalReference.hide();

export const confirm = ({
  title = 'Are you sure?',
  text = 'Are you sure?',
  dangerButtonText = 'Yes',
  cancelButtonText = 'Cancel'
} = {}) => new Promise((resolve, reject) => {
  show({
    contentLabel: title,
    heading: title,
    maxWidth: 400
  }, (
    <div>
      <p>
        {text}
      </p>
      <footer className={styles.confirmFooter}>
        <input type='button' className={buttonLink} onClick={hide} value={cancelButtonText} />
        {' '}
        <input type='submit' className={dangerButton} onClick={() => { hide(); resolve(); }} value={dangerButtonText} />
      </footer>
    </div>
  ));
})

/*
setTimeout(() => {
  confirm().then(() => {
    console.log("Success");
  });
}, 1000)
*/
