import { useState } from "react"
import { sectoare } from "../constants/text"

const SectorSelector = ({value, onChange, isHorizontal}) => {
  const [sector, setSector] = useState('')

  const handlePress = (e) => {
    setSector(e)
    onChange(e)
  }
  return (
    <div className="w-full justify-center flex flex-col items-center">
      <p className="mb-2 text-2xl font-secondary mt-20 px-5">Sectoare:</p>
      <div className={`border-4 flex flex-col scrollbar-hide items-center border-primary bg-secondary rounded-xl w-[70%] self-center overflow-x-scroll ${isHorizontal ? 'h-10' :'h-48' }`}>
      {sectoare.map(item => (
        // eslint-disable-next-line react/jsx-key
        <button key={item} onClick={() => handlePress(item)} className={`${sector=== item && 'bg-primary w-full'} p-2`}>{item}</button>
      ))}
      </div>
      
    </div>
  )
}

export default SectorSelector
