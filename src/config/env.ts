export const env = {
    apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
    enableAuth: process.env.NEXT_PUBLIC_ENABLE_AUTH === 'true',
};
