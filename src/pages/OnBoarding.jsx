import { useState } from "react"
import AgeSelector from "../components/AgeSelector"
import GenderSelector from "../components/GenderSelector"
import CharacteristicsSelector from "../components/CharacteristicsSelector"
import HobbiesSelector from "../components/HobbiesSelector"
import SectorSelector from "../components/SectorSelector"
import Button from "../components/Button"
import { useAuth } from "../lib/AuthContext"
import { updateUser } from "../lib/appwrite"
import { useNavigate } from "react-router-dom"

const OnBoarding = () => {

  const {user} = useAuth();
  const navigate = useNavigate();
  
  const [form, setForm] = useState({
    age: 17,
    gender: '',
    characteristics: [],
    hobbies: [],
    region: '',
  })

  const handleAgeChange = (e) => {
    setForm({...form, age: e})
  }

  const handleGenderChange = (e) => {
    setForm({...form, gender: e})
  }

  const handleCharactersChange = (e) => {
    setForm({...form, characteristics: e})
  }

  const handleHobbiesChange = (e) => {
    setForm(f => ({...f, hobbies: e}))
  }

  const handleSectorChange = (e) => {
    setForm(f => ({...f, region: e}))
  }

  const handleFormSubmit = async () => {
    const {age, gender, characteristics, hobbies, region} = form;
    if (gender === '' || characteristics.length === 0 || hobbies.length === 0 || region === '') {
      alert('Nu ai completat formularul')
      return;
    }

    console.log(user)
    const userData = {
      age,
      gender,
      region,
      characteristics,
      hobbies,
      accountId: user.$id
    }

    try {
      await updateUser(userData).then(() => navigate('/home'))
    } catch(e) {
      alert(e)
    }

  }

  return (
    <div className="flex justify-center flex-col items-center min-h-[100vh] w-full px-5">
      <h1 className="font-primary text-4xl mt-10">Înregistrează-te</h1>
      <p className="font-descrieri text-2xl">Creaza-ti un cont si seteaza-ti preferintele</p>
      <div className="w-full">
        <div className="flex flex-row justify-evenly w-full">
          <AgeSelector value={form.age} onChange={handleAgeChange}/>
          <GenderSelector value={form.gender} onChange={handleGenderChange}/>
        </div>
        <div className="w-full flex flex-col lg:flex-row">
          <CharacteristicsSelector value={form.characteristics} onChange={handleCharactersChange} isHorizontal={false}/>
          <HobbiesSelector value={form.hobbies} onChange={handleHobbiesChange} isHorizontal={false}/>
          <SectorSelector value={form.sector} onChange={handleSectorChange} isHorizontal={false}/>
        </div>
        <Button text={'Finiseaza'} onClick={handleFormSubmit} className={'my-5 w-[70%]'}/>
      </div>
    </div>
  )
}

export default OnBoarding
