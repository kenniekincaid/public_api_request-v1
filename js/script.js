$(document).ready(function () {
    /**
     * Request, retrieve, parse, and append random user data to HTML
     * if ready state and status conditions are met. Then, show modal
     * when the cards are clicked.
     */
    let randomUsers; //Global variable for later usage.
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            randomUsers = JSON.parse(xhr.responseText);
            const cardArray = [];
            for (var i = 0; i < randomUsers.results.length; i++) {
                /**Learned an advanced destructing assignment trick to avoid repetition
                 * via https://dev.to/sarah_chima/destructuring-assignment---arrays-16f*/
                const {
                    picture,
                    name,
                    email,
                    location
                } = randomUsers.results[i];
                const userHTML = $(`<div id="usercard" class="card" usernumber="${i}">
                         <div class="card-img-container" class="zoom">
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

    /**
     * Click on user card causes modal to appear with addtn'l user info dynamically appended.
     * Modal is closed when the 'x' button or overlay is clicked.
     */
    function showModal(e) {
        const card = $(e.target).closest('.card');
        const userNumber = parseInt(card.attr('usernumber'));
        const user = randomUsers.results[userNumber];
        console.log(user);
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
                    <div id="userinfo" class="modal-info-container">
                        <img id="picture" class="modal-img" src="${picture.thumbnail}" alt="profile picture">
                        <h3 id="name" class="modal-name cap">${name.first} ${name.last}</h3>
                        <p id="email" class="modal-text">${email}</p>
                        <p id="location" class="modal-text cap">${location.street}, ${location.city}, ${location.state} 
                        ${location.zip !== undefined ? location.zip : ""}</p>
                        <hr>
                        <p id="phone" class="modal-text">Phone: ${phone}</p>
                        <p id="cell" class="modal-text">Cell: ${cell !== undefined ? cell : ""}</p>
                        <p id="birthday" class="modal-text">Birthday: ${date.getMonth()+1}/${date.getDay()}/${date.getFullYear()}</p>
                    </div>
                </div>
                <div class="modal-btn-container">
                        <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                        <button type="button" id="modal-next" class="modal-next btn">Next</button>
                    </div>
                </div>`;
        $('body').append(modal);

        /**
         * Allows users to close the modal by clicking the 'x' button. 
         */
        $('#modal-close-btn').on('click', () => {
            $('.modal-container').remove();
        });
    }

    /**
     * Search bar is just for aesthetics; not functional.
     */
    const searchBar = `<form action="#" method="get">
            <input type="search" id="search-input" class="search-input" placeholder="Search...">
            <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
            </form>`;
    $('.search-container').append(searchBar);
});