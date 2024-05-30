import Cookies from 'js-cookie';

export const baseUrl = 'https://api.adminorg.reflej.ar/'

export const initialHeaders = () => ({
    'Content-Type': 'application/json',
    'Authorization': 'Token ' + Cookies.get('token'),
})


