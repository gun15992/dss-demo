// API URL URL Function
export const getApiUrl = () => {
    return import.meta.env.VITE_API_URL;
}

// Public URL Function
export const getPublicUrl = (path) => {
    return new URL(`/${path}`, import.meta.url).href;
};

// Image URL Function
export const getImageUrl = (path) => {
    return new URL(`/src/assets/icons/image/${path}`, import.meta.url).href;
};

// PDF URL Function
export const getPdfUrl = (path) => {
    return new URL(`/src/data/pdf/${path}`, import.meta.url).href;
};