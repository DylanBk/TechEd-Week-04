import { API_URL } from '../../config';

import goldStar from '../assets/media/icons/star-gold.svg';
import defaultStar from '../assets/media/icons/star-default.svg';
import tickIcon from '../assets/media/icons/tick.svg';

const overlay = document.querySelector('#overlay');
const guestbook = document.querySelector('#guestbook');
const addNoteBtn = document.querySelector('#add-note-btn');
const closeNoteBtn = document.querySelector('#close-note-btn');
const noteForm = document.querySelector('#add-note-form');
const starRating = document.querySelector('#star-rating');
const notes = document.querySelector('#notes');

const handleLoad = async () => {
    const notesData = await getNotes();

    Array.from(notesData.data).forEach((n,i) => {
        const note = document.createElement('div');
        const rating = document.createElement('div');
        const content = document.createElement('p');
        const author = document.createElement('p');

        author.textContent = n.author;
        content.textContent = n.content;

        for (let i = 0; i < 5; i++) {
            const star = document.createElement('img');

            star.src = i <= n.rating ? goldStar : defaultStar;

            rating.appendChild(star);
        };

        note.appendChild(rating);
        note.appendChild(author);
        note.appendChild(content);
        note.classList.add('note');
        note.id = i;

        notes.appendChild(note);
    });
};

const getNotes = async () => {
    const req = await fetch(`${API_URL}/get-notes`, {
        method: 'GET'
    });
    const res = await req.json();

    return res;
}

window.addEventListener('load', handleLoad);

const openForm = () => {
    noteForm.style.display = 'flex';
    overlay.style.opacity = 1;
    overlay.style.pointerEvents = 'auto';
}

const closeForm = () => {
    noteForm.style.display = 'none';
    overlay.style.opacity = 0;
    overlay.style.pointerEvents = 'none';
};

addNoteBtn.addEventListener('click', openForm);
closeNoteBtn.addEventListener('click', closeForm);

const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(noteForm);
    const formDataObj = Object.fromEntries(formData);

    const rating = starRating.children[2].value;

    if (rating < 0) {
        return;
    };

    const req = await fetch(`${API_URL}/add-note`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formDataObj)
    });

    if (req.ok) {
        const success = document.createElement('div');
        const img = document.createElement('img');
        const title = document.createElement('h3');
        const msg = document.createElement('p');

        img.src = './src/assets/media/icons/tick.svg';
        title.textContent = 'Success'
        msg.textContent = 'Your note has been added!';

        success.appendChild(img);
        success.appendChild(title);
        success.appendChild(msg);
        success.classList.add('success');

        notes.appendChild(success);

        setTimeout(() => {
            noteForm.style.display = 'none';
            success.style.display = 'flex';
        }, 1000);

        setTimeout(() => {
            notes.removeChild(success);
            overlay.style.display = 'none';

            notes.innerHTML = '';
            handleLoad();
        }, 3000);
    } else {
        console.error('Internal Server Error');
    };
};

noteForm.addEventListener('submit', handleFormSubmit);

let selectedRating = -1; // -1 = none, elements start at 0

Array.from(starRating.children[1].children).forEach((el, idx, stars) => {
    el.addEventListener('mouseover', () => {
        stars.forEach((star, i) => {
            star.src = i <= idx ? goldStar : defaultStar;
        });
    });

    el.addEventListener('mouseout', () => {
        stars.forEach((star, i) => {
            star.src = i <= selectedRating ? goldStar : defaultStar;
        });
    });

    el.addEventListener('click', () => {
        selectedRating = idx;
        stars.forEach((star, i) => {
            star.src = i <= selectedRating ? goldStar : defaultStar;
        });

        starRating.children[2].value = idx;
    });
});