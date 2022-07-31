import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

import makeStyles from '@material-ui/core/styles/makeStyles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles({
    draggingListItem: {
        background: 'rgb(235,235,235)',
    },
    regularListItem: {
        border: '1px solid rgba(0,0,0,0.3)',
        borderRadius: '5px',
        marginBottom: '5px',
        height: '40px'
    }
});

const DraggableListItem = ({ item, index }) => {
    const classes = useStyles();
    return (
        <Draggable draggableId={item.id} index={index}>
            {(provided, snapshot) => (
                <ListItem
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={snapshot.isDragging ? classes.draggingListItem : classes.regularListItem}
                >
                    <ListItemText primary={item.name} secondary={""} />
                </ListItem>
            )}
        </Draggable>
    );
};

export default DraggableListItem;
