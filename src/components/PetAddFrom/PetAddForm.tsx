import {Form} from "../../utils/Form";
import {FormEvent, useState} from "react";

type Props = {
    addHandler: (name:string,species:string,race:string,birthday:string) => void
}

export const PetAddForm = ({addHandler}:Props) =>{

    const [name, setName] = useState('');
    const [species, setSpecies] = useState('');
    const [race, setRace] = useState('');
    const [birthday, setBirthday] = useState('');

    const submitHandler = async (e:FormEvent) => {
        e.preventDefault();
        addHandler(name,species,race,birthday)
        setName('');
        setSpecies('');
        setRace('');
        setBirthday('');
    }
    
    return(
        <>
            <Form
                onSubmitFn={submitHandler}
                array={[
                    {name:'Name *',type:'text',value:name,changer:setName,required:true},
                    {name:'Species *',type:'text',value:species,changer:setSpecies,required:true},
                    {name:'Race',type:'text',value:race,changer:setRace},
                    {name:'Birthday *',type:'date',value:birthday,changer:setBirthday,required:true},
                ]}
                button={'Add'}
            />
        </>
    )
}