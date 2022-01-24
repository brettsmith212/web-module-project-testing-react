import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import Episode from "./../Episode";

const testEpisode = {
  id: 1,
  image: "no image available",
  name: "Tv Show Name",
  season: 1,
  number: 1,
  summary: "This is the summary statement",
  runtime: "80 minutes",
};

test("renders without error", () => {
  render(<Episode episode={testEpisode} />);
});

test("renders the summary test passed as prop", () => {
  render(<Episode episode={testEpisode} />);

  const summary = screen.queryByText(/this is the summary statement/i);

  expect(summary).toBeInTheDocument();
  expect(summary).toBeTruthy();
  expect(summary).toHaveTextContent(/this is the summary statement/i);
});

test("renders default image when image is not defined", () => {
  const noImgEpisode = {
    id: 1,
    image: null,
    name: "Tv Show Name",
    season: 1,
    number: 1,
    summary: "This is the summary statement",
    runtime: "80 minutes",
  };

  render(<Episode episode={noImgEpisode} />);

  const imgAlt = screen.getByAltText(/stranger-things.png/i);

  expect(imgAlt).toBeInTheDocument();
});
