import Axios from 'axios';

const instance = Axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com/'
});

instance.defaults.headers.common['Authorization'] = 'AUTH TOKEN FROM INSTANCE';

// Axios.interceptors.request.use(config => { ...

export default instance;