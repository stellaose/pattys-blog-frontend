/**
 * Unit tests for the shared Pagination component (antd's simple pager).
 */
import React from "react";
import { render, screen } from "@testing-library/react";
import { Pagination } from "#components/general";
import { userEvent } from "#test/utils/user";

describe("Pagination", () => {
  it("renders nothing when everything fits on one page", () => {
    const { container } = render(
      <Pagination current={1} total={8} pageSize={10} onChange={jest.fn()} />,
    );

    expect(container).toBeEmptyDOMElement();
  });

  it("shows the simple pager with the current page and page count", () => {
    const { container } = render(
      <Pagination current={2} total={35} pageSize={10} onChange={jest.fn()} />,
    );

    // Simple mode shows an editable current page and the total page count
    expect(container.querySelector(".ant-pagination-simple")).not.toBeNull();
    expect(screen.getByRole("textbox")).toHaveValue("2");
    expect(screen.getByText("4")).toBeInTheDocument();
  });

  it("calls onChange with the next page", async () => {
    const onChange = jest.fn();
    render(
      <Pagination current={1} total={35} pageSize={10} onChange={onChange} />,
    );

    await userEvent.click(screen.getByTitle("Next Page"));

    // antd passes the new page and the page size
    expect(onChange).toHaveBeenCalledWith(2, 10);
  });
});
