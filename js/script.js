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
    xhr.open('GET', 'https://randomuser.me/api/?results=12&nat=us,au,br,fr,nz');
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
                <div id="usernumber" class="modal" usernumber="${userNumber}">
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
                        <p id="dob" class="modal-text">Birthday: ${date.getMonth()+1}/${date.getDay()}/${date.getFullYear()}</p>
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

        //Was going to create code to allow users to exit modal by clicking the overlay black space.
        // $.modal.defaults = {
        //     clickClose = true,
        // } 

        //Setting up the prev and next buttons for extra credit.
        $('#modal-prev').on('click', prevResult);
        $('#modal-next').on('click', nextResult);
    }

/*EXTRA CREDIT SECTION
    /**
     * MODAL NEXT BUTTON
     */
        function nextResult() {
            const userNumber = (parseInt($(".modal").attr('usernumber')) + 1) % 12;
            const user = randomUsers.results[userNumber]; //gets us the array result for the user clicked.
            const {
                picture,
                name,
                email,
                location,
                phone,
                cell,
                dob
            } = user; //destructuring assignment

            // console.log(user);
            // console.log(user.name.first);
            // console.log(user.location.city);

            const date = new Date(dob.date);
            $(".modal-info-container > img").attr('src', picture.thumbnail);
            $('.modal-container #name').text(user.name.first + ' ' + user.name.last);
            $('.modal-container #email').text(user.email);
            $('.modal-container #location').text(user.location.street + ',' + user.location.city + "," + user.location.state + "" + user.location.zip);
            $('.modal-container #phone').text(user.phone);
            $('.modal-container #cell').text(user.cell);
            $('.modal-container #dob').text(user.getMonth() + user.getDay() + user.getFullYear());
        }

    /**
     * MODAL PREVIOUS BUTTON
     */
        function prevResult() {
            const userNumber = (parseInt($(".modal").attr('usernumber')) - 1) % 12;
            const user = randomUsers.results[userNumber]; //gets us the array result for the user clicked.
            const {
                picture,
                name,
                email,
                location,
                phone,
                cell,
                dob
            } = user; //destructuring assignment
            const date = new Date(dob.date);
            $(".modal-info-container > img").attr('src', picture.thumbnail);
            $('.modal-container #name').text(user.name.first + ' ' + user.name.last);
            $('.modal-container #email').text(user.email);
            $('.modal-container #location').text(user.location.street + ',' + user.location.city + "," + user.location.state + "" + user.location.zip);
            $('.modal-container #phone').text(user.phone);
            $('.modal-container #cell').text(user.cell);
            $('.modal-container #dob').text(user.getMonth() + user.getDay() + user.getFullYear());
        }

    /**
     * SEARCH BAR - Appended for aesthetics; non-functional.
     */
    const searchBar = `<form action="#" method="get">
        <input type="search" id="search-input" class="search-input" placeholder="Search...">
        <input type="submit" value="&#x1F50D;" id="sear ch-submit" class="search-submit">
        </form>`;
    $('.search-container').append(searchBar);

    // function searchFunction() {
    //     var input, filter, div, h3;
    //     input = document.getElementById('search-input');
    //     filter = input.value.toUpperCase();
    //     div = document.getElementById('usercard');
    //     h3 = div.getElementByTagName('h3').val();

    //     for (i = 0; i < li.length; i++) {
    //         if (h3.innerHTML.toUpperCase().indexOf(filter) > -1) {
    //             if (input === h3) {
    //                 div[i].style.display = "";
    //             } else {
    //                 div[i].style.display = 'none';
    //             }
    //         }
    //     }
    // }

    /*Alterative code*/
        // searchFunction();
        // $("#myInput").on("keyup", function () {
        //     var value = $(this).val().toLowerCase();
        //     $("#myTable tr").filter(function () {
        //         $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        //     });
        // });
});