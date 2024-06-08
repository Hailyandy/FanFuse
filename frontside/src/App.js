import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import "./index.css"
import React from "react";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Post from "./pages/Post";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";


function App() {
  return( <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path="/register" element = {<Register/>}/>
        <Route path="/login" element={<Login/>} />
        <Route path="/post/:id" element={<Post/>} />
        <Route path="*" element={<NotFound/>} />
        <Route path="/home" element={<Home/>} />
      </Routes>
    </BrowserRouter>
  
</div>
);}


export default App;
