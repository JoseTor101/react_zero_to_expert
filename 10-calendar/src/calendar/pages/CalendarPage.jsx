import { useState, useEffect } from 'react';
import { Calendar } from "react-big-calendar";
import 'react-big-calendar/lib/css/react-big-calendar.css'

import { getMessagesEs, localizer } from '../../helpers';
import { CalendarEvent, CalendarModal, Navbar } from "../";
import { useAuthStore, useCalendarStore, useUiStore } from '../../hooks';
import { FabAddNew } from '../';
import { FabDelete } from '../components/FabDelete';



export const CalendarPage = () => {

  const { user } = useAuthStore();
  const { openDateModal } = useUiStore();
  const { events, setActiveEvent, startLoadingEvents } = useCalendarStore();

  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month');

   const eventStyleGetter = ( event, start, end, isSelected ) => {

    const isMyEvent = ( user.uid === event.user._id ) || ( user.uid === event.user.uid );

    const style = {
      backgroundColor: isMyEvent ? '#347CF7' : '#465660',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white'
    }

    return {
      style
    }
  }

  const onViewChanged = (event) => {
    localStorage.setItem('lastView', event);
    setLastView(event);
  }


  const onDoubleClick = (event) => {
    openDateModal();
  };

  const onSelect = (event) => {
    setActiveEvent(event)
  };

  useEffect(() => {
    startLoadingEvents();
  }, [])
  


  return (
    <>
      <Navbar />
      <Calendar
        culture='es'
        localizer={localizer}
        events={events}
        defaultView={lastView}
        view={lastView}
        onView={onViewChanged}
        startAccessor="start"
        endAccessor="end"
        style={{ height: '90vh' }}
        messages={getMessagesEs()}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEvent,
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onViewEvent={onViewChanged}
      />

      <CalendarModal/>
      <FabAddNew/>
      <FabDelete/>
    </>
  );
};
