import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Alert, Nav, NavItem, NavLink } from 'reactstrap';
import * as QueueActions from '../../redux/actions/queue';
import Loading from '../../components/loading/loading';

import Header from '../../components/header/header';
import QueueContainer from '../queue/queue';
import QueueItemContainer from '../queue_item/queue_item';
import './root.css';

export class Root extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentTab: 'queue'
        }
        this.switchTab = this.switchTab.bind(this);
    }

    componentWillMount = () => this.props.init();

    switchTab = () => {
        const { currentTab } = this.state;
        this.setState({ currentTab: currentTab == 'queue' ? 'completed' : 'queue' });
    }

    renderAlert = () => {
        return (
            <Alert color="success">
                <p>The item has complete</p>
            </Alert>
        )
    }

    render() {
        const { working_item, add, test, loading } = this.props;
        const { currentTab } = this.state;


        return (
            <div className="app">
                <Header addQueueItem={add} working_item={working_item} loadTest={test} />
                {/* {this.renderAlert()} */}

                <Nav tabs className="queue_nav">
                    <NavItem>
                        <NavLink onClick={this.switchTab} active={currentTab == 'queue'}>Pending\Working</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink onClick={this.switchTab} active={currentTab == 'completed'}>Completed</NavLink>
                    </NavItem>
                </Nav>

                {
                    loading ? <Loading size={100} block /> :
                        <div>
                            <QueueItemContainer currentTab={currentTab} />
                            <QueueContainer currentTab={currentTab} />
                        </div>
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { loading: state.ui.loading }
}

const mapDispatchToProps = (dispatch) => {
    return {
        init: bindActionCreators(QueueActions.init, dispatch),
        add: bindActionCreators(QueueActions.add, dispatch),
        test: bindActionCreators(QueueActions.test, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Root)
