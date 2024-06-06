import { useEffect, useState } from "react";
import man from '../assets/icons/man.png';
import woman from '../assets/icons/woman.png';

const GenderSelector = ({ value, onChange }) => {
  const [gender, setGender] = useState(value);

  const handleClick = (newGender) => {
    setGender(newGender);
    onChange(newGender);
  };

  return (
    <div>
      <p className="mb-2 text-2xl font-secondary">Gen:</p>
      <div className="flex flex-row items-center space-x-5 w-[110px] justify-center h-[55px] rounded-xl">
        <button
          onClick={() => handleClick('M')}
          className={` rounded-xl w-[50px] ${gender === 'M' ? 'bg-secondary' : 'bg-gray-200'}`}
        >
          <img src={man} className="w-[40px] h-[50px] self-center" alt="Man" />
        </button>
        <button
          onClick={() => handleClick('F')}
          className={` rounded-xl w-[50px] ${gender === 'F' ? 'bg-secondary' : 'bg-gray-200'}`}
        >
          <img src={woman} className="w-[40px] h-[50px] self-center" alt="Woman" />
        </button>
      </div>
    </div>
  );
};

export default GenderSelector;
