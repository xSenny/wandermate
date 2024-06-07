import { Option, Select } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { sectoare, types } from "../constants/text";
import { useEffect, useState } from "react";
import { Button } from "@material-tailwind/react";
import { useAuth } from "../lib/AuthContext";
const Header = ({ avatar, searchBusinesses }) => {
  const {user} = useAuth();
  const navigate = useNavigate();
  const navigateToProfile = () => {
    navigate(`/profile/${user.$id}`);
  };

  const [sector, setSector] = useState('');
  const [selectedType, setSelectedType] = useState('')

  return (
    <header className="w-full top-0 left-0 h-auto flex flex-col md:flex-row md:justify-evenly items-center p-4">
      <div className="flex items-center space-x-4 w-full">
        <button onClick={navigateToProfile}>
          <img className="rounded-full h-12" src={avatar} alt="Profile" />
        </button>
        <div className="flex flex-row gap-3">
          <strong>RO</strong>
          <p>ENG</p>
          <p>RU</p>
        </div>
      </div>
      <div className="w-72 mt-4 md:mt-0 md:mr-10">
        <Select size="lg" label="Selecteaza-ti o regiune" onChange={(val) => setSector(val)} value={sector}>
          {sectoare.map((item) => (
            <Option key={item} value={item}>
              {item}
            </Option>
          ))}
        </Select>
      </div>
      <div className="w-72 mt-4 md:mt-0 md:mr-10">
        <Select size="lg" label="Selecteaza-ti un tip" onChange={(val) => setSelectedType(val)} value={selectedType}>
          {types.map((item) => (
            <Option key={item} value={item}>
              {item}
            </Option>
          ))}
        </Select>
      </div>
      <Button className="w-72 mt-4 md:mt-0 md:mr-10" onClick={() => searchBusinesses(sector, selectedType)} variant="gradient">Cauta</Button>
    </header>
  );
};

export default Header;
