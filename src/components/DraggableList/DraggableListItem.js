import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import useStyles from './styles'

const DraggableListItem = ({ item, index, disabled }) => {

    const classes = useStyles();

    return (
        <Draggable draggableId={item?.id} index={index} isDragDisabled={disabled}>
            {(provided, snapshot) => (
                <ListItem
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={snapshot.isDragging ? classes.draggingListItem : classes.regularListItem}
                    disabled={disabled}
                >
                    <ListItemText primary={item?.name} />
                </ListItem>
            )}
        </Draggable>
    );
};

export default DraggableListItem;
