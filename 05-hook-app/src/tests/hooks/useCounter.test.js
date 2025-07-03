import { renderHook, act } from "@testing-library/react";
import { useState } from "react";
import { useCounter } from "../../hooks/useCounter";

describe("Pruebas sobre useCounter", () => {
  test("Debe retornar los valores por defecto", () => {
    const { result } = renderHook(() => useCounter());
    const { counter, decrement, increment, reset } = result.current;

    expect(counter).toBe(10);

    expect(decrement).toEqual(expect.any(Function));
    expect(increment).toEqual(expect.any(Function));
    expect(reset).toEqual(expect.any(Function));
  });

  test("debe general el counter con el valor de 100", () => {
    const { result } = renderHook(() => useCounter(100));
    const { counter, decrement, increment, reset } = result.current;

    expect(counter).toBe(100);
  });

  test("el decrement debe restar bien", () => {
    const { result } = renderHook(() => useCounter(100));
    const { decrement } = result.current;
    act(() => {
      decrement(1);
      decrement(2);
    });
    expect(result.current.counter).toBe(97);
  });

  test("el decrement debe sumar bien", () => {
    const { result } = renderHook(() => useCounter(100));
    const { increment } = result.current;
    act(() => {
      increment(1);
      increment(2);
    });
    expect(result.current.counter).toBe(103);
  });

  test("reset", () => {
    const { result } = renderHook(() => useCounter(100));
    const { reset } = result.current;
    act(() => {
      reset()
    });
    console.log(result)
    expect(result.current.counter).toBe(0);
  });
});
