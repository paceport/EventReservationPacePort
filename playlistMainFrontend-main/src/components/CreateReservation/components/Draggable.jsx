import React, { useState } from 'react';  
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';  
import EventData from '../Events.json';  
  
export default function DraggableComp() {  
    const [events, setEvents] = useState(EventData);  
  
    const onDragEnd = (result) => {  
        if (!result.destination) return;  
  
        const items = Array.from(events);  
        const [reorderedItem] = items.splice(result.source.index, 1);  
        items.splice(result.destination.index, 0, reorderedItem);  
  
        setEvents(items);  
    };  
  
    return (  
        <div>  
            <DragDropContext onDragEnd={onDragEnd}>  
                <Droppable droppableId="characters">  
                    {(provided) => (  
                        <ul className="characters" {...provided.droppableProps} ref={provided.innerRef}>  
                            {events.map(({ name, sessionName, duration, index }, idx) => {  
                                return (  
                                    <Draggable key={name} draggableId={name} index={idx}>  
                                        {(provided) => (  
                                            <li  
                                                ref={provided.innerRef}  
                                                {...provided.draggableProps}  
                                                {...provided.dragHandleProps}  
                                            >  
                                                <p>  
                                                    {sessionName} {name} {duration}  
                                                </p>  
                                            </li>  
                                        )}  
                                    </Draggable>  
                                );  
                            })}  
                            {provided.placeholder}  
                        </ul>  
                    )}  
                </Droppable>  
            </DragDropContext>  
        </div>  
    );  
}  


