import React, { useState, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";

import { useSelector, useDispatch } from 'react-redux';
import {
  cleanUser, 
  setUserInfo
} from '../stores/slice/user';

// register reducer function
import { loginReducer } from './login-reducer.js';


const LoginComponent = ({ currentUser, setCurrentUser }) => {
  const dispatchA = useDispatch();
  const nagivate = useNavigate();
  // let { currentUser, setCurrentUser } = props;
  let [successMessage, setScMessage] = useState("");
  let loginSuccessMessage = "Login successfully, you are now redirected to the profile page."
  let [message, setMessage] = useState("");

  //useState function
  // const handleEmail = (e) => {
  //   setEmail(e.target.value);
  // };
  // const handlePassword = (e) => {
  //   setPassword(e.target.value);
  // };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const changeValue = { name, value };
    dispatch({ type: 'CHANGE_ITEM', changeValue: changeValue });
  };

  // useReducer initState
  const initState = {
    email: null,
    password:null
  }
  const [state, dispatch] = useReducer(loginReducer, initState)

  const handleLogin = async () => {
    try {
      let response = await AuthService.login(state.email, state.password);
      localStorage.setItem("user", JSON.stringify(response.data));
      window.alert("登入成功。您現在將被重新導向到個人資料頁面。");
      setCurrentUser(AuthService.getCurrentUser());
      let data = AuthService.getCurrentUser()
      console.log ('1',data)
      dispatchA(setUserInfo(data))
      nagivate("/profile");
    } catch (e) {
      setMessage(e.response.data);
    }
  };

  return (
    <div style={{ padding: "3rem" }} className="col-md-12">
      <div>
        {message && <div className="alert alert-danger">{message}</div>}
        <div className="form-group">
          <label htmlFor="username">電子信箱：</label>
          <input
            onChange={handleChange}
            type="text"
            className="form-control"
            name="email"
          />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="password">密碼：</label>
          <input
            onChange={handleChange}
            type="password"
            className="form-control"
            name="password"
          />
        </div>
        <br />
        <div className="form-group">
          <button onClick={handleLogin} className="btn btn-primary btn-block">
            <span>登入系統</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
