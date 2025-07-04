import { useDispatch, useSelector } from "react-redux";
import
    import { calendarApi } from "../api/calendarApi";

export const useAuthStore = () => {
    
    const {status, user, errorMessage} = useSelector(state=>state.auth);
    const dispatch = useDispatch();

    const startLogin = async({email, password}) => {
        try {
            const resp = await calendarApi.post('/auth')
        } catch (error) {
            
        }
    }

    return{
        status,
        user,
        errorMessage
    }
};