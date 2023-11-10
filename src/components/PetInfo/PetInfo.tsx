import React, {useState} from "react";
import {EditInput} from "../EditInput/EditInput";

type Props = {
    name:string;
    birthday:string;
    species:string;
    race?:string;
    isEdited:string[];
    setIsEdited:React.Dispatch<React.SetStateAction<string[]>>;
    editHandler:(name:string,birthday:string,species:string,race:string|undefined)=>{};
    deleteHandler:()=>{};
}

export const PetInfo = (props:Props) =>{
    const {name,birthday,species,race,isEdited,setIsEdited,editHandler,deleteHandler} = props

    const [newName, setNewName] = useState<string>(name);
    const [newBirthday, setNewBirthday] = useState<string>(birthday);
    const [newSpecies, setNewSpecies] = useState<string>(species);
    const [newRace, setNewRace] = useState<string|undefined>(race??undefined);

    const[editMode,setEditMode] = useState(false);


    const modeHandler = () =>{
        setEditMode(prevState => !prevState);
        setNewName(name);
        setNewBirthday(birthday);
        setNewSpecies(species);
        setNewRace(race??undefined);
        isEditedHandler('edit mode','add');
    }

    const saveHandler = () =>{
        editHandler(newName,newBirthday,newSpecies,newRace??undefined);
        setEditMode(prevState => !prevState);
        isEditedHandler('edit mode','remove');
    }

    const backHandler = () =>{
        const condition = isEdited.length>1 ? window.confirm(`${isEdited.filter(e=>e!=='edit mode')} ${isEdited.length===2?'is':'are'} changed! Do you want to back this changes?`) : true;

        if(condition){
            setNewName(name)
            setNewBirthday(birthday)
            setNewSpecies(species)
            setNewRace(race??undefined)
            setEditMode(prevState => !prevState);
            setIsEdited([]);
        }
    }

    const componentDeleteHandler = () =>{
        modeHandler();
        deleteHandler();
    }

    const isEditedHandler = (name:string,action:'add'|'remove') =>{
        if(action === 'add') {
            setIsEdited(prevState => {
                if (!prevState.filter(e => e === name).length)
                    return [name, ...prevState]
                return prevState
            })
        }else{
            setIsEdited(prevState => prevState.filter(e=>e!==name));
        }
    }

    //Render
    const context = <>
        <EditInput name={'Name'} format={'text'} value={name} changedValue={newName} change={setNewName} edit={editMode} isEditedArray={isEdited} isEditedHandler={isEditedHandler}/>
        <EditInput name={'Birthday'} format={'date'} value={birthday} changedValue={newBirthday} change={setNewBirthday} edit={editMode} isEditedArray={isEdited} isEditedHandler={isEditedHandler}/>
        <EditInput name={'Species'} format={'text'} value={species} changedValue={newSpecies} change={setNewSpecies} edit={editMode} isEditedArray={isEdited} isEditedHandler={isEditedHandler}/>
        <EditInput name={'Race'} format={'text'} value={race ?? "none"} changedValue={newRace??'none'} change={setNewRace} edit={editMode} isEditedArray={isEdited} isEditedHandler={isEditedHandler}/>
    </>

    const editButtons = editMode ?
        <div className='buttons'>
            <button onClick={backHandler}>Back</button>
            {isEdited.length > 1 ? <button className='save' onClick={saveHandler}>Save</button> : null}
            <button className='delete' onClick={componentDeleteHandler}>Delete</button>
        </div>:
        <button onClick={modeHandler}>edit</button>

    return(
        <>
            {editButtons}
            {context}
        </>
    )
}