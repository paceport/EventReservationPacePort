import React from "react";
import { SearchContainer, SearchInput } from "./Searchbar";
import { Searchicon } from "../Icons";

export default function SearchBar({ setSearch, value }) {
  return (
    <SearchContainer>
      <Searchicon style={{ color: "#4E84C4" }} />
      <SearchInput
        value={value}
        type="text"
        onChange={(event) => {
          setSearch(event.target.value);
        }}
      />
    </SearchContainer>
  );
}


