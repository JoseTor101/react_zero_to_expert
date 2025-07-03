/**
 * @jest-environment node
 */
import { startNewNote } from "../../../src/store/journal/thunks"
import { addNewEmptyNote, savingNewNote, setActiveNote } from "../../../src/store/journal";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { FirebaseDB } from "../../../src/firebase/config";


describe('Pruebas en journal thunks', () => {

    const dispatch = jest.fn();
    const getState = jest.fn();

    beforeEach(() => jest.clearAllMocks());

    test('startNewNote debe de crear una nueva nota en blanco', async () => {
        const uid = 'TEST-UID'
        getState.mockReturnValue({ auth: { uid: uid } });

        const reps = await startNewNote()(dispatch, getState);
        console.log(reps)
        expect(dispatch).toHaveBeenNthCalledWith(1, addNewEmptyNote({
            body: '',
            title: '',
            id: expect.any(String),
            date: expect.any(Number),
            imageUrls: expect.any(Array),
        }));
        expect(dispatch).toHaveBeenNthCalledWith(2, setActiveNote({
            body: '',
            title: '',
            id: expect.any(String),
            date: expect.any(Number),
            imageUrls: expect.any(Array),
        }));

        // Borrar de firebase
        const collectionRef = collection( FirebaseDB, `${uid}/journal/notes`);
        const docs =  await getDocs(collectionRef);

        const deletePromises = [];
        docs.forEach( doc => deletePromises.push(deleteDoc(doc.ref)));

        await Promise.all(deletePromises);

    })

})