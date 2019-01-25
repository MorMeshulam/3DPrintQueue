import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export default class MyModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };

    }

    render() {
        const { show, title, content, onSubmit, className,toggle } = this.props;

        return (
            <Modal isOpen={show} toggle={toggle} className={className}>
                <ModalHeader toggle={toggle}>{title}</ModalHeader>
                <ModalBody>
                    {content}
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={onSubmit}>Submit</Button>{' '}
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        )
    }
}
