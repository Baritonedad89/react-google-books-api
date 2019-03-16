import React from 'react'
import { Modal, Button } from 'react-materialize'
import { PromiseProvider } from 'mongoose';



const Alert = (props) => {
    return (


        <Modal
            header='Modal Header'
            id="foo"
            bottomSheet>
            {props.modalMessage}
        </Modal>


    )



}

export default Alert

