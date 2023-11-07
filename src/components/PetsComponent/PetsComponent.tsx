import {useEffect, useState} from "react";
import {PetAddForm} from "../PetAddFrom/PetAddForm";
import {Pet} from 'types';
import {Fetch} from "../../utils/Fetch";
import {PetInfo} from "../PetInfo/PetInfo";
import {v4 as uuid} from "uuid"

import './pets-component.css'


export const PetsComponent = () => {
    const [petsData,setPetsData] = useState<Pet[]|null>(null)
    const [selectedPetData, setSelectedPetData] = useState<Pet | null>(petsData ? petsData[0]:null);
    const [loading, setLoading] = useState(false);

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

    const deleteHandler = async () =>{
        setLoading(true);
        const res = await Fetch('pet/deleteOne',"DELETE",JSON.stringify({id:(selectedPetData as Pet).id}))
        setLoading(false);
        setPetsData((prevState):Pet[] => {
            const newArr = prevState?.filter(e=>e.id !== (selectedPetData as Pet).id) as Pet[];

            return newArr;
        });
        setSelectedPetData(petsData[0]);
        console.log(res);
    }

    const editHandler = async (name:string,birthday:string,species:string,race:string|undefined) =>{

        const pet = {id:(selectedPetData as Pet).id,name,birthday,species,race,ownerId:(selectedPetData as Pet).ownerId}
        setSelectedPetData(pet);

        setPetsData(prevState => {
            const newArray = prevState?.filter(e=>e.id !== pet.id) as Pet[];

            return [pet,...newArray];
        })

        setLoading(true);
        const res = await Fetch('pet/updateOne',"PUT",JSON.stringify(pet))
        setLoading(false);
        console.log(res);
    }

    const addHandler = async (name:string,species:string,race:string,birthday:string) =>{
        setLoading(true);
        const petObject = {id:uuid(),name,species,race,birthday}
        const res = await Fetch('pet/addOne','POST',JSON.stringify(petObject));
        console.log(res.status);

        setPetsData((prevState):Pet[] => (
            [{ownerId:"",...petObject},...(prevState as Pet[])]
        ));

        setLoading(false);
    }

    const petsOption = <select onChange={(e) => changeHandler(e)}>
        {petsData.map(pet => (
            <option key={pet.id} value={pet.id}>{pet.name}</option>
        )
        )}
        <option value="add">➕ Add new pet</option>
    </select>

    const pet = selectedPetData ?
        <PetInfo
            name={selectedPetData.name}
            birthday={selectedPetData.birthday}
            species={selectedPetData.species}
            race={selectedPetData.race}
            editHandler={editHandler}
            deleteHandler={deleteHandler}
        /> : null

    return (
        <div className='pet-info'>
            <h1>Your Pets:</h1>
            {loading?<p>loading...</p>:null}

            {petsOption}
            {selectedPetData ? pet : <PetAddForm addHandler={addHandler}/>}
        </div>
    )
}