import { fireEvent, render, screen } from "@testing-library/react";
import { AddCategories } from "../../src/components/AddCategories";

describe("Pruebas en <AddCategories/>", () => {
  /*test('Debe fallar si no se proporciona onAddCategory', () => {
        expect(() => render(<AddCategories />)).toThrow("onAddCategory prop is required");
    });*/

  test("Debe de cambiar el valor de la caja de texto", () => {
    render(<AddCategories onAddCategory={() => {}} />);
    const input = screen.getByRole("textbox");

    fireEvent.input(input, { target: { value: "OPM" } });
    //screen.debug();

    expect(input.value).toBe('OPM');
  });

  test('Debe de llamar onAddCategory si el input tiene un valor ', () => {
    
    const inputValue = 'OPM';
    // Function mock

    const onAddCategory = jest.fn();

    render(<AddCategories onAddCategory={onAddCategory} />);

    const input = screen.getByRole('textbox'); //Buscar el input
    const form = screen.getByRole('form');

    fireEvent.input(input, {target: {value: inputValue}});
    fireEvent.submit(form);
    //expect(input.value).toBeFalsy();
    expect(input.value).toBe('');
    expect( onAddCategory).toHaveBeenCalled();
    expect( onAddCategory).toHaveBeenCalledWith(inputValue);
    
  })

  test('No debe de llamar onAddCategory si el input no tiene un valor ', () => {
    
    const inputValue = '';
    // Function mock

    const onAddCategory = jest.fn();

    render(<AddCategories onAddCategory={onAddCategory} />);

    const input = screen.getByRole('textbox'); //Buscar el input
    const form = screen.getByRole('form');

    fireEvent.input(input, {target: {value: inputValue}});
    fireEvent.submit(form);
    expect( onAddCategory).toHaveBeenCalledTimes(0);
    
  })
  
  
});
