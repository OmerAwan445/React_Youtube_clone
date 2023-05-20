import React from "react";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Search from "./pages/Search";
import Home from "./pages/Home";
import Watch from "./pages/Watch";
const App = () => {
/*  Apply a feature that when a  user enters in the home page load the dummy data as youtube does
    and when data is fetched (Hint: promise is resolved) then replace the dummmy data with the data
 */
 return (
  <BrowserRouter>
  <Routes>
  <Route path="/search" element={<Search />}/>
  <Route path="/watch/:id" element={<Watch />}/>
  <Route path="/" element={<Home/>}/>
  </Routes>
  </BrowserRouter>
 )
}

export default App;