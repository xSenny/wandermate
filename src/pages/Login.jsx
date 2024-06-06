import { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../lib/AuthContext";

const Login = () => {

  const loginForm = useRef(null);
  const {user, loginUser} = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (user) navigate('/home')
  }, [])

  const handleLogin = (e) => {
    e.preventDefault()
    const email = loginForm.current.email.value
    const password = loginForm.current.password1.value
    
    const userInfo = {email, password}

    loginUser(userInfo)
  }

  return (
    <div className="flex justify-center flex-col items-center h-[100vh]">
      <h1 className="font-primary text-4xl mt-10">Bine ai revenit!</h1>
      <p className="font-descrieri text-2xl">Conecteaza-te cu contul tau!</p>
      <form ref={loginForm} onSubmit={handleLogin} className="justify-evenly w-[70%] flex flex-col h-full">
        <div className="flex flex-col">
          <label className="text-sm ml-4 font-bold">Email:</label>
          <input
            required
            type="email"
            name="email"
            placeholder="Enter email..."
            className="border-solid border-2 border-primary rounded-md p-2 bg-secondary placeholder:text-[#000] text-[#000]"
          />
        </div>
  
        <div className="flex flex-col">
          <label className="text-sm ml-4 font-bold">Password:</label>
          <input
            required
            type="password"
            name="password1"
            placeholder="Enter your password..."
            className="border-solid border-2 border-primary rounded-md p-2 bg-secondary placeholder:text-[#000] text-[#000]"
          />
        </div>
  
        <div className="">
          <input type="submit" value="Conecteaza-te" className="w-full border-solid border-2 border-primary rounded-md p-2 bg-secondary  text-[#000]" />
        </div>
      </form>
      <p className="font-descrieri font-bold mb-3">Nu ai un cont? <Link to="/register" className="text-primary">Creaza-ti unul!</Link></p>
      </div>
  );
}

export default Login
