import Cookies from 'js-cookie';

export const baseUrl = process.env.NEXT_PUBLIC_API_URL

export const initialHeaders = () => ({
    'Content-Type': 'application/json',
    'Authorization': 'Token ' + Cookies.get('token'),
})


