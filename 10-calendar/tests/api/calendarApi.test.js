import { calendarApi } from "../../src/api/calendarApi"

describe('Pruebas en el calendarApi', () => { 
    test('debe tener la configuración por defecto', () => {
      expect(calendarApi.defaults.baseURL).toBe(process.env.VITE_API_URL)
    })
    
    test('debe tener el x-token en el header de todas las peticiones', async() => {
      const token = 'ABC123'
      localStorage.setItem('token', token);

      /*const mockPost = jest.spyOn(calendarApi, 'post').mockResolvedValue({
        data:{},
        status: 200,
        config: {
          headers: {
            'x-token': token
          }
        }
      });
      */

      const res = await calendarApi.post('/auth', {
        email: 'test@google.com',
        password: '123456'
      })

      // Verify the token is in the headers
      expect(res.config.headers['x-token']).toBe(token);

       // Clean up the mock
      //mockPost.mockRestore();
    })
    
 })