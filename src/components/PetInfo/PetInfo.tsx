import {useEffect, useState} from "react";
import {Pet} from 'types';
import {Fetch} from "../../utils/Fetch";

import './pet-info.css'


export const PetInfo = () => {
    const [petsData,setPetsData] = useState<Pet[]|null>(null)
    const [selectedPetData, setSelectedPetData] = useState<Pet | null>(petsData ? petsData[0]:null);

    useEffect(()=>{
        (async()=>{
            const res = await Fetch('pet/getAll');
            const data = await res.json();
            setPetsData(data);
            setSelectedPetData(data[0]);
        })()
    },[])

    if(petsData === null) return <h1>Loading ...</h1>;

    const changeHandler = (e: any) => {
        setSelectedPetData(petsData.filter(pet=>pet.id===e.target.value)[0]);
    }

    const petsOption = <select onChange={(e) => changeHandler(e)}>
        {petsData.map(pet => (
            <option key={pet.id} value={pet.id}>{pet.name}</option>
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