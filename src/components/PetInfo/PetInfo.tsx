import {useState} from "react";

type Props = {
    name:string;
    birthday:string;
    species:string;
    race:string | undefined;
    editHandler:(name:string,birthday:string,species:string,race:string|undefined)=>{};
    deleteHandler:()=>{};
}

export const PetInfo = (props:Props) =>{
    const {name,birthday,species,race,editHandler,deleteHandler} = props

    const [newName, setNewName] = useState(name);
    const [newBirthday, setNewBirthday] = useState(birthday);
    const [newSpecies, setNewSpecies] = useState(species);
    const [newRace, setNewRace] = useState(race);

    const[editMode,setEditMode] = useState(false);

    const modeHandler = () =>{
        setEditMode(prevState => !prevState);
        setNewName(name)
        setNewBirthday(birthday)
        setNewSpecies(species)
        setNewRace(race)
    }
    const saveHandler = () =>{
        editHandler(newName,newBirthday,newSpecies,newRace);
        setEditMode(prevState => !prevState);
    }
    const backHandler = () =>{
        setNewName(name)
        setNewBirthday(birthday)
        setNewSpecies(species)
        setNewRace(race)
        setEditMode(prevState => !prevState);
    }

    const context = !editMode ?
        <div className='pet-data'>
            <h2>Name: {name}</h2>
            <h2>Birthday: {birthday}</h2>
            <h2>Species: {species}</h2>
            <h2>Race: {race ?? "none"}</h2>
        </div>
        :
        <div className='pet-data'>
            <h2>Name: <input type="text" value={newName} onChange={(e)=>setNewName(e.target.value)}/></h2>
            <h2>Birthday: <input type="date" value={newBirthday} onChange={(e)=>setNewBirthday(e.target.value)}/></h2>
            <h2>Species: <input type="text" value={newSpecies} onChange={(e)=>setNewSpecies(e.target.value)}/></h2>
            <h2>Race: <input type="text" value={newRace} onChange={(e)=>setNewRace(e.target.value)}/></h2>
        </div>

    const editButtons = editMode ?
        <div className='buttons'>
            <button onClick={backHandler}>Back</button>
            <button className='save' onClick={saveHandler}>Save</button>
            <button className='delete' onClick={deleteHandler}>Delete</button>
        </div>:
        <button onClick={modeHandler}>edit</button>

    return(
        <>
            {editButtons}
            {context}
        </>
    )
}