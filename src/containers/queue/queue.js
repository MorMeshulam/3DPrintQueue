import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as QueueActions from '../../redux/actions/queue';

import Queue from '../../components/queue/queue';

export class QueueContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    renderQueue(currentTab) {
        const { queue, remove, cancel, reorder } = this.props;

        if (currentTab == 'queue' && queue.pending.length > 0)
            return (
                <div>
                    <Queue queue={queue.pending} draggable
                        reorderQueue={reorder}
                        cancelWorkItem={cancel}
                        removeQueueItem={remove} />
                </div>
            )

        if (currentTab == 'completed' && queue.completed.length > 0)
            return <Queue queue={queue.completed} />

        //default
        return <div className="empty">No Content</div>
    }

    render() {
        const { currentTab } = this.props;

        return (
            <div className="queue">
                {this.renderQueue(currentTab)}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        queue: state.queue.data
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        add: bindActionCreators(QueueActions.add, dispatch),
        remove: bindActionCreators(QueueActions.remove, dispatch),
        reorder: bindActionCreators(QueueActions.reorder, dispatch),
        cancel: bindActionCreators(QueueActions.cancel, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QueueContainer)
