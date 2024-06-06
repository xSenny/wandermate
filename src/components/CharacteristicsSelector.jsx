import { useState } from "react"
import { caracteristici } from "../constants/text"

const CharacteristicsSelector = ({value, onChange, isHorizontal}) => {
  const [caract, setCaract] = useState(value)
  const handlePress = (e) => {
    if (caract.includes(e)) {
      onChange(caract.filter((item) => item !== e))
      setCaract(caract.filter((item) => item !== e))
    } else {
      onChange([...caract, e])
      setCaract(carac => [...carac, e])
    }
  }
  return (
    <div className="w-full justify-center flex flex-col items-center">
      <p className="mb-2 text-2xl font-secondary mt-20 px-5">Calitati:</p>
      <div className={`border-4 flex flex-col scrollbar-hide items-center border-primary bg-secondary rounded-xl w-[70%] self-center overflow-x-scroll ${isHorizontal ? 'h-10' :'h-48' }`}>
      {caracteristici.map(item => (
        // eslint-disable-next-line react/jsx-key
        <button key={item} onClick={() => handlePress(item)} className={`${caract.includes(item) && 'bg-primary w-full'} p-2`}>{item}</button>
      ))}
      </div>
      
    </div>
  )
}

export default CharacteristicsSelector
