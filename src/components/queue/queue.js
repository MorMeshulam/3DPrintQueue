import React, { Component } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import QueueItem from '../queue_item/queue_item';
import './queue.css';

export default class Queue extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            items: []
        };
        this.onDragEnd = this.onDragEnd.bind(this);
        this.reorder = this.reorder.bind(this);
        this.renderDraggableContent = this.renderDraggableContent.bind(this);
    }

    reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);

        if (removed.isRunning) {
            alert('cannt move current printing job.');
            return;
        }
        result.splice(endIndex, 0, removed);

        this.props.reorderQueue({ startIndex, endIndex });
        return result;
    };

    onDragEnd(result) {
        // dropped outside the list
        if (!result.destination) {
            return;
        }

        const items = this.reorder(
            this.state.items,
            result.source.index,
            result.destination.index,
        );

        this.setState({ items });
    }

    renderQueue(queueData) {
        return (
            <div>
                {
                    queueData.map((item, key) =>
                        this.renderQueueItem(item, key))
                }
            </div>
        )
    }

    renderQueueItem(item, key) {
        const { removeQueueItem } = this.props;

        return <QueueItem key={key} item={item} remove={removeQueueItem} />
    }

    renderDraggableContent(queueData) {
        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                <Droppable droppableId="droppable">
                    {(droppableProvided, droppableSnapshot) => (
                        <div ref={droppableProvided.innerRef}>
                            {queueData.map((item, index) => (
                                <Draggable key={item.id} draggableId={item.id} index={index}>
                                    {(draggableProvided, draggableSnapshot) => (
                                        <div
                                            ref={draggableProvided.innerRef}
                                            {...draggableProvided.draggableProps}
                                            {...draggableProvided.dragHandleProps}
                                        >
                                            {this.renderQueueItem(item)}

                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {droppableProvided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        );
    }

    render() {
        const { queue, draggable } = this.props;
        this.state.items = queue;

        let content;
        if (draggable) {
            content = this.renderDraggableContent(queue)
        }
        else {
            content = this.renderQueue(queue)
        }
        return content;
    }
}