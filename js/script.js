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

    /**
     * Click on user card causes modal to appear with addtn'l user info.
     * Modal is closed when the 'x' button or overlay is clicked.
     */
    function showModal(e) {
        const card = $(e.target).closest('.card');
        const userNumber = parseInt(card.attr('usernumber'));
        const user = randomUsers.results[userNumber];
        //Destructurting trick again...
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

        //Allows users to close the modal by clicking the 'x' button. 
        $('#modal-close-btn').on('click', () => {
            $('.modal-container').remove();
        });

        //Allows users to close the modal by clicking the overlay.
        // $.modal.defaults = {
        //     clickClose = true,
        // }

        //Setting up the prev and next buttons for extra credit.
        // $('#modal-prev').on('click', prevResult);
        $('#modal-next').on('click', nextResult);
    }

    //EXTRA CREDIT
    // function nextResult() {
    //     const userNumber = (parseInt($(".modal").attr('usernumber')) + 1) % 12;
    //     const user = randomUsers.results[userNumber]; //gets us the array result for the user clicked.
    //     const {
    //         picture,
    //         name,
    //         email,
    //         location,
    //         phone,
    //         cell,
    //         dob
    //     } = user; //destructuring assignment
    //     const date = new Date(dob.date);
    //     $('.modal-info-container > img').attr('src', picture.thumbnail);
    //     $("#name").attr('src', name.first, name.last); //name
    //     $('p.modal-text:eq(2)').attr(email);//email
    //     $('.modal-text cap').attr(location.street, location.city, location.state, location.zip); //location
    //     $('p.modal-text:contains(Phone:').attr(phone);//phone
    //     $('p.modal-text:contains(Cell:)').attr(cell); //cell
    //     $('p.modal-text:contains(Birthday:').attr(dob.date);//dob

    // }

    //     function prevResult() {
    //         const userNumber = (parseInt($(".modal").attr('usernumber')) - 1) % 12;
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
    //     }

    const searchBar = `<form action="#" method="get">
         <input type="search" id="search-input" class="search-input" placeholder="Search...">
         <input type="submit" value="&#x1F50D;" id="sear ch-submit" class="search-submit">
         </form>`;
    $('.search-container').append(searchBar);
});