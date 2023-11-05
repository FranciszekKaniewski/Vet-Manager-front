import {FormEvent} from "react";

type Props = {
    onSubmitFn:(e:FormEvent)=>void|Promise<void>;
    array:{name:string,type:string,value:any,changer:any,required?:boolean,pattern?:string}[],
    button:string,
}

export const Form = (props:Props) =>{

    const labels = props.array.map(e=>
        <label key={e.name}>
            <p>{e.name}</p>
            <input required={e.required} pattern={e.pattern} onChange={(input)=>e.changer(input.target.value)} type={e.type} value={e.value}/>
        </label>
    )

    return(
        <form onSubmit={props.onSubmitFn}>
            {labels}
            <br/>
            <button>{props.button}</button>
        </form>
    )

}