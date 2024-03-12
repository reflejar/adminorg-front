import Cookies from 'js-cookie';

export const baseUrl = 'http://localhost:8000/'

export const initialHeaders = () => ({
    'Content-Type': 'application/json',
    'Authorization': 'Token ' + Cookies.get('token'),
})

