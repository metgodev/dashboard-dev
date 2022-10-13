import React, { useEffect } from 'react';
import DraggableListItem from './DraggableListItem';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { reorder } from './helpers'
import useStyles from './styles'

const DraggableList = React.memo(({ names, setItemsToSend, itemsToSend, disabled }) => {

    const classes = useStyles()

    const onDragEnd = ({ destination, source }) => {
        if (!destination) return; // dropped outside the list
        const newItems = reorder(itemsToSend, source.index, destination.index);
        setItemsToSend(prev => ({ ...prev, objectIds: newItems }));
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable-list">
                {provided => (
                    <div ref={provided.innerRef} {...provided.droppableProps} className={classes.draggableContainer}>
                        {itemsToSend.map((item, index) => {
                            return (
                                (
                                    <DraggableListItem
                                        item={names.filter(fullItem => fullItem.id === item)[0]}
                                        index={index}
                                        key={item}
                                        disabled={disabled}
                                    />
                                )
                            )
                        })}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
});

export default DraggableList;