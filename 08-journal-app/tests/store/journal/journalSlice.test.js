import {
  addNewEmptyNote,
  clearNotesLogout,
  deleteNoteById,
  journalSlice,
  savingNewNote,
  setActiveNote,
  setNotes,
  setPhotosToActiveNote,
  setSaving,
  updateNote,
} from '../../../src/store/journal/journalSlice';
 
import {
  arrayImageUrl,
  arrayNotes,
  initialState,
  newNote,
  payloadUpdateNote,
} from '../../fixtures/journalFixtures';
 
describe('Pruebas en journalSlice', () => {
  test('debe de regresar el estado incial y llamarse journal', () => {
    const state = journalSlice.reducer(initialState, {});
    expect(journalSlice.name).toBe('journal');
    expect(state).toEqual(initialState);
  });
 
  test('debe de cambiar el estado isSaving a verdadero', () => {
    const state = journalSlice.reducer(initialState, savingNewNote());
    expect(state.isSaving).toBeTruthy();
    expect(state).toEqual({ isSaving: true, messageSaved: '', notes: [], active: null });
  });
 
  test('debe de agregar la nota que llega por el payload al "notes"', () => {
    const state = journalSlice.reducer(initialState, addNewEmptyNote(newNote));
    expect(state.notes.length).toBe(1);
    expect(state.notes).toContain(newNote);
  });
 
  test('debe de establecer la nota activa y el messageSaved como un string vacío', () => {
    const state = journalSlice.reducer(initialState, setActiveNote(newNote));
    expect(state.active).toEqual(newNote);
    expect(state.messageSaved).toBe('');
  });
 
  test('debe de establecer un arreglo de notas en las "notes"', () => {
    const state = journalSlice.reducer(initialState, setNotes(arrayNotes));
    expect(state.notes).toEqual(arrayNotes);
    expect(state.notes.length).toBe(arrayNotes.length);
  });
 
  test('debe de establecer el isSaving verdadero y el messageSaved como un string vacío ', () => {
    const state = journalSlice.reducer(initialState, setSaving());
    expect(state.isSaving).toBeTruthy();
    expect(state.messageSaved).toBe('');
  });
 
  test('debe de actualizar la nota enviando el id por el payload y tener un messageSaved', () => {
    const state = journalSlice.reducer(initialState, setNotes(arrayNotes));
    const stateToUpdate = journalSlice.reducer(state, updateNote(payloadUpdateNote));
    expect(stateToUpdate.notes.find((note) => note.id === payloadUpdateNote.id)).toEqual(
      payloadUpdateNote,
    );
    expect(stateToUpdate.messageSaved).toBe(
      `${payloadUpdateNote.title}, actualizada correctamente`,
    );
  });
  test('debe de establecer un arreglo de imagenes en el imageUrl de la nota activa', () => {
    const state = journalSlice.reducer(initialState, setActiveNote(newNote));
    const stateWithActiveNote = journalSlice.reducer(state, setPhotosToActiveNote(arrayImageUrl));
    expect(stateWithActiveNote.active.imageUrls).toEqual(arrayImageUrl);
    expect(stateWithActiveNote.isSaving).toBeFalsy();
  });
 
  test('debe de establecer el estado inicial al hacer el clearNotesLogout', () => {
    const state = journalSlice.reducer(initialState, clearNotesLogout());
    expect(state).toEqual(initialState);
  });
 
  test('debe de eliminar una nota por el id del arreglo de "notes" y el active en null', () => {
    const state = journalSlice.reducer(initialState, setNotes(arrayNotes));
    const statusWithoutNote = journalSlice.reducer(state, deleteNoteById('1'));
    expect(statusWithoutNote.active).toBe(null);
    expect(statusWithoutNote.notes.length).toBe(2);
    expect(statusWithoutNote.notes).not.toContain(arrayNotes[0]);
  });
});