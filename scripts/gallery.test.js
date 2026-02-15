import { getFilteredImages } from './logic.js';     

const mockImages = [
    { category: 'fish', tags: ['Salmon', 'Pink'], alt: 'A salmon' },
    { category: 'birds', tags: ['Eagle', 'Hunter'], alt: 'An eagle' }
];

    test('filters by category correctly', () => {
        const result = getFilteredImages(mockImages, 'fish', '');
        expect(result.length).toBe(1);
        expect(result[0].category).toBe('fish');
    });

    test('filters by search tag correctly', () => {
        const result = getFilteredImages(mockImages, 'all', 'Eagle');
        expect(result[0].alt).toBe('An eagle');
    });             