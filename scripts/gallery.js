import { getFilteredImages } from './logic.js';

// DOM Selectors
const displayContainer = document.querySelector('#display-container');
const nav = document.querySelector('#category-navigation');
const searchForm = document.querySelector('#search-container');
const tagInput = document.querySelector('#tag-input');

let images = [];
let currentCategory = 'all';

async function init() {
    try {
        const response = await fetch('assets/data/images.json');
        images = await response.json();
        renderImages(images);
    } catch(error) {
        console.error('Fetch failed:', error);
    }
}

function updateGallery() {
    const filtered = getFilteredImages(images, currentCategory, tagInput.value);
    renderImages(filtered);
}

export function renderImages(imageArray) {
    if (!displayContainer) return;
    displayContainer.innerHTML = imageArray.length === 0 
        ? '<p>No images found.</p>' 
        : ''; 

    imageArray.forEach(img => {
        const figure = document.createElement('figure');
        figure.className = 'progressive-image stamp-border';
        figure.style.margin = "0";
        figure.innerHTML = `<img src="${img.thumb}" alt="${img.alt}" data-full="${img.full}" class="thumbnail" role="button">`;
        displayContainer.appendChild(figure);
    });
}

// Event Listeners
nav?.addEventListener('click', (e) => {
    const btn = e.target.closest('.filter-btn');
    if (btn) {
        currentCategory = btn.dataset.category;
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        updateGallery();
        }
        
        // Inside your nav click listener
    document.querySelectorAll('.filter-btn').forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false'); // Reset all
    });

    btn.classList.add('active');
    btn.setAttribute('aria-pressed', 'true'); // Set active
});

searchForm?.addEventListener('submit', (e) => e.preventDefault());
tagInput?.addEventListener('input', updateGallery);

displayContainer?.addEventListener('click', (e) => {
    const clickedImg = e.target.closest('img');
    
    if (clickedImg) {
        const fullSrc = clickedImg.dataset.full;

        const imageDisplayer = document.createElement('div');
        
        Object.assign(imageDisplayer.style, {
            zIndex: "100",
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.9)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "zoom-out"
        });

        imageDisplayer.innerHTML = `
            <div style="text-align: center;">
                <img id="full-img" src="${fullSrc}" alt="full image" 
                     style="max-width: 80vw; max-height: 80vh; border-radius: 10px; box-shadow: 0 0 20px rgba(0,0,0,0.5);">
                <figcaption style="color: white; margin-top: 15px; font-size: 1.5rem; font-family: 'Stoke', serif;">
                    ${clickedImg.alt}
                </figcaption>
            </div>
        `;

        imageDisplayer.addEventListener('click', () => imageDisplayer.remove());
        document.body.appendChild(imageDisplayer);
    }
});

init();