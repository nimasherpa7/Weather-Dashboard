
const apiKey="f31f6cb4fdd64b9c298dcd8ee1b8d379"
const apiUrl="http://api.openweathermap.org"

function getUserCityCoords(query) {
    console.log({query})
    fetch(`${apiUrl}/geo/1.0/direct?q=${query}&appid=${apiKey}&`).then((response)=>{
        return response.json()

    })
    .then((data) => {
        console.log(data)
        const {lat,lon}=data[0]
        getForecast(lat,lon)
    })

}

function getForecast(lat,lon){
    fetch(`${apiUrl}/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`)
        .then((response)=>{
            return response.json()
        })
        .then((data) => {
            console.log(data)
            renderForecast(data)
        })
}

function renderForecast(data) {
    const forecastContainer=document.querySelector(".fiveday-forecast")
    for(let i=0; i<data.list.length; i+=8) {
        const forecastCard=document.createElement("ul")
        const forecastLi=document.createElement("li")
        const forecastCityname=document.createElement("h2")
        const forecastTemp=document.createElement("h4")
        const forecastWind=document.createElement("h4")
        const forecastHumidity=document.createElement("h4")
        const forecastImg=document.createElement("img")

        forecastCityname.textContent=data.city.name
        forecastTemp.textContent=data.list[i].main.temp
        forecastWind.textContent=data.list[i].wind.speed
        forecastHumidity.textContent=data.list[i].main.humidity
        forecastImg.setAttribute("src",data.list[i].weather[0].icon)

        forecastLi.append(forecastCityname, forecastTemp, forecastWind, forecastImg)
        forecastCard.append(forecastLi)
        forecastContainer.append(forecastCard)
    }
}


document.querySelector(".search-btn").addEventListener("click",function(){
    const searchCity=document.querySelector("#city-input").value
    getUserCityCoords(searchCity)
})