$(document).ready(function() {
const url = "https://randomuser.me/api/?results=12";
const results = $('#gallery').append(`<div id="results"></div>`);
let staff = "";

  //fetching random user information and dynamically appending it to the document.
  function getUserData(url) {
      fetch(url)
          .then(response => (response.json())) //convert into json
          .then(function(data) {
            // console.log(data);//12 objects received in the console.
            data.results.forEach(person => {
                //EMPLOYEE GALLERY(CARDS)
                staff = `<div class="card">
                <div class="card-img-container">
                    <img class="card-img" src="https://placehold.it/90x90" alt="profile picture">
                </div>
                <div class="card-info-container">
                    <h3 id="name" class="card-name cap">first last</h3>
                    <p class="card-text">email</p>
                    <p class="card-text cap">city, state</p>
                </div>
                </div>`;
                $('#gallery').append(staff);


            });
          })
  }
  getUserData(url);
});

//SEARCH CONTAINER
const searchBar = `<form action="#" method="get">
<input type="search" id="search-input" class="search-input" placeholder="Search...">
<input type="submit" value="&#x1F50D;" id="serach-submit" class="search-submit">
</form>'`
$(".search-container").append(searchBar);


//EMPLOYEE MODALS
const modal = `<div class="modal-container">
<div class="modal">
    <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
    <div class="modal-info-container">
        <img class="modal-img" src="https://placehold.it/125x125" alt="profile picture">
        <h3 id="name" class="modal-name cap">name</h3>
        <p class="modal-text">email</p>
        <p class="modal-text cap">city</p>
        <hr>
        <p class="modal-text">(555) 555-5555</p>
        <p class="modal-text">123 Portland Ave., Portland, OR 97204</p>
        <p class="modal-text">Birthday: 10/21/2015</p>
    </div>
</div>
<div class="modal-btn-container">
                    <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                    <button type="button" id="modal-next" class="modal-next btn">Next</button>
                </div>
            </div>`
$('#gallery').append(modal).hide();



//Receiving CORS error for the code below. Commenting it out to try an alternative method.
// const url = "https://randomuser.me/api/?results=12";
// var xhr = new XMLHttpRequest(url);
// xhr.onreadystatechange = function() {
//     if(xhr.readyState === 4 && xhr.status === 200) {
//       var employees = JSON.parse(xhr.responseText);
      
//       for(var i=0; i<employees.length; i +=1){
//         if(employees[i] === true)
//         statusHTML += `<div class="card">
//           <div class="card-img-container">
//               <img class="card-img" src="https://placehold.it/90x90" alt="profile picture">
//           </div>
//           <div class="card-info-container">
//               <h3 id="name" class="card-name cap">${first} ${last}</h3>
//               <p class="card-text">${email}</p>
//               <p class="card-text cap">${city, state}</p>
//           </div>
//         </div>`;
//       }
//     }
// }
// xhr.open('GET', 'data/employees.json');
// xhr.send();
