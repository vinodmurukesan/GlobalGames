import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

// Mock the AutomationData module
jest.mock("./components/data/automation.json", () => ({
  data: {
    oneClickAutomations: {
      items: [
        {
          id: 1,
          slug: "automation-slug-1",
          sites: [
            { logoSmall2x: "path/to/logo1.png", title: "Automation Site 1" },
          ],
          title: "Automation Title 1",
          shortDescription: "Automation Description 1",
          categories: [{ title: "Automation Category 1" }],
        },
        {
          id: 2,
          slug: "automation-slug-2",
          sites: [
            { logoSmall2x: "path/to/logo2.png", title: "Automation Site 2" },
          ],
          title: "Automation Title 2",
          shortDescription: "Automation Description 2",
          categories: [{ title: "Automation Category 2" }],
        },
        // Add more sample data as needed
      ],
    },
  },
}));

describe("App Component", () => {
  beforeEach(() => {
    // eslint-disable-next-line
    render(<App />);
  });

  test("renders filters and automation content", () => {
    // Check if filters and automation content are rendered
    const filtersElement = screen.getByRole("region", { name: /Filters/i });
    const automationContentElement = screen.getByRole("region", {
      name: /Automation Content/i,
    });
    expect(filtersElement).toBeInTheDocument();
    expect(automationContentElement).toBeInTheDocument();
  });

  test("renders automation cards with correct data", () => {
    // Check if automation cards are rendered with correct data
    const automationCards = screen.getAllByRole("article", {
      name: /Automation Title/i,
    });
    expect(automationCards).toHaveLength(2); // Assuming there are two items in the mocked data
  });

  test("filters automation content based card is displayed", () => {
    // Check if only the filtered automation card is displayed
    expect(screen.getByText("Automation Title 2")).toBeInTheDocument();
    expect(screen.queryByText("Automation Title 3")).not.toBeInTheDocument();
  });
});
