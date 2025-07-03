import { useDispatch, useSelector } from "react-redux";
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from "../store";

export const useCalendarStore = () => {
    const dispatch = useDispatch();
    const { events, activeEvent } = useSelector(state => state.calendar);

    const setActiveEvent = (calendarEvent) => {
        dispatch(onSetActiveEvent(calendarEvent))
    };

    const startSavingEvent = async (calendarEvent) =>{
        // TODO: llegar al backend
        if(calendarEvent._id){
            //actualizando
            dispatch(onUpdateEvent({...calendarEvent}))
        }else{
            //creando
           dispatch(onAddNewEvent({
                ...calendarEvent, 
                _id: new Date().getTime(),
                bgColor: '#fafafa',
                user: {
                    _id: '123',
                    name: 'jt'
                }
            }))
        }
    }

    const startDeletingEvent = () => {
        dispatch(onDeleteEvent());
    }

    return {
        events,
        activeEvent,
        hasEventSelected: !!activeEvent,

        setActiveEvent,
        startSavingEvent,
        startDeletingEvent
    }
};