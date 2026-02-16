import axios from "axios";

const apiBackend = axios.create({
    baseURL: import.meta.env.VITE_API_URL_BASE,
    timeout: 5000,
    headers: {
    'Content-Type': 'application/json',
    },
});

//Serve para interceptar a requisição e injetar o token
apiBackend.interceptors.request.use((config) => {
    const token = localStorage.getItem('ssmup_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

//Serve para tratar o token que inspirou e forca o login do usario
apiBackend.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && (error.response.status === 403 || error.response.status === 401)) {
            localStorage.removeItem('ssmup_token');
            //window.location.href = '/login'; 
        }
        return Promise.reject(error);
    }
);

export default apiBackend;


//UTILIZAR ESSA VERSÃO QUANDO FOR SUBIR NO CLUSTER DO LACED
// import axios from "axios";

// const apiBackend = axios.create({
//   baseURL: '/v1/api',
//   timeout: 5000,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// export default apiBackend;
