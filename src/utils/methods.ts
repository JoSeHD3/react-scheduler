export const getTodayDate = () => new Date().toISOString().split('T')[0];

export const generateRandomId = () => Date.now().toString(36).concat(Math.random().toString(36).substring(2));
