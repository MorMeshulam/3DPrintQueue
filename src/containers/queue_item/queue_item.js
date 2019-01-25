import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as QueueActions from '../../redux/actions/queue';

import QueueItem from '../../components/queue_item/queue_item';

export class QueueItemContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    renderWorkingkItem(currentTab, working_item) {
        const { cancel } = this.props;

        if (currentTab == 'queue' && working_item)
            return <QueueItem key={'working_item'} item={working_item} cancel={cancel} />
    }

    render() {
        const { working_item, currentTab } = this.props;
     
        return (
            <div className="queue_item">
                {this.renderWorkingkItem(currentTab, working_item)}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        working_item: state.queue.working_item
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        add: bindActionCreators(QueueActions.add, dispatch),
        remove: bindActionCreators(QueueActions.remove, dispatch),
        reorder: bindActionCreators(QueueActions.reorder, dispatch),
        cancel: bindActionCreators(QueueActions.cancel, dispatch),
        test: bindActionCreators(QueueActions.test, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QueueItemContainer)
