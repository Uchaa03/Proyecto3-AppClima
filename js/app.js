// 62dbfd4bf7535cee53f72718c4bf7df3 API KEY

// https://api.openweathermap.org/data/2.5/weather?q={city name},{country code}&appid={API key}

const container = document.querySelector(".container")
const formulario = document.querySelector("#formulario")
const resultado = document.querySelector("#resultado")
const snipper = document.querySelector("#snipper")

//Listerner similar a DOMContentLoaded
window.addEventListener("load", ()=> {
    formulario.addEventListener("submit", buscarClima)
})

function buscarClima(e) {
    e.preventDefault()
    //Validar que no me deje en blanco el inpur
    const ciudad = document.querySelector("#ciudad").value
    const pais = document.querySelector("#pais").value
    limpiarHTML()
    if (ciudad === "" || pais === ""){
        mostrarError("Los campos son obligatorios")
    }else consultarAPI(ciudad, pais)
}


function mostrarError(mensaje){
    const alertExist = document.querySelector(".bg-red-100");

    // Solo mostrar una alerta si no existe ya
    if (!alertExist) {
        const alert = document.createElement("div");
        alert.classList.add(
            "bg-red-100",
            "border-red-400",
            "text-red-700",
            "px-4",
            "py-3",
            "rounded",
            "mx-auto",
            "mt-5",
            "text-center"
        );

        alert.innerHTML = `
            <strong class="font-bold">ERROR</strong>
            <span class="block">${mensaje}</span>
        `;

        container.appendChild(alert);

        // Remover alerta después de 2 segundos
        setTimeout(() => alert.remove(), 2000);
    }

}

function consultarAPI(ciudad, pais) {
    const API_Key = "62dbfd4bf7535cee53f72718c4bf7df3"
    //Si le pasas el parametro metric directamente ya te lo muestra en grados y solo hay que parserlo
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${API_Key}&units=metric`

    fetch(url)
        .then(res => res.json())
        .then((data) => {
            //Si utilizamos if con return queda mas sofisticado que con tanto if else
            if (data.cod === "404") {
                mostrarError("La ciudad no encontrada")
                return
            }

            hiddenSnipper()
            setTimeout(() => {
                mostrarClima(data)
                hiddenSnipper()
            },500)
        })
        .catch(error => console.log(error))
}

function mostrarClima(clima) {
    console.log(clima)
    const {main: {temp, temp_max, temp_min}} = clima

    const actual = document.createElement("p")
    actual.innerHTML = `${parseInt(temp)} &deg;`
    actual.classList.add("font-bold", "text-6xl")

    const temperaturaMax = document.createElement("p")
    temperaturaMax.innerHTML = `Max: ${parseInt(temp_max)} &deg;`
    temperaturaMax.classList.add("font-bold", "text-xl")

    const temperaturaMin = document.createElement("p")
    temperaturaMin.innerHTML = `Min: ${parseInt(temp_min)} &deg;`
    temperaturaMin.classList.add("font-bold", "text-xl")

    const resultadoDiv = document.createElement("div")
    resultadoDiv.classList.add("text-center", "text-white")

    resultadoDiv.appendChild(actual)
    resultadoDiv.appendChild(temperaturaMax)
    resultadoDiv.appendChild(temperaturaMin)
    resultado.appendChild(resultadoDiv)

}

function limpiarHTML() {
    while(resultado.firstChild) {
        resultado.removeChild(resultado.firstChild)
    }
}


//Funcion para eliminar y mostrar snipper
function hiddenSnipper() {
    snipper.classList.contains("hidden")?
        snipper.classList.remove("hidden"):
        snipper.classList.add("hidden")
}
