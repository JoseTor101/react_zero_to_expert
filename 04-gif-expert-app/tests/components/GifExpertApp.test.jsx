import { fireEvent, render, screen } from "@testing-library/react"
import {GifExpertApp} from "../../src/components/GifExpertApp";

describe('Prueba en <GifExpertApp/>', () => {
  //
  test('should add a new category when onAddCategory is called', () => {
    render(<GifExpertApp/>);

    //Simulate input
    const input = screen.getByRole('textbox');
    fireEvent.change(input, {target: {value: 'OPM'}});

    //Simulate submit

    fireEvent.submit(input.form);
    screen.getByText('OPM');
    
  })

  test('should not add duplicate categories', () => {
    render(<GifExpertApp/>);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, {target: {value: 'OPM'}});
    fireEvent.submit(input.form);
    fireEvent.submit(input.form);
    fireEvent.change(input, {target: {value: 'OPM1'}});
    fireEvent.submit(input.form);

    expect(screen.getAllByText('OPM').length).toBe(1);
    screen.debug();
  })
  
  
})
