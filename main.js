/*********************************
 *           CONSEGNA            *
 *********************************/

/* MILESTONE 1
    Creiamo il nostro array di oggetti che rappresentano ciascun post. Ogni post dovrà avere le informazioni necessarie per stampare la relativa card:
    - id del post, numero progressivo da 1 a n
    - nome autore,
    - foto autore,
    - data in formato americano (mm-gg-yyyy),
    - testo del post,
    - immagine (non tutti i post devono avere una immagine),
    - numero di likes. */
/* MILESTONE 2
    Stampiamo i post del nostro feed.*/
/* MILESTONE 3
    Se clicchiamo sul tasto “Mi Piace” cambiamo il colore al testo del bottone e incrementiamo il counter dei likes relativo.
    Salviamo in un secondo array gli id dei post ai quali abbiamo messo il like. */

/* BONUS
    - Formattare le date in formato italiano (gg/mm/aaaa)
    - Gestire l’assenza dell’immagine profilo con un elemento di fallback che contiene le iniziali dell’utente (es. Luca Formicola > LF).
    - Al click su un pulsante “Mi Piace” di un post, se abbiamo già cliccato dobbiamo decrementare il contatore e cambiare il colore del bottone. */

/*********************************
 *           SVILUPPO            *
 *********************************/

// Array di oggetti (social posts)
const posts = [
    {
        "id": 1,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/300?image=171",
        "author": {
            "name": "Phil Mangione",
            "image": "https://unsplash.it/300/300?image=15"
        },
        "likes": 80,
        "created": "2021-06-25"
    },
    {
        "id": 2,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=112",
        "author": {
            "name": "Sofia Perlari",
            "image": "https://unsplash.it/300/300?image=10"
        },
        "likes": 120,
        "created": "2021-09-03"
    },
    {
        "id": 3,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=234",
        "author": {
            "name": "Chiara Passaro",
            "image": "https://unsplash.it/300/300?image=20"
        },
        "likes": 78,
        "created": "2021-05-15"
    },
    {
        "id": 4,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=24",
        "author": {
            "name": "Luca Formicola",
            "image": null
        },
        "likes": 56,
        "created": "2021-04-03"
    },
    {
        "id": 5,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=534",
        "author": {
            "name": "Alessandro Sainato",
            "image": "https://unsplash.it/300/300?image=29"
        },
        "likes": 95,
        "created": "2021-03-05"
    }
];

// reference a elementi in HTML
const container = document.getElementById("container");

// Inserisco i post nel DOM in modo dinamico
posts.forEach(post => {

    // Inserisco il contenuto nel container
    container.innerHTML += 
    `<div class="post">
        <div class="post__header">
            <div class="post-meta">                    
                <div class="post-meta__icon">
                    <img class="profile-pic" src=${post.author.image} alt=${userInitials(post.author.name)}>                 
                </div>
                <div class="post-meta__data">
                    <div class="post-meta__author">${post.author.name}</div>
                    <div class="post-meta__time">${italianDate(post.created)}</div>
                </div>                    
            </div>
        </div>
        <div class="post__text">${post.content}</div>
        <div class="post__image">
            <img src=${post.media} alt="">
        </div>
        <div class="post__footer">
            <div class="likes js-likes">
                <div class="likes__cta">
                    <a class="like-button  js-like-button" href="#" data-postid="${post.id}">
                        <i class="like-button__icon fas fa-thumbs-up" aria-hidden="true"></i>
                        <span class="like-button__label">Mi Piace</span>
                    </a>
                </div>
                <div class="likes__counter">
                    Piace a <b id="like-counter-${post.id}" class="js-likes-counter">${post.likes}</b> persone
                </div>
            </div> 
        </div>            
    </div>`
});

// Seleziono tutti i like buttons
const js_like_buttons = document.querySelectorAll(".js-like-button");
// Array da popolare con gli ID dei post "liked"
let likesArray = [];

// Seleziono ogni button (con forEach)
js_like_buttons.forEach((element) => {
    //dichiaro un counter che sia equivalente all'ID dell'elemento
    const counter = element.getAttribute("data-postid");
    //creo il counter che corrisponde all'ID
    const thisLikeCounter = document.getElementById(`like-counter-${counter}`);
    //creo l'oggetto con proprietà ID da aggiungere al likeArray ogni volta che si clicca su like
    let newObj = {id:counter};
    
    // Click sul like button
    element.addEventListener("click",
        function likeButtonAction(event) {
            event.preventDefault();// interrompe comportamento default del button
            // Se è già "liked"
            if (element.classList.contains("like-button--liked")) {
                element.classList.remove("like-button--liked")
                // tolgo il like dal contatore
                thisLikeCounter.innerHTML = parseInt(thisLikeCounter.innerHTML) - 1;
                // tolgo l'ID dal likesArray
                likesArray = likesArray.filter(
                    function(object) {
                        return object.id !== counter;
                    }
                );
            // Se non è ancora "liked"
            }else{
                element.classList.add("like-button--liked")
                // aggiungo al contatore
                thisLikeCounter.innerHTML = parseInt(thisLikeCounter.innerHTML) + 1;
                //aggiungo all'Array
                likesArray.push(newObj);
            }
            console.log(likesArray); //Array ID posts liked
        }
    )
});

/*********************************
 *           FUNCTIONS            *
 *********************************/

// Data formato italiano (gg-mm-aaaa)
function italianDate(date) {
    let splitDate = date.split("-");
    let reversedSplitDate = splitDate.reverse();
    let italianFormatDate = reversedSplitDate.join("-");
    
    return italianFormatDate;
}
// Genera Iniziali (prima lettera di ogni parola contenuta nella stringa fullString)
function userInitials(fullString) {
    let fullStringArr = fullString.split(" ");
    initialsArr = fullStringArr.map(element=>{
    return element.substring(0,1);// Seleziono la prima lettera di ogni stringa
    });
    
    return initialsArr.join("");
}
