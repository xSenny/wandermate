import { useState } from "react"
import { activeHobbies, passiveHobbies } from "../constants/text"

const HobbiesSelector = ({value, onChange}) => {
  const [hobbies, setHobbies] = useState(value)
  const handlePress = (e) => {
    if (hobbies.includes(e)) {
      onChange(hobbies.filter((item) => item !== e))
      setHobbies(hobbies.filter((item) => item !== e))
    } else {
      onChange([...hobbies, e])
      setHobbies(hobbies => [...hobbies, e])
    }
  }
  return (
    <div className="w-full justify-center flex flex-col items-center">
      <p className="mb-2 text-2xl font-secondary mt-20 px-5">Hobbies:</p>
      <div className={`border-4 flex flex-col scrollbar-hide h-48 items-center border-primary bg-secondary rounded-xl w-[70%] self-center overflow-x-scroll`}>
      {activeHobbies.map(item => (
        // eslint-disable-next-line react/jsx-key
        <button key={item} onClick={() => handlePress(item)} className={`${hobbies.includes(item) && 'bg-primary w-full'} p-2`}>{item}</button>
      ))}
      {passiveHobbies.map(item => (
        // eslint-disable-next-line react/jsx-key
        <button key={item} onClick={() => handlePress(item)} className={`${hobbies.includes(item) && 'bg-primary w-full'} p-2`}>{item}</button>
      ))}
      </div>
      
    </div>
  )
}

export default HobbiesSelector;
