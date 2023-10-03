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
function getPoke







function cambioStats() {
  document.addEventListener('input', async (e) => {
    if (e.target.classList.contains('stat-slider')) {
    const statSlider = e.target;
    const statValue = parseInt(statSlider.value);
    const statName = statSlider.id.split('-')[2];
    cambiosStats[statName] = statValue;

                // actualizar
                const statElement = document.getElementById(`stat_${statName}`);
                statElement.textContent = statValue;
            }
        });

        let ok = document.getElementById(data.id);
        ok.addEventListener('click', () => {
            mockApiPokemons(data.id, cambiosStats);
        })
    });
 }