// DOM
const displayContainer = document.querySelector('#display-container');
const filterBtn = document.querySelector('.filter-btn');
const nav = document.querySelector('#category-navigation');

// VARIABLES and ARRAYS
let images = [];
let categorisedImages = [];

// FUNCTIONS
export async function fetchImageData() {
    try {
        const response = await fetch('assets/data/images.json');
        if(!response.ok) throw new Error('Failed to fetch image data');
        images = await response.json();
    } catch(error) {
        console.error('Failed to fetch image data:', error);
    }
    renderImages(images);
}
fetchImageData();

export function filterImagesByCategory(category){
    if (images.length === 0) return; 

    if(category === 'all'){
        categorisedImages = images;
    } else {
        categorisedImages = images.filter(image => image.category === category);
    }
    renderImages(categorisedImages);
    return categorisedImages;
}

export function renderImages(imageArray) {
    if (!displayContainer) return;
    displayContainer.innerHTML = ''; 

    if (imageArray.length === 0) {
        displayContainer.innerHTML = '<p class="error-msg">No images found matching your criteria.</p>';
        return;
    }

    imageArray.forEach(img => {
        const figure = document.createElement('figure');
        figure.className = 'progressive-image';
        figure.innerHTML = `
            <img src="${img.thumb}" alt="${img.alt}" loading="lazy" data-full="${img.full}" class="thumbnail" tabindex="0" role="button">
            <figcaption>${img.alt}</figcaption>
        `;
        displayContainer.appendChild(figure);
    });
}


// EVENT LISTENERS
if (nav) {
    nav.addEventListener('click', (e) => {
        const btn = e.target.closest('.filter-btn');
        
        if (btn) {
            const selectedCategory = btn.dataset.category;
            
            filterImagesByCategory(selectedCategory);
        }
    });
}


//shows full image when image is pressed
if (displayContainer) {
    displayContainer.addEventListener('click', (e) => {
        const clickedImg = e.target.closest('img');
        
        if (clickedImg) {
            const fullSrc = clickedImg.dataset.full;

            const imageDisplayer = document.createElement('div');
            
            imageDisplayer.style.zIndex = "10";
            imageDisplayer.style.position = "fixed";
            imageDisplayer.style.top = "0";
            imageDisplayer.style.left = "0";
            imageDisplayer.style.width = "100%";
            imageDisplayer.style.height = "100%";
            imageDisplayer.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
            imageDisplayer.style.display = "flex";
            imageDisplayer.style.justifyContent = "center";
            imageDisplayer.style.alignItems = "center";
            imageDisplayer.innerHTML = `
                <img id="fullImage" src="${fullSrc}" alt="full image" style="max-width: 80%; max-height: 80%;" loading="eager">
            `;

            imageDisplayer.addEventListener('click', () => imageDisplayer.remove());

            document.body.appendChild(imageDisplayer);
        }
    });
}