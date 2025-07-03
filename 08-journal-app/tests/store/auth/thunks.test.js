import { authSlice, checkingCredentials, login, logout } from "../../../src/store/auth"
import { checkingAuthentication, logoutUser, startGoogleSignIn } from "../../../src/store/auth/thunks"
import { demoUser } from "../../fixtures/authFixtures"
import {logoutFirebase, signInWithGoogle} from '../../../src/firebase/providers'
import { clearNotesLogout } from "../../../src/store/journal"

jest.mock('../../../src/firebase/providers')

describe('Pruebas en auth thunks', () => { 
    const dispatch = jest.fn();
    test('Debe de invocar el checkingCredentials', async() => {
      

        // Porque devuelve una función
        await checkingAuthentication()(dispatch);
        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());

    })
    
    test('startGoogleSignIn debe de llamar checkingCredentials y login -exito', async() => {
       
        const loginData = {ok:true, ...demoUser};
        await signInWithGoogle.mockResolvedValue(loginData);

        //thunk
        await startGoogleSignIn()(dispatch);

        expect(dispatch).toHaveBeenCalledWith( checkingCredentials( ));
        expect(dispatch).toHaveBeenCalledWith( login(loginData));
    })
    test('startGoogleSignIn debe de llamar checkingCredentials y login -Error', async() => {
       
        const loginData = {ok:false, errorMessage: 'Un error en Google'};

        await signInWithGoogle.mockResolvedValue(loginData);

        //thunk
        await startGoogleSignIn()(dispatch);
        //await authSlice.reducer(loginData, logout(loginData))

        expect(dispatch).toHaveBeenCalledWith( checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith( logout(loginData.errorMessage));
    })
    

    test('startLogout debe de llamar a logoutFirebase, clearNotes y logout', async()=> {
        await logoutUser()(dispatch);

        expect( logoutFirebase ).toHaveBeenCalled();
        expect( dispatch ).toHaveBeenCalledWith(clearNotesLogout());
        expect( dispatch ).toHaveBeenCalledWith(logout());
    })
})