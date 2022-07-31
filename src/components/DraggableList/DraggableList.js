import React, { useEffect } from 'react';
import DraggableListItem from './DraggableListItem';
import { DragDropContext, Droppable, OnDragEndResponder } from 'react-beautiful-dnd';
import { reorder } from './helpers'

const DraggableList = React.memo(({ items, names, setItemsToSend, itemsToSend }) => {

    const onDragEnd = ({ destination, source }) => {
        // dropped outside the list
        if (!destination) return;
        const newItems = reorder(itemsToSend, source.index, destination.index);
        setItemsToSend(newItems);
    };

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

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable-list">
                {provided => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                        {itemsToSend.map((item, index) => (
                            <DraggableListItem
                                item={names.filter(fullItem => fullItem.id === item)[0]}
                                index={index}
                                key={item}
                            />
                        ))}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
});

export default DraggableList;