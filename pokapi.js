const mockapi="https://6519c2f0340309952f0cb287.mockapi.io/poke";

const get=async()=>{
    let config={
        method:"GET",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify()
    }
    await (await fetch(url)).json();
}
get();