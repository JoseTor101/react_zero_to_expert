import { collection, deleteDoc, doc, setDoc } from "firebase/firestore";
import { addNewEmptyNote, deleteNoteById, setActiveNote, setNotes,setPhotosToActiveNote,setSaving, updateNote } from "./journalSlice";
import { FirebaseDB } from "../../firebase/config";
import { loadNotes } from "../../helpers/loadNotes";
import { fileUpload } from "../../helpers/fileUpload";

export const startNewNote = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;

    const newNote = {
      title: "",
      body: "",
      date: new Date().getTime(),
      imageUrls: []
      
    };

    const notesCollection = collection(FirebaseDB, uid, "journal", "notes");
    const newDoc = doc(notesCollection); // Auto-ID doc // Auto-ID doc
    await setDoc(newDoc, newNote);

    newNote.id = newDoc.id;

    dispatch(addNewEmptyNote(newNote));
    dispatch(setActiveNote(newNote));
  };
};

export const startLoadingNotes = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    if (!uid) throw new Error("El UID no existe");
    
    const notes = await loadNotes(uid);
    // Asegura que cada nota tenga imageUrls como array
    const notesWithImages = notes.map(note => ({
      ...note,
      imageUrls: note.imageUrls || []
    }));
    dispatch(setNotes(notesWithImages));
};
};

export const startSaveNote = () => {
    return async (dispatch, getState) => {
        dispatch(setSaving());
        const { uid } = getState().auth;
        const {active:note} = getState().journal;

        const noteToFireStore = {...note};
        delete noteToFireStore.id;

        const docRef = doc( FirebaseDB, `${uid}/journal/notes/${note.id}`);
        await setDoc(docRef, noteToFireStore, {merge: true})

        dispatch(updateNote(note));
    }
};

export const startUploadingFiles = ( files = [] ) => {
    return async( dispatch ) => {
        dispatch( setSaving() );
            
        const fileUploadPromises = [];
        for ( const file of files ) {
            fileUploadPromises.push( fileUpload( file ) )
        }

        const photosUrls = await Promise.all( fileUploadPromises );
        const secureUrls = photosUrls.map(photo => photo.secure_url);
        dispatch( setPhotosToActiveNote( secureUrls ));
    }
}


export const startDeletingNotes = () => {
    return async (dispatch, getState) => {
        const {uid} = getState().auth;
        const {active:note} = getState().journal;

        const docRef = doc( FirebaseDB, `${uid}/journal/notes/${note.id}`);
        await deleteDoc(docRef);

        dispatch(deleteNoteById(note.id));
    }
};