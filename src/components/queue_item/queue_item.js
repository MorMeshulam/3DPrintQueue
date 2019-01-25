import React, { Component } from 'react';
import { Progress, Row, Col } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MyModal from '../modal/modal';
import './queue_item.css';

export class QueueItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showAddModal: false
        };
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({ showAddModal: !this.state.showAddModal });
    }

    renderProgressBar(isRunning, progressValue) {
        if (!isRunning) return null;

        return (
            <div className="queue__item_progress">
                <div className="text-center">{progressValue}%</div>
                <Progress value={progressValue} />
            </div>
        )
    }

    renderControls(index, isRunning, status) {

        if (isRunning)
            return (
                <button className="control__btn" onClick={() => {
                    this.setState({
                        description: 'Are you sure you want to cancel working item ?',
                        modalCallback: () => {
                            this.props.cancel(this.props.item.index);
                            this.toggle();
                        }
                    })
                    this.toggle();
                }}>
                    <FontAwesomeIcon className='cancel__btn' icon="minus-circle" /></button>
            );

        if (status == 'completed')
            return (
                <button className="control__btn"><FontAwesomeIcon className='complete__btn' icon="check-circle" /></button>
            );

        if (status == 'canceled')
            return (
                <button className="control__btn"><FontAwesomeIcon className='remove__btn' icon="minus-circle" /></button>
            );

        return (
            <div className="controls__container">
                <div className="control__block">
                    <button className="control__btn" onClick={() => {
                        this.setState({
                            description: 'Are you sure you want to delete this item ?',
                            modalCallback: () => {
                                this.props.remove(index);
                                this.toggle();
                            }
                        })
                        this.toggle();
                    }}>
                        <FontAwesomeIcon className='remove__btn' icon="trash" />
                    </button>
                </div>
            </div>
        );
    }

    renderModal() {
        const { showAddModal, description, modalCallback } = this.state;

        const content =
            <div className="add">
                <div className="add__container">
                    {description}
                </div>
            </div>

        return (
            <MyModal show={showAddModal} title={'Confirm box'} content={content}
                onSubmit={modalCallback} toggle={this.toggle} />
        )
    }

    render() {
        const { index, name, duration, isRunning, status, progress } = this.props.item;

        let progressValue = 0, isWorkingBG = '';
        if (isRunning) {
            progressValue = parseInt((progress / duration) * 100);
            isWorkingBG = 'working-item';
        }

        // console.log(this.props.item);
        const durationLabel = Math.round((duration / 60) * 100) / 100;

        return (
            <div className={`queue__item ${isWorkingBG}`}>
                <Row>
                    <Col xs="7" sm="5">
                        <div className="queue__item_content">
                            <p><FontAwesomeIcon icon="print" />{'  '}
                                <strong>Job Name:</strong> {name}
                                <strong className={status}>: {status}</strong></p>
                            <p><FontAwesomeIcon icon="clock" />{'  '}
                                <strong>Duration:</strong> {durationLabel} minutes</p>
                        </div>
                    </Col>

                    <Col xs="3" sm="5">
                        <div className="queue__item_progress">
                            {this.renderProgressBar(isRunning, progressValue)}
                        </div>
                    </Col>

                    <Col xs="2" sm="2">
                        <div className="queue__item_cotrols">
                            {this.renderControls(index, isRunning, status)}
                        </div>
                    </Col>
                </Row>

                {this.renderModal()}
            </div>
        );
    }
}

export default QueueItem;