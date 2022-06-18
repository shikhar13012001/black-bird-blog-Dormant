import Search from "./@search";
import { useState } from "react";

const SearchFunction = () => {
  const [search, setSearch] = useState("");

  return <Search search={search} setSearch={setSearch} />;
};

export default SearchFunction;
