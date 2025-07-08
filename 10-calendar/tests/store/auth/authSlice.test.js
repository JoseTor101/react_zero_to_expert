import { authSlice, clearErrorMessage, onLogin, onLogout } from "../../../src/store";
import { authenticatedState, initialState, notAuthenticatedState } from "../../fixtures/authStates";
import { testUserCredentials } from "../../fixtures/testUser";

describe('Pruebas en authSlice', () => {

    test('debe de regresar el estado por defecto', () => {
        expect(authSlice.getInitialState()).toEqual(initialState);
    })

    test('debe de realizar un login', () => {
        const state = authSlice.reducer(initialState, onLogin(testUserCredentials));
        
        expect(state).toEqual(authenticatedState)

    })

    test('debe de realizar el logout', () => {
      const state = authSlice.reducer(authenticatedState, onLogout());
      expect(state).toEqual(notAuthenticatedState)
    })
    
    test('debe de limpiar el mensaje de error', () => {
        const errorMessage = "Credenciales no válidas"
        let state = authSlice.reducer(authenticatedState, onLogout(errorMessage));
        state = authSlice.reducer(authenticatedState, clearErrorMessage());

        expect(state.errorMessage).toBe(undefined);
    })
    
    

})