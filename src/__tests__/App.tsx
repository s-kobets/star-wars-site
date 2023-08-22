import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import App from "../App";
import { act } from "react-dom/test-utils";
import { People } from "components";
import { Person } from "pages";

describe("App routing", () => {
  beforeAll(() => {
    jest.spyOn(global, "fetch").mockResolvedValue({
      json: jest.fn().mockResolvedValue({}),
    });
  });

  afterAll(() => {
    // Restore the original fetch function
    global.fetch.mockRestore();
  });

  xtest("renders Person component for the person route", () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={["/person/1"]}>
        <Routes>
          <Route path="/" element={<Person />} />
        </Routes>
      </MemoryRouter>
    );

    const personElement = getByText(/Person/i);
    expect(personElement).toBeInTheDocument();
  });

  xtest("renders NoMatch component for an unknown route", () => {
    const { getByText, debug } = render(
      <MemoryRouter initialEntries={["/unknown"]}>
        <Routes>
          <Route path="/" element={<App />} />
        </Routes>
      </MemoryRouter>
    );

    const noMatchElement = getByText(/nothing/i);
    expect(noMatchElement).toBeInTheDocument();
  });
});
