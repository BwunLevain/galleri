/**
 * @param {Array} images - The full array of image objects
 * @param {string} category - The active category filter
 * @param {string} searchTerm - The text from the search input
 * @returns {Array} - The filtered results
 */
export function getFilteredImages(images, category, searchTerm) {
    const normalizedSearch = searchTerm.toLowerCase().trim();

    return images.filter(image => {
        const matchesCategory = (category === 'all' || image.category === category);
        
        const matchesTag = (normalizedSearch === "" || image.tags.some(tag => 
            tag.toLowerCase().includes(normalizedSearch)
        ));

        return matchesCategory && matchesTag;
    });
}