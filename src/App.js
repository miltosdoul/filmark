import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage";
import Header from "./components/Header";
import Watchlist from "./components/Watchlist";
import Watched from "./components/Watched";
import Add from "./components/Add";
import { GlobalProvider } from "./context/GlobalState";
import "./scss/App.scss";

const MoviePage = React.lazy(() => import("./components/MoviePage"));

function App() {
  return (
    <GlobalProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Homepage />} />

          <Route path="/watchlist" element={<Watchlist />} />

          <Route path="/watched" element={<Watched />} />

          <Route path="/add" element={<Add />} />

          <Route
            path="/movie/:id"
            element={
              <>
                <Suspense fallback={<div>Loading</div>}>
                  <MoviePage />
                </Suspense>
              </>
            }
          />
        </Routes>
      </Router>
    </GlobalProvider>
  );
}

export default App;
