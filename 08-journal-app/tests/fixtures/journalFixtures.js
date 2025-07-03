export const initialState = {
  isSaving: false,
  messageSaved: '',
  notes: [],
  active: null,
};
 
export const newNote = {
  id: 'ABC123',
  title: '',
  body: '',
  date: new Date().getTime(),
  imageUrls: [],
};
 
export const arrayNotes = [
  {
    id: '1',
    title: 'Nota 1',
    body: 'Desc',
    date: new Date().getTime(),
    imageUrls: [],
  },
  {
    id: '2',
    title: 'Nota 1',
    body: 'Desc',
    date: new Date().getTime(),
    imageUrls: [],
  },
  {
    id: '3',
    title: 'Nota 1',
    body: 'Desc',
    date: new Date().getTime(),
    imageUrls: [],
  },
];
 
export const payloadUpdateNote = {
  id: '1',
  title: 'Titulo nota',
  body: 'Descripción nota',
  date: new Date().getTime(),
  imageUrls: [],
};
 
export const arrayImageUrl = ['http://demo1.jpg', 'http://demo2.jpg', 'http://demo3.jpg'];