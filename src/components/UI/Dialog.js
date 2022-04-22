import React from 'react'

import Modal from './Modal'

const Notification = (props) => {
  return <Modal onClose={props.onClose}>{props.children}</Modal>
}

export default Notification
