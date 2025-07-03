import React from "react";
import { screen, render } from "@testing-library/react";
import useFetch from "../../hooks/useFetch2";
import MultipleCustomHooks from "../../03-example/MultipleCustomHooks";

jest.mock("../../hooks/useFetch");
describe("Tests for <MultipleCustomHooks/>", () => {
  test("Should render error in screen", () => {
    //Mock antes del render
    useFetch.mockReturnValue({
      data: null,
      isLoading: true,
      hasError: null,
      error: {
        code: "403",
        message: "Forbidden",
      },
    });
    render(<MultipleCustomHooks />);

    expect(screen.getByText("403:Forbidden")).toBeInTheDocument();

    screen.debug();
  });
});
