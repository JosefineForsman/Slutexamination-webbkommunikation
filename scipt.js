 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
 import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc, query, where } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";
 // TODO: Add SDKs for Firebase products that you want to use
 // https://firebase.google.com/docs/web/setup#available-libraries

 // Your web app's Firebase configuration
 const firebaseConfig = {
   apiKey: "AIzaSyCn8ix2iZpS0GnXEQWcs5JzmahOB1MUKwI",
   authDomain: "de-ve-de.firebaseapp.com",
   projectId: "de-ve-de",
   storageBucket: "de-ve-de.appspot.com",
   messagingSenderId: "720471949148",
   appId: "1:720471949148:web:ae7a6f88a0f9685f98cb99"
 };

 // Initialize Firebase
 const app = initializeApp(firebaseConfig);
 const db = getFirestore(app);

 const inputTitle = document.querySelector('#title');
 const inputGenre = document.querySelector('#genre');
 const inputReleaseDate = document.querySelector('#release-date');
 const saveMovie = document.querySelector('#save-movie');
 

 let movie = {
    title: '',
    genre: '',
    releaseDate: ''
 } 
 
//  saveMovie.addEventListener('click', ()=>{
//     console.log('click');
//  });

 function addMovie(){
    saveMovie.addEventListener('click', ()=>{
        movie.title = inputTitle.value;
        movie.genre = inputGenre.value;
        movie.releaseDate = inputReleaseDate.value;
        saveToDatabase(movie);
        console.log(movie);
        getMovie();
    })
    
}
addMovie();

async function saveToDatabase(movie){
    try{
        await addDoc(collection(db, 'movies'), movie);
    } catch(error){
        console.log('Error', error);
    }
    clearInputFields();

 }
 function clearInputFields(){
    inputTitle.value = '';
    inputGenre.value = '';
    inputReleaseDate.value = '';
}

async function getMovie(){
    const movie = await getDocs(collection(db,'movies'));
    const showMovie = document.querySelector('aside');

    // document.queryselector `#${li.id}`.style.display="none"; i min remove funktion.
    movie.forEach((li)=>{
        console.log(li.data());
        const el = `
        <article class="delete" id="${li.data().title}">
        <li movie-id="${li.id}">${li.data().title}<br>${li.data().genre}<br>${li.data().releaseDate}<br></li>
        </article>`
        showMovie.insertAdjacentHTML('beforeend', el);
    })
    removeMovie();
}

function removeMovie(){
    const movieInfo = document.querySelectorAll('li');
    const deleteArticle = document.querySelector('.delete')

    movieInfo.forEach((x)=>{
        x.addEventListener('click', (event)=>{
            console.log('click');
            const deletedId = event.target.getAttribute('movie-id');
            console.log(deletedId);
            x.style.display = 'none';
            // document.querySelector(`#${nameId}`).style.display = 'none';
            // console.log(deleted);
            // deleteArticle.style.display = "none";
            removeMovieFromDatabase(deletedId)

        })

    })
}

async function removeMovieFromDatabase(deletedId){
    try{
        await deleteDoc(doc(db, 'movies', deletedId)), {
        
        }
    } catch(error){
        console.log(error)
    }
}
console.log(movie);