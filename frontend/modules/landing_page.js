import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();
  console.log("From init()")

  //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try {
  let response = await fetch(`${config.backendEndpoint}/cities`);
  let user = await response.json();
  return user
  } 
  catch(err) {
    return null;
  }
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
    let container = document.createElement("div")
    container.className = "col-6 col-lg-3 mb-4"
    let data = document.getElementById("data")
    let divElement = data.appendChild(container)

    let anchorTag = document.createElement("a")
    anchorTag.setAttribute("href",`pages/adventures/?city=${id}`)
    anchorTag.id = id;
    divElement.appendChild(anchorTag)

    let container1 = document.createElement("div")
    container1.className = "tile"
    container1.innerHTML = `<img src="${image}" class="img-responsive" />`
    anchorTag.appendChild(container1)

    let container2 = document.createElement("div")
    container2.className = "tile-text text-center"
    container2.innerHTML = `<h5>${city}</h5><p>${description}</p>`
    container1.appendChild(container2)
}

export { init, fetchCities, addCityToDOM };
