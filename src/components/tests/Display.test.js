import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Display from "./../Display";
import Show from "../Show";

import fetchShow from "../../api/fetchShow";

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

test("renders without errors with no props", () => {
  render(<Display />);
});

test("renders Show component when the button is clicked ", async () => {
  render(<Display />);

  const showButton = screen.getByRole("button");
  userEvent.click(showButton);

  const showContainer = await screen.findByTestId("show-container");

  expect(showContainer).toBeInTheDocument();
});

test("renders show season options matching your data when the button is clicked", async () => {
  render(<Display />);
  render(<Show show={testShowData} selectedSeason={"none"} />);

  const showButton = screen.getByRole("button");
  userEvent.click(showButton);

  const seasonOptions = await screen.findAllByTestId("season-option");
  expect(seasonOptions.length).toBe(testShowData.seasons.length);
});
