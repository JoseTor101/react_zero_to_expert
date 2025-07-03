import { GifGrid } from "../../src/components/GifGrid";
import useFetchGifs from "../../src/hooks/useFetchGifs";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

jest.mock("../../src/hooks/useFetchGifs");

describe("Pruebas en <GifGrid/>", () => {
  const category = "OPM";

  test("debe de mostrar el loading inicialmente ", () => {
    useFetchGifs.mockReturnValue({
      images: [],
      isLoading: true,
    });

    render(<GifGrid category={category} />);
    expect(screen.getByText("Cargando..."));
    expect(screen.getByText(category));
  });

  test("debe de mostrar items cuando se cargan la imágnes usando useFetchGifs ", () => {
    const gifs = [
      {
        id: "ABC",
        title: "GOKU",
        url: "tyes",
      },
      {
        id: "ABCD",
        title: "DDD",
        url: "tyes2",
      },
    ];

    useFetchGifs.mockReturnValue({
      images: gifs,
      isLoading: false,
    });

    render(<GifGrid category={category} />);
    expect(screen.getAllByRole("img").length).toBe(2);
    screen.debug();
  });
});
