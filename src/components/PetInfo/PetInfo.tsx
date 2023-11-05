import {useState} from "react";
import {Pet} from 'types';

import './pet-info.css'

export const PetInfo = () => {
    const [petsData,setPetsData] = useState([
        {
            id: "123",
            name: 'bartuś',
            species: 'rabbit',
            birthday: '09-10-2020',
            ownerID: "501a20c9-6f10-11ee-89c0-18c04dda4d85",
        },
        {
            id: "124",
            name: 'Kasia',
            species: 'dog',
            race:"mops",
            birthday: '05-10-2021',
            ownerID: "501a20c9-6f10-11ee-89c0-18c04dda4d85",
        },])

    const [selectedPetData, setSelectedPetData] = useState<Pet | null>(petsData ? petsData[0]:null);

    if(petsData === null) return null;

    const changeHandler = (e: any) => {
        setSelectedPetData(petsData.filter(pet=>pet.id===e.target.value)[0]);
    }

    const petsOption = <select onChange={(e) => changeHandler(e)}>
        {petsData.map(pet => (
            <option value={pet.id}>{pet.name}</option>
        ))}
    </select>

    const pet = selectedPetData ?
        <div className='pet-data'>
        <h2>Name: {selectedPetData.name}</h2>
        <h2>birthday: {selectedPetData.birthday}</h2>
        <h2>species: {selectedPetData.species}</h2>
        <h2>race: {selectedPetData.race ?? "none"}</h2>
        </div> : null

    return (
        <div className='pet-info'>
            <h1>Your Pet:</h1>
            {petsOption}
            {pet}
        </div>
    )
}