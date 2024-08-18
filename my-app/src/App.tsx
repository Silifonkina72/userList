import { useEffect, useState } from "react";
import "./App.css";
import { SortUserList } from "./components/SortUserList";
import { FilterUserList } from "./components/FilterUserList";

import { Adaptiv } from "./components/Adaptiv";

function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth > 500);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth > 500);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {isMobile ? <SortUserList /> : <Adaptiv />}
      <FilterUserList />
    </>
  );
}

export default App;
