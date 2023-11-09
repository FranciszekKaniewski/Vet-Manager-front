export const Fetch = async (url:string,method:string="GET",body?:any) =>{

    try {

        return await fetch(`http://localhost:3001/${url}`, {
            method: method,
            mode: "cors",
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: body,
        })

    }catch (err){
        console.error("Server Error!");
    }

}