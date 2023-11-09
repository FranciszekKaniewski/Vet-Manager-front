import React from "react";

type Props = {
    name:string;
    format:string;
    value:string;
    changedValue:string;
    edit:boolean;
    change:React.Dispatch<React.SetStateAction<string>>|React.Dispatch<React.SetStateAction<string|undefined>>;
    isEditedArray:string[];
    isEditedHandler:(name:string,action:'add'|'remove')=>void;
}

export const EditInput = ({name,value,format,changedValue,change,edit,isEditedArray,isEditedHandler}:Props) =>{

    const changeHandler = (e:React.ChangeEvent<HTMLInputElement>) =>{
        change(e.target.value)
        if(e.target.value === value){
            isEditedHandler(name,'remove');
        }else{
            isEditedHandler(name,'add');
        }
    }

    const changedStyle = isEditedArray.includes(name) ? {backgroundColor:'var(--red-color)'}:{backgroundColor:'transparent'}

    return(
        !edit?
            <h2>{name}: {value}</h2>
            :
            <h2>{name}:
                <input
                    style={changedStyle}
                    type={format}
                    value={changedValue}
                    onChange={(e)=>changeHandler(e)}/>
            </h2>
    )
}