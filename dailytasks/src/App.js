import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { store } from "./Store/store";
import SignIn from "./Components/Authentication/Signin";
import SignUp from "./Components/Authentication/Signup";
import Header from "./Components/Header/Header";

const App = () => {
  return (
    <Provider store={store}>     
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignIn />}></Route>
          <Route path="/register" element={<SignUp />}></Route>
          <Route path="/homepage" element={ <Header />}></Route>
        </Routes>
      </BrowserRouter>

     
    </Provider>
  );
};

export default App;
