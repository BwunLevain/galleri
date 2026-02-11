// DOM
const displayContainer = document.querySelector('#display-container');

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
}
fetchImageData();

export function filterImagesByCategory(category){
    if(category == 'all'){
        categorisedImages = images;
    }else{
        categorisedImages = images.filter(image => image.category === category);
    }
}

//DOM


// EVENT LISTENERS

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