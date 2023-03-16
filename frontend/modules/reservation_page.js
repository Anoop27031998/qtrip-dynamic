import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  try {
    let response = await fetch(`${config.backendEndpoint}/reservations/`);
    let user = await response.json();
    console.log(user)
    return user
    } 
    catch(err) {
      return null;
    }


  // Place holder for functionality to work in the Stubs
  
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table

  //Conditionally render the no-reservation-banner and reservation-table-parent

  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */

    if(reservations.length > 0) {
      document.getElementById("no-reservation-banner").style.display ="none";
      document.getElementById("reservation-table-parent").style.display ="block"
    }
    else{
      document.getElementById("no-reservation-banner").style.display ="block";
      document.getElementById("reservation-table-parent").style.display ="none"
    }

    reservations.map((element, idx)=>{
      let table = document.createElement("tr");
          let time = new Date(reservations[idx].time);
          let month = time.toLocaleString(undefined, { month: "long" });
          let day = time.getDate();
          let year = time.getFullYear();
          let booktime = time.toLocaleString("en-IN").split(" ");
      table.innerHTML = ` 
      <th scope="row">${element.id}</th>
      <td>${element.name}</td>
      <td>${element.adventureName}</td>
      <td>${element.person}</td>
      <td>${new Date(element.date).toLocaleDateString("en-IN")}</td>
      <td>${element.price}</td>
      
      <td>${day} ${month} ${year}, ${booktime[1]} ${booktime[2]}</td>
      
      <td><div class="reservation-visit-button" id = ${element.id}>
      <a href="../detail/?adventure=${element.adventure}">Visit Adventure</a></div></td>
      `;
      document.getElementById("reservation-table").appendChild(table);
      });
}

export { fetchReservations, addReservationToTable };
