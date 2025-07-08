import { calendarSlice, onAddNewEvent, onDeleteEvent, onLoadEvents, onLogoutCalendar, onSetActiveEvent, onUpdateEvent } from "../../../src/store"
import { calendarWithActiveEventState, calendarWithEventsState, events, initialState } from "../../fixtures/calendarStates"

describe('pruebas en calendarSlice', () => { 
    test('debe de retornar el estado inicial', () => {
      expect(calendarSlice.getInitialState()).toEqual(initialState)
    })

    test('onSetActiveEvent debe de activar el evento', () => {
        const state = calendarSlice.reducer(calendarWithEventsState, onSetActiveEvent(events[0]));
        expect(state.activeEvent).toEqual(events[0])
    })
    
    test('onAddNewEvent debe de agregar el evento', () => {

        const newEvent = {
            id: '3',
            start: new Date('2022-10-22 13:00:00'),
            end: new Date('2022-10-22 15:00:00'),
            title: 'Cumpleaños de Maria',
            notes: 'Alguna nota'
        }
        const state = calendarSlice.reducer(calendarWithEventsState, onAddNewEvent(newEvent));

        expect(state.events).toEqual([...events, newEvent])

    })

    test('onUpdateEvent debe de actualizar el evento', () => {
       const updatedEvent = {
            id: '1',
            start: new Date('2022-10-22 13:00:00'),
            end: new Date('2022-10-22 15:00:00'),
            title: 'Cumpleaños de Maria',
            notes: 'Alguna nota'
        }

        const state = calendarSlice.reducer(calendarWithEventsState, onUpdateEvent(updatedEvent));

        expect(state.events).toContain(updatedEvent);
    })
    
    test('onDeleteEvent debe de borrar el evento activo', () => {
        const state = calendarSlice.reducer(calendarWithActiveEventState, onDeleteEvent());
        expect(state.activeEvent).toBe(null);
        expect(state.events).not.toContain(events[0]);
    })
    
    test('onLoadEvents debe de establecer los eventos', () => {
        const state = calendarSlice.reducer(initialState, onLoadEvents(events));
        expect(state.events).toEqual(events);
    })
    
    test('onLogoutCalendar debe de limpiar el estado', () => {
        const state = calendarSlice.reducer(calendarWithActiveEventState, onLogoutCalendar());
        expect(state).toEqual(initialState);
    })
    
    
    
    
 })