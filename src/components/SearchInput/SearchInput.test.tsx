import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import SearchInput from "./SearchInput";

describe("SearchInput", () => {
  it("disables the search button when the input is empty", () => {
    render(<SearchInput initialValue="" onSearch={vi.fn()} />);

    expect(screen.getByRole("button", { name: "Search" })).toBeDisabled();
  });

  it("enables search and submits the typed value", async () => {
    const user = userEvent.setup();
    const onSearch = vi.fn();

    render(<SearchInput initialValue="" onSearch={onSearch} />);

    await user.type(
      screen.getByPlaceholderText("Search for cocktails..."),
      "margarita",
    );
    await user.click(screen.getByRole("button", { name: "Search" }));

    expect(onSearch).toHaveBeenCalledWith("margarita");
  });
});
