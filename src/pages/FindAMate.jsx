import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from "dayjs";
import { useState } from "react"
import AgeSelector from "../components/AgeSelector";
import GenderSelector from "../components/GenderSelector";
import CharacteristicsSelector from "../components/CharacteristicsSelector";
import HobbiesSelector from "../components/HobbiesSelector";
import SectorSelector from "../components/SectorSelector";
import { Button } from "@material-tailwind/react";
import { useAuth } from "../lib/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { findAMate, sendInvitation } from "../lib/appwrite";
import Loader from "../components/Loader";

const FindAMate = () => {

  const [matches, setMatches] = useState([])
  const [selectedMatches, setSelectedMatches] = useState([])
  const [value, setValue] = useState(dayjs());
  const [isLoading, setIsLoading] = useState(false);
  const {id} = useParams();


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
    setIsLoading(true)
    try {
      const mates = await findAMate(form)
      setMatches(mates);
      console.log(value.$d)
    } catch (e) {
      alert(e.message)
    } finally {
      setIsLoading(false);
    }
  }

  const handleSelectMatch = (item) => {
    if (selectedMatches.includes(item.$id)){
      setSelectedMatches(selectedMatches.filter((i) => i !== item.$id))
      console.log('added')
    } else {
      setSelectedMatches(selected => [...selected, item.$id])
      console.log('removed')
    }
  }

  const handleInvite = () => {
    try {
      setIsLoading(true)
      selectedMatches.forEach(async match => await sendInvitation(user.$id, user.name, match, id, value.format("DD-MM-YYYY HH:mm")))
      navigate(`/business/${id}`)
    } catch(e) {
      alert(e)
    } finally {
      setIsLoading(false)
    }
  }
  
  
  return (
    <div className="p-10">
      {matches.length === 0 ? (
        <>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div className="w-full justify-center flex">
          <DateTimePicker 
            label="Data si ora"
            value={value}
            onChange={(val) => setValue(val)}
          />
        </div>
      </LocalizationProvider>
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
        <div className="flex justify-center w-full mt-20">
          <Button onClick={handleFormSubmit} className={'self-center'} variant="outlined" color="green">Cauta-ti un coleg!</Button>
        </div>
      </div>
      <Loader isLoading={isLoading}/>
        </>
      ) : <>
        <p className="my-20 text-center text-xl">Data aleasa de catre tine: {value.format("DD-MM-YYYY HH:mm")}</p>
        {matches.map(item => (
          <div key={item.$id} onClick={() => handleSelectMatch(item)} className={`flex cursor-pointer flex-row items-center w-[full] h-[100px] md:h-[200px] rounded-xl bg-gray-300 ${selectedMatches.includes(item.$id) && 'border-4 border-primary'}`}>
            <div className="h-full w-[30%] md:w-[70%] flex justify-center items-center">
              <img src={item.avatar} className="w-[100%] sm-w-[60%] md:w-[50%] lg:w-[30%] xl:w-[20%] rounded-full" />
            </div>
            <div className="h-full w-full flex justify-center items-center px-4">
              <p className="font-secondary text-2xl">{item.username}</p>
            </div>
          </div>
        ))}
        <div className="my-20 w-full flex justify-center ">
          <Button onClick={handleInvite} disabled={selectedMatches.length === 0}>Invita-i</Button>
        </div>
      </>}
    </div>
  )
}

export default FindAMate
