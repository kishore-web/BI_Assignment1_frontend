import { useState } from "react";
import Events from "./components/Events";
import Header from "./components/Header";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <div className="bg-body-tertiary">
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <Events searchQuery={searchQuery} />
    </div>
  );
}

export default App;
