import { onCloseDateModal, onOpenDateModal, uiSlice } from "../../../src/store";

const initialState = { isDateModalOpen: false }

describe('Pruebas en uiSlice', () => { 

    test('debe de regresar el estado por defecto', () => {
      expect(uiSlice.getInitialState()).toEqual(initialState)
    })

    test('debe de cambiar el isDateModalOpen correctamente', () => {

        let state = uiSlice.getInitialState()
        state = uiSlice.reducer(state, onOpenDateModal())
        expect(state.isDateModalOpen).toBeTruthy()

        state = uiSlice.reducer(state, onCloseDateModal())
        expect(state.isDateModalOpen).toBeFalsy()

    })
    
})