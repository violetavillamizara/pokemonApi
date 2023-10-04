const url="http://127.0.0.1:5010/stats"

const get=async()=>{
    let config={
        method:"GET",
        headers:{"Content-Type":"application/json"},
    }
    await (await fetch(url)).json();
}
get();

const enviar=async()=>{
    let config={
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
            "name":"",
            "stats":[{
                hp:""
            },{
                attack:""
            },{
                defense:""
            },{
                special_attack:""
            },{
                special_defense:""
            },{
                speed:""
            }]
        })
    }
    let res=await(await fetch(url,config)).json();
    console.log(res);
}
enviar();

const actualizar=async()=>{
    let id= 1
    let config={
        method:"PUT",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
            "name":"",
            "stats":[{
                hp:""
            },{
                attack:""
            },{
                defense:""
            },{
                special_attack:""
            },{
                special_defense:""
            },{
                speed:""
            }]
        })
    }
    let res=await(await fetch(`${url}/${id}`,config)).json();
    console.log(res);
}
actualizar();

const eliminar=async()=>{
    let id=1
    let config={
        method:"DELETE"
    }
    let res=await(await fetch(`${url}/${id}`,config)).json();
    console.log(res);
}
eliminar();