import React, { Component } from 'react';
import Modal from 'react-modal';

import { DangerButton, LinkButton } from './Buttons';
import { css } from 'glamor';

css.global('.ReactModal__Body--open', { overflow: 'hidden' });
css.global('.ReactModal__Body--open #root', {
  filter: 'blur(2px)',
  opacity: 0.5
});

const center = 'translate(-50%, -50%)';

const styles = {
  contentBase: css({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: center,
    background: '#fff',
    boxShadow: '0 0 15px rgba(0,0,0,0.3)',
    border: '1px solid #aaa',
    borderRadius: 5,
    outline: 0,
    animation: `${css.keyframes({
      '0%': { transform: `${center} scale(0.1)`, opacity: 0 },
      '60%': { transform: `${center} scale(1.1)`, opacity: 1 },
      '100%': { transform: `${center} scale(1)` }
    })} .3s`,

    '& h1': {
      fontWeight: 300,
      fontSize: '1.6em',
      textAlign: 'center',
      margin: '10px 10px 20px',
      borderBottom: '1px solid #eee'
    },

    '& footer': {
      textAlign: 'center',
      padding: '15px 0 5px 0',
    }
  }),

  closeBtn: css({
    position: 'absolute',
    top: 0,
    right: 0,

    '& button': {
      position: 'absolute',
      top: 0,
      right: 0,
      padding: 6,

      fontSize: 11,
      border: '1px solid transparent',
      borderTopRightRadius: 5,

      '&:hover': {
        background: '#eee',
        color: '#111',
        textDecoration: 'none'
      }
    }
  }),

  overlay: css({
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0,0,0,0.3)'
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
        contentLabel={this.state.suppliedProps.contentLabel || 'Modal'}
        isOpen={this.state.isOpen}
        className={{
          base: css(styles.contentBase, { maxWidth: this.state.suppliedProps.maxWidth }),
        }}
        overlayClassName={{
          base: styles.overlay
        }}>

        <div className={styles.closeBtn}>
          <LinkButton tabIndex='0' onClick={this.hide.bind(this)} title='Close'>✕</LinkButton>
        </div>

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
    maxWidth: 400
  }, (
    <div>
      <p>
        {text}
      </p>
      <footer>
        <DangerButton onClick={() => { hide(); resolve(); }}>
          {dangerButtonText}
        </DangerButton>
      </footer>
    </div>
  ));
});

export const showLazy = ({ componentPromise, modalProps, componentProps }) => {
  show(modalProps, (
    <div>
      Loading...
    </div>
  ));

  componentPromise.then(({ default: Component}) => {
    show(modalProps, <Component {...componentProps} />);
  });
}
