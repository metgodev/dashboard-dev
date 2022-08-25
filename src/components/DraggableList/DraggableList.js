import React, { useEffect } from 'react';
import DraggableListItem from './DraggableListItem';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { reorder } from './helpers'
import useStyles from './styles'

const DraggableList = React.memo(({ items, names, setItemsToSend, itemsToSend }) => {

    const classes = useStyles()

    useEffect(() => {
        if (items !== undefined) {
            if (itemsToSend.length === 0 || items.length === 0) {
                setItemsToSend(items)
            }
            else {
                items.forEach(element => {
                    if (!itemsToSend.includes(element)) {
                        setItemsToSend(prev => [...prev, element])
                    }
                });
                itemsToSend.forEach(element => {
                    if (!items.includes(element)) {
                        const newItems = itemsToSend.filter(item => item !== element)
                        setItemsToSend(newItems)
                    }
                })
            }
        }
    }, [items])

    const onDragEnd = ({ destination, source }) => {
        if (!destination) return; // dropped outside the list
        const newItems = reorder(itemsToSend, source.index, destination.index);
        setItemsToSend(newItems);
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