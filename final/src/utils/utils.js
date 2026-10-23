export const generateDummyUUID = () =>
    'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, char => {
        const randValue = Math.random() * 16 | 0;
        const value = char === 'x' ? randValue : (randValue & 0x3 | 0x8);

        return value.toString(16); // Added 'return' here
    });

export const normalizePhone = (value) => {
    return value.replace(/[\s()-]/g, '');
}