import { act, renderHook } from "@testing-library/react"
import useForm from "../../hooks/useForm"

describe('Puebas en useForm', () => {

    const initialForm = {
        name: 'JT',
        email: 'jt@gmail.com'
    }

  test('debe regresar los valores por defecto', () => {
    const {result} = renderHook(() => useForm(initialForm));
    
    expect(result.current).toEqual({
        name: initialForm.name,
        email: initialForm.email,
        formState: initialForm,
        onInputChange: expect.any( Function ),
        onResetForm: expect.any( Function ),
    })
})

test('debe cambiar el nombre del formulario', () => {
    const newName ='Jose';
    const {result} = renderHook(() => useForm(initialForm));
    const { onInputChange } = result.current;

    act(()=> {
        onInputChange({target: {name: 'name', value: newName}});
    })

    expect(result.current.name).toBe(newName);
    expect(result.current.formState.name).toBe(newName);
  })
  
})
