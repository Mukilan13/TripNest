import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        credentials,
        { withCredentials: true }
      );
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      navigate("/");
    } catch (err) {
      dispatch({
        type: "LOGIN_FAILURE",
        payload: err?.response?.data || "Login failed",
      });
    }
  };

  return (
    <div className="login bg-[#F5385D] h-screen flex items-center justify-center">
      <div className="lContainer flex flex-col gap-[10px] w-[30%]">
        <input
          type="text"
          placeholder="Username"
          id="username"
          value={credentials.username}
          onChange={handleChange}
          className="lInput p-[10px] rounded-[5px] border-none outline-none"
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          value={credentials.password}
          onChange={handleChange}
          className="lInput p-[10px] rounded-[5px] border-none outline-none"
        />
        <button
          disabled={loading}
          onClick={handleClick}
          className={`lButton border-none px-[20px] py-[10px] ${
            loading ? "bg-gray-400" : "bg-[#c1121f]"
          } text-white font-bold cursor-pointer rounded-[5px]`}
        >
          {loading ? "Loading..." : "Login"}
        </button>
        {error && <span>{error.message || error}</span>}
      </div>
    </div>
  );
};

export default Login;
