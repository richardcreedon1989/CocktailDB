import SearchInput from "../components/SearchInput";
import { useState } from "react";
const LandingPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <>
      <SearchInput value={searchTerm} setSearchTerm={setSearchTerm} />
      {searchTerm}
    </>
  );
};

export default LandingPage;
