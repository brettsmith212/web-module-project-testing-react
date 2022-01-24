import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Show from "./../Show";

const testShowData = {
  name: "Stranger Things",
  image: "",
  seasons: [
    {
      id: 0,
      name: "Season 1",
      episodes: [],
    },
    {
      id: 1,
      name: "Season 2",
      episodes: [],
    },
  ],
  summary: "A love letter to the '80s classics that captivated a generation...",
};

test("renders without errors", () => {
  render(<Show show={testShowData} selectedSeason={"none"} />);
});

test("renders Loading component when prop show is null", () => {
  render(<Show show={null} selectedSeason={"none"} />);

  const loadingPage = screen.queryByTestId("loading-container");

  expect(loadingPage).toBeInTheDocument();
});

test("renders same number of options seasons are passed in", () => {
  render(<Show show={testShowData} selectedSeason={"none"} />);

  const seasonOptions = screen.queryAllByTestId("season-option");

  expect(seasonOptions.length).toBe(testShowData.seasons.length);
});

test("handleSelect is called when an season is selected", () => {
  const mockHandleSelect = jest.fn();

  render(
    <Show
      show={testShowData}
      selectedSeason={"none"}
      handleSelect={mockHandleSelect}
    />
  );

  userEvent.selectOptions(screen.getByRole("combobox"), "0");

  expect(mockHandleSelect).toHaveBeenCalled();
});

test("component renders when no seasons are selected and when rerenders with a season passed in", () => {
  const { rerender } = render(
    <Show show={testShowData} selectedSeason={"none"} />
  );

  let episodesComponent = screen.queryByTestId("episodes-container");

  expect(episodesComponent).not.toBeInTheDocument();

  rerender(<Show show={testShowData} selectedSeason={"0"} />);

  episodesComponent = screen.queryByTestId("episodes-container");

  expect(episodesComponent).toBeInTheDocument();
});
