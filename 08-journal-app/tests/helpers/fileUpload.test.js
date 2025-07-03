/**
 * @jest-environment node
 */
import { fileUpload } from "../../src/helpers/fileUpload"
import { v2 as cloudinary} from 'cloudinary';

cloudinary.config({
    cloud_name: 'dyhqdgi7g',
    api_key: '377269557953154',
    api_secret: 'rLh0Q_MnLaBBaC0GXxiVTnkoeLE',
    secure: true,
})

describe('Pruebas en fileUpload', () => { 
    test('Debe de subir el archivo correctamente a cloudinary', async() => {
      const imageUrl = 'https://wallpapers-clan.com/wp-content/uploads/2022/11/cute-frog-pfp-2.jpg';
      const resp = await fetch(imageUrl);
      const blob = await resp.blob();
      const file = new File([blob], 'foto.jpg');

      const {asset_id, secure_url} = await fileUpload(file);
      expect(typeof secure_url).toBe('string');

      await cloudinary.api.delete_resources('journal/'+[asset_id])
      
    })
    
    test('Debe de retornar null', async () => { 
        const file = new File([], 'foto.jpg');
        const url = await fileUpload(file);
        expect(url).toBe(null);
     })
 })