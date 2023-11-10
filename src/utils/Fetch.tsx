export const Fetch = async (url:string,method:string="GET",body?:any) =>{

    try {

        return await fetch(`https://megak-vet-manager-bb4d119f3444.herokuapp.com/${url}`, {
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