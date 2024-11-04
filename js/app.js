// 62dbfd4bf7535cee53f72718c4bf7df3 API KEY
// https://api.openweathermap.org/data/2.5/weather?q={city name},{country code}&appid={API key}

document.addEventListener('DOMContentLoaded', () => {
    //Configuration of database
    if (!window.indexedDB) { //Validate compatibility of indexedDB
        window.alert("Su Navegador No es compatible con IndexedDB")
    }

    let dataBase //Variable for work with database
    let objectStore //For work with the object in database

    //Create a request to open database
    let request = indexedDB.open("WeatherAPI", 1)

    //Control of request
    request.onerror = () => alert(`Error creando la base de datos`)
    request.onsuccess = (e) => {
        dataBase = e.target.result
        console.log(`Base de datos creada con exito`)
        if (myWeathers) {
            showWeathers()
        }
    }

    //Update database for create initial structure
    request.onupgradeneeded = (e) => {
        dataBase = e.target.result //Save database created in value for work

        //Configuration of the objectStore
        objectStore = dataBase.createObjectStore("weathers", {keyPath: "nameid"})
    }

    const container = document.querySelector(".container")
    const form = document.querySelector("#formulario")
    const result = document.querySelector("#resultado")
    const snipper = document.querySelector("#snipper")
    const myWeathers = document.querySelector("#climas")
    const city = document.querySelector("#ciudad")
    const zipCode = document.querySelector("#zipcode")
    const country = document.querySelector("#pais")

    window.addEventListener("load", ()=> {
        if (form) {
            form.addEventListener("submit", searchWeather)
        }
    })

    function searchWeather(e) {
        e.preventDefault()
        cleanHTML()
        if (city) {
            if (city.value === "" || country.value === ""){
                showError("Los campos son obligatorios")
                return
            }
            queryApi(city.value, country.value, false)
            return
        }
        if (zipCode) {
            if (zipCode.value === "" || country.value === ""){
                showError("Los campos son obligatorios")
                return
            }
            if (isNaN(zipCode.value)){ //Check is only numbers
                showError("Debe de ser un código postal numérico")
                return
            }
            queryApi(zipCode.value, country.value, true)
        }
    }


    function showError(message){
        const alertExist = document.querySelector(".bg-red-100");

        //If alert exist don't show
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
            <span class="block">${message}</span>
        `;

            container.appendChild(alert);

            // Remover alerta después de 2 segundos
            setTimeout(() => alert.remove(), 2000);
        }

    }

    function queryApi(value, country , check) {
        const API_Key = "62dbfd4bf7535cee53f72718c4bf7df3"
        let url //Units, for change de units to degrees
        check? //If check is true get url by zipcode else by city
            url = `https://api.openweathermap.org/data/2.5/weather?zip=${value},${country}&appid=${API_Key}&units=metric`:
            url = `https://api.openweathermap.org/data/2.5/weather?q=${value},${country}&appid=${API_Key}&units=metric`


        fetch(url)
            .then(res => res.json())
            .then((data) => {
                if (data.cod === "404") {
                    showError("La ciudad no encontrada")
                    return
                }

                hideSnipper()
                setTimeout(() => {
                    showWeather(data)
                    hideSnipper()
                },500)
            })
            .catch(error => console.log(error))
    }

    //New function with more data in card
    function showWeather(weather) {
        const {
            weather: [{
                main,
                description,
                icon}],
            main: {
                temp,
                temp_min,
                temp_max,
                humidity},
            name } = weather //Destructuring Object

        //New Card
        const card = document.createElement("div")
        card.classList.add("max-w-xs", "w-full", "bg-blue-100", "rounded-lg", "shadow-lg", "p-6", "m-2") //Add styles for the card

        //City title
        const cityTitle = document.createElement("h2")
        cityTitle.classList.add("text-2xl", "font-bold", "text-gray-800", "mb-2")
        cityTitle.textContent = name

        //Weather Icon https://openweathermap.org/img/wn/10d@2x.png Example of get img
        const imgIcon = document.createElement("img")
        imgIcon.classList.add("w-16", "h-16", "mx-auto", "mb-4")
        imgIcon.src = `https://openweathermap.org/img/wn/${icon}@2x.png`

        //Temperatures
        const actTemp = document.createElement("p")
        actTemp.classList.add("text-xl", "font-semibold", "text-gray-700", "mt-2")
        actTemp.textContent = `${parseInt(temp)}\u00B0`

        const min_maxTemp = document.createElement("p")
        min_maxTemp.classList.add("text-sm", "text-gray-500")
        min_maxTemp.textContent = `Min: ${parseInt(temp_min)}\u00B0 / Max: ${parseInt(temp_max)}\u00B0`

        // Weather State main and description
        const wheatherState = document.createElement("p")
        wheatherState.classList.add("text-gray-600", "mt-2")
        wheatherState.textContent = `${main} - ${description}`

        // Humidity
        const humidityData = document.createElement("p")
        humidityData.classList.add("text-gray-600", "mt-2")
        humidityData.textContent = `Humidity: ${humidity}%`

        // Button add to my weathers
        const favoriteButton = document.createElement("button") //Local for validations
        favoriteButton.classList.add("mt-4", "bg-blue-500", "text-white", "px-4", "py-2", "rounded")
        //Check if weather exists in database
        checkWeatherDatabase(weather, favoriteButton)

        //Add elements to card
        card.appendChild(cityTitle)
        card.appendChild(imgIcon)
        card.appendChild(actTemp)
        card.appendChild(min_maxTemp)
        card.appendChild(wheatherState)
        card.appendChild(humidityData)
        card.appendChild(favoriteButton)
        result.appendChild(card) //Show Result

    }

    //For clean card
    function cleanHTML() {
        while(result.firstChild) {
            result.removeChild(result.firstChild)
        }
    }

    //Snipper
    function hideSnipper() {
        snipper.classList.contains("hidden")?
            snipper.classList.remove("hidden"):
            snipper.classList.add("hidden")
    }

    //Add Weather to My Weathers
    function addWeather(weather) {
        const {
            weather: [{
                main,
                description,
                icon}],
            main: {
                temp,
                temp_min,
                temp_max,
                humidity},
            name } = weather //Destructuring Object
        //Transaction in database clients
        let transaction = dataBase.transaction("weathers", "readwrite")
        let objectStore = transaction.objectStore("weathers")
        request = objectStore.add({ //Same estructure in the API
            nameid: name.toLowerCase(),
            name: name,
            weather: [{
                main: main,
                description: description,
                icon: icon
            }],
            main: {
                temp: temp,
                temp_min: temp_min,
                temp_max: temp_max,
                humidity: humidity
            }
        })
        request.onsuccess = () => {
            cleanHTML()
            showWeather(weather)
        }

        request.onerror = () => {
            console.log("No se agrego")
        }
    }

    function delWeather(weather, favoriteButton) {
        let transaction = dataBase.transaction("weathers", "readwrite")
        let objectStore = transaction.objectStore("weathers")
        const request = objectStore.delete(weather.name.toLowerCase())
        request.onsuccess = () => {
            favoriteButton.textContent = "Agregar a mis Climas";
            favoriteButton.onclick = () => addWeather(weather)
            cleanHTML()
            if (city || zipCode) {
                showWeather(weather)
            }
            if (myWeathers) {
                showWeathers()
            }
        }
        request.onerror = () => {
            console.log("No se pudo eliminar el clima")
        }
    }

    //Check if weather is in database and change the state of button
    function checkWeatherDatabase(weather, favoriteButton) {
        let transaction = dataBase.transaction("weathers", "readonly")
        let objectStore = transaction.objectStore("weathers")
        request = objectStore.get(weather.name.toLowerCase())
        request.onsuccess = () => {
            //If request result isn't null or not change button state
            favoriteButton.textContent = request.result?
                "Eliminar de mis Climas":
                "Agregar a mis Climas"
            favoriteButton.onclick = () => request.result?
                delWeather(weather, favoriteButton):
                addWeather(weather)
        }

        request.onerror = () => {
            console.log("Error en la petición")
        }
    }

    //Show Weathers in My Weathers
    function showWeathers() {
        cleanHTML() // Clear current display
        let transaction = dataBase.transaction("weathers", "readonly")
        let objectStore = transaction.objectStore("weathers")
        let request = objectStore.openCursor()

        request.onsuccess = (event) => {
            const cursor = event.target.result
            if (cursor) {
                console.log(cursor.value) // Verifica el objeto que estás mostrando
                showWeather(cursor.value) //Cursor for show weathers storage in database
                cursor.continue()
            }
        }

        request.onerror = () => {
            console.log("Error leyendo base de datos")
        }
    }

})