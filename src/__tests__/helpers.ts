import { capitalizeFirstLetter, debounce } from "../helpers";

describe("capitalizeFirstLetter", () => {
  it("capitalizes the first letter of a word", () => {
    const originalWord = "hello";
    const capitalizedWord = capitalizeFirstLetter(originalWord);
    expect(capitalizedWord).toEqual("Hello");
  });

  it("returns an empty string for an empty input", () => {
    const emptyWord = "";
    const capitalizedWord = capitalizeFirstLetter(emptyWord);
    expect(capitalizedWord).toEqual("");
  });

  it("keeps the first letter capitalized if already capitalized", () => {
    const alreadyCapitalized = "World";
    const capitalizedWord = capitalizeFirstLetter(alreadyCapitalized);
    expect(capitalizedWord).toEqual("World");
  });

  it("capitalizes the first letter of a sentence", () => {
    const sentence = "this is a test sentence";
    const capitalizedSentence = capitalizeFirstLetter(sentence);
    expect(capitalizedSentence).toEqual("This is a test sentence");
  });
});

describe("debounce", () => {
  jest.useFakeTimers();

  it("delays function execution", () => {
    const mockFn = jest.fn();
    const delayedFn = debounce(mockFn, 100);

    delayedFn();
    expect(mockFn).not.toHaveBeenCalled();

    jest.advanceTimersByTime(99);
    expect(mockFn).not.toHaveBeenCalled();

    jest.advanceTimersByTime(1);
    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  it("executes only once after multiple calls within the delay", () => {
    const mockFn = jest.fn();
    const delayedFn = debounce(mockFn, 100);

    delayedFn();
    delayedFn();
    delayedFn();

    jest.advanceTimersByTime(100);
    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  it("passes arguments correctly", () => {
    const mockFn = jest.fn();
    const delayedFn = debounce(mockFn, 100);

    delayedFn(1, "test");
    jest.advanceTimersByTime(100);

    expect(mockFn).toHaveBeenCalledWith(1, "test");
  });
});
