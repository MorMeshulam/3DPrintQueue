import React, { Component } from 'react';
import {
    Navbar,
    NavbarBrand,
    NavbarToggler, Label,
    Form, FormGroup, CustomInput, Input, FormFeedback, FormText
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MyModal from '../modal/modal';
import './header.css';

export class Header extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            name_valid: false,
            duration: '',
            duration_valid: false,

            duration_format_min: true,
            duration_format_sec: false,
            duration_format: 'min',
            refresh: false,
            showAddModal: false,

            showTestModal: false,
            amount: 10,
            fuzzyJumpInterval: 5
        };

        this.onChangeValue = this.onChangeValue.bind(this);
        this.addItem = this.addItem.bind(this);
        this.renderNavBar = this.renderNavBar.bind(this);
        this.toggle = this.toggle.bind(this);
        this.toggleTest = this.toggleTest.bind(this);
    }

    refreshPage() {
        window.location.reload();
    }

    renderNavBar() {
        return (
            <Navbar>
                <NavbarBrand href="/">3DPrintQueue</NavbarBrand>
                <NavbarToggler onClick={this.toggle} />
                <div className="header__controls">
                    <button className="add__btn" onClick={() => { this.setState({ showTestModal: true }) }}><FontAwesomeIcon icon="tachometer-alt" /></button>
                    <button className="add__btn" onClick={() => { this.setState({ showAddModal: true }) }}><FontAwesomeIcon icon="plus-circle" /></button>
                    <button onClick={() => { this.refreshPage() }} className="control__btn"><FontAwesomeIcon icon="sync-alt" /></button>
                </div>
            </Navbar>
        )
    }

    onChangeValue(e) {

        const { name, value } = e.target;

        if (name == 'duration_format_min') {
            this.setState({ duration_format: 'min', duration_format_min: true, duration_format_sec: false });
        }
        if (name == 'duration_format_sec') {
            this.setState({ duration_format: 'sec', duration_format_sec: true, duration_format_min: false });
        }
        else {
            this.setState({ [name]: value });
        }

        this.validation({ ...this.state, [name]: value });
    }

    validation({ name, duration }) {

        let name_valid = false,
            duration_valid = false;

        if (name && name.length >= 3) {
            name_valid = true;
        }
        if (duration) {
            duration_valid = true;
        }

        this.setState({ name_valid, duration_valid })
        return name_valid && duration_valid;
    }

    addItem() {
        const { addQueueItem } = this.props;

        if (!this.validation(this.state)) return;

        const duration = this.state.duration_format == 'min' ? this.state.duration * 60 :
            this.state.duration_format == 'sec' ? this.state.duration * 1 : 0;

        const newItem = {
            name: this.state.name,
            duration
        }

        addQueueItem(newItem);
        this.toggle();
    }

    toggle() {
        this.setState({
            showAddModal: !this.state.showAddModal,
            name: '', duration: '', name_valid: false, duration_valid: false
        });
    }

    toggleTest() {
        this.setState({
            showTestModal: !this.state.showTestModal,
            amount: 100, fuzzyJumpInterval: 5
        });
    }

    renderAddQueueItemModal() {
        const { showAddModal, name, duration, duration_format,
            duration_format_min, duration_format_sec, name_valid, duration_valid } = this.state;

        const content =
            <div className="add">
                <div className="add__container">
                    <Form>
                        <FormGroup>
                            <Input type="text" value={name} name='name' valid={name_valid} autoFocus
                                minLength={3} onChange={this.onChangeValue} placeholder="Job Name" />
                            <FormFeedback valid>the value filled correctly</FormFeedback>
                            <FormText>Fill in the full job name/description</FormText>
                        </FormGroup>
                        <FormGroup>
                            <Input type="number" value={duration} name='duration'
                                onChange={this.onChangeValue} placeholder={`Duration (${duration_format})`} minLength="3" valid={duration_valid} />
                            <FormFeedback valid>the value filled correctly</FormFeedback>
                            <FormText>Fill in the job duration with numbers</FormText>
                        </FormGroup>

                        <FormGroup>
                            <Label for="duration__format">Duration Time Format</Label>
                            <div>
                                <CustomInput onChange={this.onChangeValue} checked={duration_format_min}
                                    type="checkbox" id="minutes" name="duration_format_min" label="Minutes" inline />
                                <CustomInput onChange={this.onChangeValue} checked={duration_format_sec}
                                    type="checkbox" id="seconds" name="duration_format_sec" label="Seconds" inline />
                            </div>
                        </FormGroup>
                    </Form>

                </div>
            </div>

        return (
            <MyModal show={showAddModal} title={'Add Queue Item'} content={content}
                onSubmit={this.addItem} toggle={this.toggle} />
        )
    }

    renderTestingModal() {
        const { showTestModal, amount, fuzzyJumpInterval } = this.state;

        const content =
            <div className="add">
                <div className="add__container">
                    <Form>
                        <FormGroup>
                            <Input type="number" value={amount} name='amount' autoFocus
                                minLength={3} onChange={this.onChangeValue} placeholder="Amount" />
                            <FormText>Fill in the number of queue items you want to create</FormText>
                        </FormGroup>
                        <FormGroup>
                            <Input type="number" value={fuzzyJumpInterval} name='fuzzyJumpInterval'
                                minLength={3} onChange={this.onChangeValue} placeholder="Fuzzy Jump Interval"  />
                            <FormText>this number will multiply the duration indexer (interval)</FormText>
                        </FormGroup>
                    </Form>

                </div>
            </div>

        return (
            <MyModal show={showTestModal} title={'Load Test'} content={content}
                onSubmit={() => {
                    this.props.loadTest({ amount, fuzzyJumpInterval });
                    this.toggleTest();
                }} toggle={this.toggleTest} />
        )
    }

    render() {
        const { working_item } = this.props;

        return (
            <div className="header" >
                {this.renderNavBar()}

                <div className="header__container">
                    <div className="current__job">
                        <h3><strong className="underlined">Current Running Job:</strong> {working_item && working_item.name || ''}</h3>
                    </div>
                </div>

                {this.renderAddQueueItemModal()}
                {this.renderTestingModal()}
            </div>
        );
    }
}

export default Header;