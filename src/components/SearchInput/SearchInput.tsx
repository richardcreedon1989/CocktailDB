import type { Dispatch, SetStateAction } from "react";
import "./SearchInput.scss";

const className = "c-SearchInput";

type SearchInputProps = {
  value: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
  onSearch: () => void;
};

const SearchInput = ({ value, setSearchTerm, onSearch }: SearchInputProps) => {
  const isSearchDisabled = value.trim().length === 0;

  return (
    <form
      className={className}
      onSubmit={(event) => {
        event.preventDefault();
        onSearch();
      }}
    >
      <input
        className={`${className}__input`}
        type="text"
        placeholder="Search for cocktails..."
        value={value}
        onChange={(event) => setSearchTerm(event.target.value)}
      />
      <button
        className={`${className}__button`}
        type="submit"
        disabled={isSearchDisabled}
      >
        Search
      </button>
    </form>
  );
};

export default SearchInput;
