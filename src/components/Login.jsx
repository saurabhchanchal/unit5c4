import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { checkAuth } from "../Redux/Auth/action";

export const Login = () => {
  const [user, setUser] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((store) => store.auth);

  const userLogin = () => {
    getData();
  };

  const handledata = (el) => {
    const { name, value } = el.target;
    setUser({ ...user, [name]: value });
  };


  const usercheck = () => {
    if (auth.user.role === "admin") {
      navigate("/orders");
    } else if (auth.user.role === "client") {
      navigate("/neworder");
    } else {
      alert("Please check once");
    }
  };

  const getData = () => {
    axios.get("http://localhost:8080/users").then((data) => {
      const check = data.data.find(
        (el) => el.username === user.username && el.pass === user.password
      );
      if ( check === "undefined") {
        console.log("please fill once");
      } else {
        dispatch(
          checkAuth({
            auth: true,
            user: check,
          })
        );
        usercheck();
      }
    });
  };
  return (
    <div>
      <input
        className="username"
        type="text"
        name="username"
        placeholder="Enter Username"
        onChange={handledata}
      />
      <input
        className="password"
        type="password"
        name="password"
        placeholder="Enter password"
        onChange={handledata}
      />
      {/* On this button click make network req to find user with same username and password */}
      {/* get his role, if role is `admin` take him to `/orders` page otherwise take him to `/neworder` */}
      <button className="submit" onClick={userLogin}>
        Login
      </button>
    </div>
  );
};