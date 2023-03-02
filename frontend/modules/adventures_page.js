
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  
  let params = new URLSearchParams(search);
  let city = params.get("city")
  console.log(city)
  return city
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try {
    let response = await fetch(`${config.backendEndpoint}/adventures/?city=${city}`);
    let user = await response.json();
    return user
    } 
    catch(err) {
      return null;
    }

}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  adventures.forEach((element) => {
    let divElement = document.getElementById("data");
    let newdivElement = document.createElement("div")
    newdivElement.className = "col-6 col-lg-3 mb-4";

    newdivElement.innerHTML = `
      <a href="detail/?adventure=${element.id}" id="${element.id}">
      <div class="card activity-card">
      <img src= "${element.image}" class="img-responsive" />
      <div class="category-banner">${element.category}</div>
      <div class= "card-body container-fluid">
      <div class="d-md-flex justify-content-between text-center">
      <h5 class="card-title">${element.name}</h5>
      <p class="card-text">₹${element.costPerHead}</p>
      </div>
      <div class="d-md-flex justify-content-between text-center">
      <h5 class="card-title">Duration</h5>
      <p class="card-text">${element.duration} Hours</p>
      </div>
      </div>
      </div>
      </a>`
    divElement.appendChild(newdivElement)

    console.log(divElement)
    
  });

}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  let durationFilteredList = list.filter
  ((element)=> element.duration >= low && element.duration <= high
  );
  return durationFilteredList;
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  let categoryFilteredList = [];
  categoryList.forEach((category) =>{
  list.forEach((key)=>{
    if(key.category === category)
    {
      categoryFilteredList.push(key);
    }
   });
  });
  return categoryFilteredList;
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  let filteredList = [];
 //{ duration: "", category: [] }
  // Place holder for functionality to work in the Stubs
  if (filters["duration"].length > 0 && filters["category"].length > 0){
  filteredList = filterByDuration(list, filters["duration"].split("-")[0] , filters["duration"].split("-")[1]);
    filteredList = filterByCategory(filteredList, filters["category"]);
  }

  else if(filters["duration"].length > 0){
  filteredList = filterByDuration(list , filters["duration"].split("-")[0] , filters["duration"].split("-")[1]);
  }

  else if(filters["category"].length > 0){
  filteredList = filterByCategory(list, filters["category"]);
  }

  else {
  filteredList = list;
  }
  return filteredList;

  // Place holder for functionality to work in the Stubs
  /*return list;*/
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  let stringValue = JSON.stringify(filters);
  localStorage.setItem("filters",stringValue)

  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  let objectValue=JSON.parse(localStorage.getItem("filters"))

  // Place holder for functionality to work in the Stubs
  return objectValue;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  filters["category"].forEach((key) =>
  {
  let element = document.createElement("div");
  element.className = "category-filter";
  element.innerHTML = `
                <div>${key}</div>
                `;
  document.getElementById("category-list").appendChild(element);
  });

}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
