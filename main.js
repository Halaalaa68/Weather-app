let daysAfter= document.querySelector("#days-after");
let closeOpen= document.querySelector("#close-open");
// let icon= document.querySelector("#icon");
// let details= document.querySelector("#details");
// let more= document.querySelector("#more");
let tommorow= document.querySelector("#tommorow");
let dayAfter= document.querySelector("#day-after");
let currentCity= document.getElementById("current-city");
let searchCity= document.getElementById("search-city");
let days=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]
let city=[]
// getData()
searchCity.addEventListener('keyup', async function(){
    let mySearch= await fetch(`https://api.weatherapi.com/v1/search.json?&days=3&key=c6f75ac9dca54c5984a115815242106&q=${searchCity.value}&aqi=no`)
    let myCity= await mySearch.json()
    city=myCity
    // console.log(city)
    getData()
})
async function getData(){
    let req= await fetch(`https://api.weatherapi.com/v1/forecast.json?&days=3&key=c6f75ac9dca54c5984a115815242106&q=${city.length>0? city[0].name:'Cairo'}%20${city.length>0? city[0].country: ''}&aqi=no`)
    let data= await req.json()
    // console.log(data)
    let date= new Date(data.forecast.forecastday[0].date);
    currentCity.innerHTML=`<span class="d-flex justify-content-between align-items-center">
        <p class="darkblue">${days[date.getDay()]}</p>
        <p class="darkblue">${data.forecast.forecastday[0].date}</p>
      </span>
      <h1>${data.location.name}</h1>
      <h6 class="darkblue">${data.location.country}</h6>
      <div class="d-flex justify-content-center align-items-center">
        <img src="${data.current.condition.icon}" alt="">
        <h2>${data.current.temp_c} °C</h2>
      </div>
      <div>
        <h4 class="d-flex justify-content-center align-items-center">${data.forecast.forecastday[0].day.maxtemp_c} °C <i class="fa-solid fa-temperature-high p-1"></i> <div class="column"></div><i class="fa-solid fa-temperature-low p-1"></i>${data.forecast.forecastday[0].day.mintemp_c} °C</h4>
      </div>
        <p class="darkblue">${data.current.condition.text}</p>
        <span class="pe-1"><i class="fa fa-umbrella" aria-hidden="true"></i> <span id="rain">${data.current.humidity}%</span></span>
        <span class="pe-1"><i class="fa-solid fa-wind"></i> <span id="wind">${data.current.wind_kph}km/h</span></span>
        <span><i class="fa-regular fa-compass"></i> <span id="direc">${(data.current.wind_dir=="N")?'North': (data.current.wind_dir=="E")? 'East':(data.current.wind_dir=="W")? 'West' : (data.current.wind_dir=="S")?'South' : (data.current.wind_dir=="NE")? 'North East' : (data.current.wind_dir=="NW")? 'North West' :(data.current.wind_dir=="SE")? 'South East' :'South West'}</span></span>
      </div>`
    tommorow.innerHTML=`<span class="d-flex justify-content-between w-50 align-items-center">
                  <p class="darkblue">${days[date.getDay()+1]? days[date.getDay()+1] : days[0]}</p>
                  <p class="darkblue">${data.forecast.forecastday[1].date}</p>
                </span>
                <h2>${data.location.name}</h2>
                <h6 class="darkblue">${data.location.country}</h6>
                <div class="w-100">
                    <h4 class="d-flex justify-content-center align-items-center w-100">${data.forecast.forecastday[1].day.maxtemp_c} °C <i class="fa-solid fa-temperature-high p-1"></i> <div class="column"></div><i class="fa-solid fa-temperature-low p-1"></i>${data.forecast.forecastday[1].day.mintemp_c} °C</h4>
                </div>
                <div class="d-flex justify-content-center align-items-center">
                  <img src="${data.forecast.forecastday[1].day.condition.icon}" alt="${data.forecast.forecastday[1].day.condition.text}">
                </div>
                <div>
                  <p class="text-center darkblue">${data.forecast.forecastday[1].day.condition.text}</p>
                </div>
              </div>`
    dayAfter.innerHTML=`<span class="d-flex justify-content-between w-50 align-items-center">
                  <p class="darkblue">${date.getDay()<=4? days[date.getDay()+2] : date.getDay()==5? days[0] : days[1]}</p>
                  <p class="darkblue">${data.forecast.forecastday[2].date}</p>
                </span>
                <h2>${data.location.name}</h2>
                <h6 class="darkblue">${data.location.country}</h6>
                <div class="w-100">
                    <h4 class="d-flex justify-content-center align-items-center w-100">${data.forecast.forecastday[2].day.maxtemp_c} °C <i class="fa-solid fa-temperature-high p-1"></i> <div class="column"></div><i class="fa-solid fa-temperature-low p-1"></i>${data.forecast.forecastday[2].day.mintemp_c} °C</h4>
                </div>
                <div class="d-flex justify-content-center align-items-center">
                  <img src="${data.forecast.forecastday[2].day.condition.icon}" alt="${data.forecast.forecastday[2].day.condition.text}">
                </div>
                <div>
                  <p class="text-center darkblue">${data.forecast.forecastday[2].day.condition.text}</p>
                </div>
              </div>`
}
getData()
closeOpen.addEventListener('click', function(){
    if(details.classList.contains("d-block"))
        {
            icon.classList.replace("fa-chevron-down", "fa-chevron-up");
            details.classList.replace("d-block", "d-none");
            more.classList.replace("d-none", "d-block");
            daysAfter.style.top="80%";

        }
    else{
        icon.classList.replace("fa-chevron-up", "fa-chevron-down");
        details.classList.replace("d-none", "d-block");
        more.classList.replace("d-block", "d-none");
        daysAfter.style.top="5%";
    }
})
