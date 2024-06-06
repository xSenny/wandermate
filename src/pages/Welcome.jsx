import { useEffect } from "react"
import { useAuth } from "../lib/AuthContext"
import { useNavigate } from "react-router-dom"
import logo from '../assets/images/icon.png'
import Button from "../components/Button"

const Welcome = () => {

  const {user} = useAuth()
  const navigate  = useNavigate()

  useEffect(() => {
    if (user) {
      navigate('/home')
    }
  }, [])

  return (
    <div className="h-[100vh] w-full flex justify-center items-center flex-col gap-20">
      <h1 className="text-5xl md:text-8xl font-primary font-bold text-primary">Wandermate</h1>
      <img src={logo} alt="" className="h-[150px] md:h-[200px]"/>

      <div className="w-full flex justify-center items-center flex-col">
        <Button text={'Inregistreaza-te'} className={'w-[80%]'} onClick={() => navigate('/register')}/>
        <Button text={'Conecteaza-te'} className={'w-[80%]'} onClick={() => navigate('login')}/>
      </div>
    </div>
  )
}

export default Welcome
