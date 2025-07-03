import { authSlice, checkingCredentials, login, logout } from "../../../src/store/auth/authSlice"
import { authenticatedState, demoUser, initialState, notAuthenticatedState } from "../../fixtures/authFixtures";


describe('Pruebas en el authSlice', () => {
    test('debe de regresar el estado inicial y llamarse "auth"', () => {
        const state = authSlice.reducer(initialState, {});
        expect(state).toEqual(initialState);

        expect(authSlice.name).toBe("auth");
    })

    test('debe de realizar la autenticacion', () => {
        const state = authSlice.reducer(initialState, login(demoUser))

        expect(state).toEqual(authenticatedState)
    })

    test('debe de realizar el logout sin argumentos', () => {
        const state = authSlice.reducer(initialState, login(demoUser))

        const newState = authSlice.reducer(state, logout)
        expect(newState).toEqual(notAuthenticatedState)
    })

    test('debe de realizar el logout y mostrar un mensaje de error', () => {
        const errorMessage = "Un error ocurrió"
        const state = authSlice.reducer(initialState, login(demoUser))
        const newState = authSlice.reducer(state, logout({ errorMessage }))

        expect(newState).toEqual({
            ...notAuthenticatedState,
            errorMessage: errorMessage
        })

    })

    test('debe de cambiar el estado a checking', () => {
        const state = authSlice.reducer(initialState, checkingCredentials());

        expect(state).toEqual(
            {
                status: 'checking',
                uid: null,
                email: null,
                displayName: null,
                photoUrl: null,
                errorMessage: null
            }
        )

    })


})