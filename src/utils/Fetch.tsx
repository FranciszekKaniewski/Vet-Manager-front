export const Fetch = async (url:string,method:string="GET",body?:any) =>{

    const res = await fetch(`http://localhost:3001/${url}`,{
        method:method,
        mode:"cors",
        credentials: 'include',
        headers:{
            'Content-Type': 'application/json',
        },
        body: body,
    })

    return res;
}