$(document).ready(function () {

    //Created a XMLHttp Request object and callback function, then opened and sent a request
    //appends user cards while looping through array
    let randomUsers;
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            randomUsers = JSON.parse(xhr.responseText); //RESULTS is the array, not randomUsers
            const cardArray = [];
            for (var i = 0; i < randomUsers.results.length; i++) {
                const {
                    picture,
                    name,
                    email,
                    location
                } = randomUsers.results[i]; //destructuring assignment
                const userHTML = $(`<div class="card" usernumber="${i}">
                         <div class="card-img-container">
                             <img class="card-img" src="${picture.thumbnail}" alt="profile picture">
                         </div>
                         <div class="card-info-container">
                             <h3 id="name" class="card-name cap">${name.first} ${name.last}</h3>
                             <p class="card-text">${email}</p>
                             <p class="card-text cap">${location.city}, ${location.state}</p>
                         </div>
                         </div>`).on('click', showModal);
                cardArray.push(userHTML);
            }
            $('.gallery').append(cardArray);
        }
    };
    xhr.open('GET', 'https://randomuser.me/api/?results=12');
    xhr.send();

    //shows modal when card is clicked. Addtn'l info appended to the modal.
    // Modal is closed when the 'x' button is clicked.
    function showModal(e) {
        const card = $(e.target).closest('.card');
        const userNumber = parseInt(card.attr('usernumber')); 
        const user = randomUsers.results[userNumber];
        const {
            picture,
            name,
            email,
            location,
            phone,
            cell,
            dob
        } = user;
        const date = new Date(dob.date);
        const modal = `<div class="modal-container">
                <div class="modal" usernumber="${userNumber}">
                    <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                    <div class="modal-info-container">
                        <img class="modal-img" src="${picture.thumbnail}" alt="profile picture">
                        <h3 id="name" class="modal-name cap">${name.first} ${name.last}</h3>
                        <p class="modal-text">${email}</p>
                        <p class="modal-text cap">${location.street}, ${location.city}, ${location.state} 
                        ${location.zip !== undefined ? location.zip : ""}</p>
                        <hr>
                        <p class="modal-text">Phone: ${phone}</p>
                        <p class="modal-text">Cell: ${cell}</p>
                        <p class="modal-text">Birthday: ${date.getMonth()+1}/${date.getDay()}/${date.getFullYear()}</p>
                    </div>
                </div>
                <div class="modal-btn-container">
                        <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                        <button type="button" id="modal-next" class="modal-next btn">Next</button>
                    </div>
                </div>`;
        $('body').append(modal);
        $('#modal-close-btn').on('click', () => {
            $('.modal-container').remove();
        }); 
        $('#modal-prev').on('click', prevResult);
        $('#modal-next').on('click', nextResult);
    }

//EXTRA CREDIT
//     function nextResult() {
//         const userNumber = (parseInt($(".modal").attr('usernumber')) + 1) % 12;
//         const user = randomUsers.results[userNumber]; //gets us the array result for the user clicked.
//         const {
//             picture,
//             name,
//             email,
//             location,
//             phone,
//             cell,
//             dob
//         } = user; //destructuring assignment
//         const date = new Date(dob.date);
//         $(".modal-info-container > img").attr('src', picture.thumbnail);
//     }

//     function prevResult() {

//     }

    const searchBar = `<form action="#" method="get">
         <input type="search" id="search-input" class="search-input" placeholder="Search...">
         <input type="submit" value="&#x1F50D;" id="sear ch-submit" class="search-submit">
         </form>`;
    $('.search-container').append(searchBar);
});