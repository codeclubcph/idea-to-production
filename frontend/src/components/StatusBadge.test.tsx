/**
 * Checkpoint 6 – StatusBadge tests
 */

import { render, screen } from "@testing-library/react";
import StatusBadge from "./StatusBadge";

describe("StatusBadge", () => {
  it("renders 'To Do' for TODO status", () => {
    render(<StatusBadge status="TODO" />);
    expect(screen.getByTestId("status-badge")).toHaveTextContent("To Do");
  });

  it("renders 'In Progress' for IN_PROGRESS status", () => {
    render(<StatusBadge status="IN_PROGRESS" />);
    expect(screen.getByTestId("status-badge")).toHaveTextContent("In Progress");
  });

  it("renders 'Done' for DONE status", () => {
    render(<StatusBadge status="DONE" />);
    expect(screen.getByTestId("status-badge")).toHaveTextContent("Done");
  });

  it("applies a yellow background for IN_PROGRESS", () => {
    render(<StatusBadge status="IN_PROGRESS" />);
    const badge = screen.getByTestId("status-badge");
    expect(badge).toHaveStyle({ background: "#fff3cd" });
  });

  it("applies a green background for DONE", () => {
    render(<StatusBadge status="DONE" />);
    const badge = screen.getByTestId("status-badge");
    expect(badge).toHaveStyle({ background: "#d4edda" });
  });
});
