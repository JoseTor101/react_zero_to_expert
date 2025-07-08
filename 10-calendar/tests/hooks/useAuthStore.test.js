import { configureStore } from '@reduxjs/toolkit';
import { act, renderHook, waitFor } from '@testing-library/react';
import { authSlice } from "../../src/store"
import { Provider } from "react-redux";
import { initialState, notAuthenticatedState } from '../fixtures/authStates';
import { useAuthStore } from '../../src/hooks';
import { testUserCredentials } from '../fixtures/testUser';
import { calendarApi } from '../../src/api/calendarApi';

const getMockStore = (initialState) => {
    return configureStore({
        reducer: {
            auth: authSlice.reducer
        },
        preloadedState: {
            auth: { ...initialState }
        }
    })
}

describe('Pruebas en el useAuthStore', () => {

    beforeEach(() => localStorage.clear());


    test('debe retornar los valores por defecto', () => {
        const mockStore = getMockStore({ initialState });

        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>
        });

        expect(result.current).toEqual({
            status: undefined,
            user: undefined,
            errorMessage: undefined,
            startLogin: expect.any(Function),
            startRegister: expect.any(Function),
            checkAuthToken: expect.any(Function),
            startLogout: expect.any(Function)
        })
    }),
        test('startLogin debe de realizar el login correctamente', async () => {

            const mockStore = getMockStore({ ...notAuthenticatedState });

            const { result } = renderHook(() => useAuthStore(), {
                wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>
            });

            await act(async () => {
                await result.current.startLogin(testUserCredentials)
            })

            expect(result.current).toEqual(
                expect.objectContaining({
                    errorMessage: undefined,
                    status: 'authenticated',
                    user: expect.objectContaining({
                        name: 'Test User',
                        uid: expect.any(String)
                    })
                })
            );

            expect(result.current.user.uid).not.toBe('');

            expect(localStorage.getItem('token')).toEqual(expect.any(String));
            expect(localStorage.getItem('token-init-date')).toEqual(expect.any(String));


        })

    test('startLogin debe de fallar la autenticación', async () => {
        const mockStore = getMockStore({ ...notAuthenticatedState });

        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>
        });

        await act(async () => {
            await result.current.startLogin({ ...testUserCredentials, password: '123456_' })
        })

        expect(result.current).toEqual(expect.objectContaining({
            status: 'not-authenticated',
            user: {},
            errorMessage: expect.any(String),
        }))

        expect(localStorage.getItem('token')).toBe(null);


        expect(localStorage.getItem('token-init-date')).toBe(null);

        await waitFor(
            () => expect(result.current.errorMessage).toBe(undefined)
        );
    });

    test('startRegister debe de crear un usuario', async () => {

        const newUser = { name: 'algo', email: 'algo@gmail.com', password: '123456_' };
        const mockStore = getMockStore({ ...notAuthenticatedState });

        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>
        });

        const spy = jest.spyOn(calendarApi, 'post').mockReturnValue({
            data: {
                ok: true,
                uid: '1263781293',
                name: 'Test User',
                token: 'ALGUN-TOKEN'
            }
        });

        await act(async () => {
            await result.current.startRegister(newUser)
        })


        const { errorMessage, status, user } = result.current;

        expect({ errorMessage, status, user }).toEqual({
            errorMessage: undefined,
            status: 'authenticated',
            user: { name: 'Test User', uid: '1263781293' }
        });

        spy.mockRestore();
    });

    test('startRegister debe de fallar la creación', async() => {

        const mockStore = getMockStore({ ...notAuthenticatedState });

        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>
        });

        await act(async () => {
            await result.current.startRegister(testUserCredentials)
        })

        const { errorMessage, status, user } = result.current;

        expect({ errorMessage, status, user }).toEqual({
            errorMessage: expect.any(String),
            status: 'not-authenticated',
            user: {}
        });

    });
    
    test('checkAuthToken debe de fallar si no hay token', async() => {
        const mockStore = getMockStore({ ...initialState });

        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>
        });

        await act(async () => {
            await result.current.checkAuthToken()
        })

        const { errorMessage, status, user } = result.current;
        expect({ errorMessage, status, user }).toEqual({
            errorMessage: undefined,
            status: 'not-authenticated',
            user: {}
        });
    });

    test('checkAuthToken debe de autenticar el usuario si hay un token', async() => {

        const {data} = await calendarApi.post('/auth', testUserCredentials );
        localStorage.setItem('token', data.token);

        const mockStore = getMockStore({ ...initialState });

        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>
        });

        await act(async () => {
            await result.current.checkAuthToken()
        })

        const { errorMessage, status, user } = result.current;
        expect({ errorMessage, status, user }).toEqual({
            errorMessage: undefined,
            status: 'authenticated',
            user: {
                name: testUserCredentials.name,
                uid: expect.any(String)
            }
        });
    });

})