import {useContext, useEffect, useRef, useState} from "react";
import {PetAddForm} from "../PetAddFrom/PetAddForm";
import {Pet} from 'types';
import {Fetch} from "../../utils/Fetch";
import {PetInfo} from "../PetInfo/PetInfo";
import {v4 as uuid} from "uuid";
import {color, messagesContext} from "../../contexts/messagesContext";

import './pets-component.css';

export const PetsComponent = () => {

    const [petsData,setPetsData] = useState<Pet[]|null>(null)
    const [selectedPetData, setSelectedPetData] = useState<Pet | null>(petsData ? petsData[0]:null);

    const [loading, setLoading] = useState(false);
    const [isEdited, setIsEdited] = useState<string[]>([]);

    const messages = useContext(messagesContext)


    const fetched = useRef(false);
    useEffect(()=>{
        if(!fetched.current) {
            (async () => {
                const res = await Fetch('pet/getAll',"GET");

                if (!res || res.status === 500) {
                    messages?.printMessage(`Something gone wrong, ty again latter 😓`,color.red);
                } else if (res.status === 200) {
                    const data = await res.json();
                    setPetsData(data ? data : []);
                    setSelectedPetData(data ? data[0] : null);
                } else {
                    const data = await res.json();
                    messages?.printMessage(data.message,color.red);
                }
            })()
        }
        return () => {
            fetched.current = true
        }
    },[])

    if(petsData === null) return <h1>Loading ...</h1>;

    const changePetHandler = (e: any) => {
        if(isEdited.length){
            window.alert("Exit edit mode to continue!")
        }else{
            setSelectedPetData(petsData.filter(pet => pet.id === e.target.value)[0]);
        }
    }

    const deleteHandler = async () =>{
        setLoading(true);

        const res = await Fetch('pet/deleteOne',"DELETE",JSON.stringify({id:(selectedPetData as Pet).id}))

        if(!res || res.status === 500) {
            messages?.printMessage(`Something gone wrong, ty again latter 😓`,color.red);
        }else if(res.status===200){
            setPetsData((prevState):Pet[] => {
                const newArr = prevState?.filter(e=>e.id !== (selectedPetData as Pet).id) as Pet[];
                setSelectedPetData(newArr[0]);

                return newArr;
            });

            messages?.printMessage(`Pet ${selectedPetData?.name} deleted property! 🥳`, color.green);
        }else{
            const data = await res.json()
            messages?.printMessage(data.message,color.red)
        }

        setIsEdited([]);
        setLoading(false);
    }

    const editHandler = async (name:string,birthday:string,species:string,race:string|undefined) =>{
        const pet = {id:(selectedPetData as Pet).id,name,birthday,species,race,ownerId:(selectedPetData as Pet).ownerId}

        if(isEdited.length > 1) {
            setLoading(true);

            const res = await Fetch('pet/updateOne', "PUT", JSON.stringify(pet))

            if (!res || res.status === 500) {
                messages?.printMessage(`Something gone wrong, ty again latter 😓`, color.red)
            } else if (res.status === 200) {
                setSelectedPetData(pet);

                setPetsData(prevState => {
                    const newArray = prevState?.filter(e => e.id !== pet.id) as Pet[];
                    return [pet, ...newArray];
                })

                messages?.printMessage(`Pet ${pet.name} edited! 🥳`, color.green)
            } else {
                const data = await res.json()
                messages?.printMessage(`${data.message}`, color.red)
            }

            setIsEdited([]);
            setLoading(false);
        }
    }

    const addHandler = async (name:string,species:string,race:string,birthday:string) =>{

        setLoading(true);

        const petObject = {id:uuid(),name,species,race,birthday}
        const res = await Fetch('pet/addOne','POST',JSON.stringify(petObject));

        if(!res || res.status===500) {
            messages?.printMessage(`Something gone wrong, ty again latter 😓`,color.red)
        }else if(res.status===200){
            setPetsData((prevState):Pet[] => (
                [{ownerId:"",...petObject},...(prevState as Pet[])]
            ));

            messages?.printMessage(`Pet ${petObject.name} added property! 🥳`, color.green)
        }else{
            const data = await res.json()
            messages?.printMessage(`${data.message}`,color.red)
        }

        setLoading(false);
    }

    //Render
    const petsOption =
        <select onChange={(e) => changePetHandler(e)} value={selectedPetData?.id}>
            {petsData?.map(pet => (<option key={pet.id} value={pet.id}>{pet.name}</option>))}
            <option value="add">➕ Add new pet</option>
        </select>

    const pet = selectedPetData ?
        <PetInfo
            name={selectedPetData.name}
            birthday={selectedPetData.birthday}
            species={selectedPetData.species}
            race={selectedPetData.race}
            isEdited={isEdited}
            setIsEdited={setIsEdited}
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