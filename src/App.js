import React from "react";
import { Deck } from "./components/Deck";

function App() {
  return (
    <div className="h-screen max-h-screen flex flex-col md:flex-row">
      <div className="w-full h-full">
        <div className="flex flex-col h-full items-center justify-center p-3 relative overflow-hidden">
          <Deck />
        </div>
      </div>
    </div>
  );
}

export default App;
