import { useState } from 'react';
import { Calendar } from "react-big-calendar";
import 'react-big-calendar/lib/css/react-big-calendar.css'

import { getMessagesEs, localizer } from '../../helpers';
import { CalendarEvent, CalendarModal, Navbar } from "../";
import { useCalendarStore, useUiStore } from '../../hooks';
import { FabAddNew } from '../';
import { FabDelete } from '../components/FabDelete';



export const CalendarPage = () => {

  const { openDateModal } = useUiStore();
  const { events, setActiveEvent } = useCalendarStore();

  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month');

  const eventStyleGetter = (event, start, end, isSelected) => {

    const style = {
      backgroundColor: "#234145",
      whiteSpace: "normal",
      wordWrap: "break-word",
      overflow: "hidden",
      textOverflow: "ellipsis"
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
