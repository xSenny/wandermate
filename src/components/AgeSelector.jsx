import { useState } from 'react'
import arrowMinus from '../assets/icons/arrowminus.png'
import arrowPlus from '../assets/icons/arrowplus.png'
const AgeSelector = ({value, onChange}) => {
  const [age, setAge] = useState(value)
  return (
    <div>
      <p className="mb-2 text-2xl font-secondary">Varsta:</p>
      <div className="flex flex-row items-center space-x-2 w-[110px] bg-secondary justify-center h-[55px] rounded-xl">
        <button onClick={() => {onChange(age - 1); setAge(age => age - 1)}}>
          <img src={arrowMinus} alt="" />
        </button>
        <p>{age}</p>
        <button onClick={() => {onChange(age + 1); setAge(age => age + 1)}}>
          <img src={arrowPlus} alt="" />
        </button>
      </div>
    </div>
  )
}

export default AgeSelector
