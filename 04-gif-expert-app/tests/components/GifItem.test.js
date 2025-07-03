import { render, screen } from "@testing-library/react";
import GifItem from "../../src/components/GifItem";

describe('Pruebas en <GitItem/>', () => {
    const title = "OPM";
    const url = "https://yesasdadsa.com";

    test('debe hacer match con el snapshot', () => {

        const {container} = render(<GifItem title={title} url={url}/>);
        expect(container).toMatchSnapshot();
        
    });

    test('debe mostrar la imagen con el URL y ALT indicados', () => {

        render(<GifItem title={title} url={url}/>);
        //screen.debug();
        //expect(screen.getByRole('img').src).toBe(url + '/');        
        const {src, alt } = screen.getByRole('img');

        expect(src).toBe(url + '/'); 
        expect(alt).toBe(title); 
    });
    
    test('debe mostrar el titulo en el componente', () => {
        render(<GifItem title={title} url={url}/>);
        expect(screen.getByText(title)).toBeTruthy();
    })
    
  
})
