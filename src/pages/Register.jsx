/* eslint-disable no-unused-vars */
import { useEffect, useRef } from "react";
import { ID, account } from "../lib/appwrite";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../lib/AuthContext";

const Register = () => {
  const registerForm = useRef(null)
  const navigate = useNavigate();
  const {registerUser, user} = useAuth()
  useEffect(() => {
    if (user) navigate('/home')
  }, [])

  const handleRegistration = async (e) => {
    e.preventDefault();
    const name = registerForm.current.name.value;
    const email = registerForm.current.email.value;
    const password1 = registerForm.current.password1.value;
    const userInfo = {name, email, password1}
    registerUser(userInfo)
  }

  return (
    <div className="flex justify-center flex-col items-center h-[100vh]">
      <h1 className="font-primary text-4xl mt-10">Înregistrează-te</h1>
      <p className="font-descrieri text-2xl">Creaza-ti un cont si seteaza-ti preferintele</p>
      <form ref={registerForm} onSubmit={handleRegistration} className="justify-evenly w-[70%] flex flex-col h-full">
        <div className="flex flex-col">
          <label className="text-sm ml-4 font-bold">Name:</label>
          <input
            required
            type="text"
            name="name"
            placeholder="Enter name..."
            className="border-solid border-2 border-primary rounded-md p-2 bg-secondary placeholder:text-[#000] text-[#000]"
          />
        </div>
  
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
          <input type="submit" value="Inregistreaza-te" className="w-full border-solid border-2 border-primary rounded-md p-2 bg-secondary  text-[#000]" />
        </div>
      </form>
      <p className="font-descrieri font-bold">Deja ai un cont? <Link to="/login" className="text-primary">Conecteaza-te</Link></p>
      <p className="font-descrieri text-bold mb-4">Prin crearea acestui cont, accepti termenii si conditiile noastre!</p>
      </div>
  );
}

export default Register;