import axios from "axios";

const apiBackend = axios.create({
    baseURL: 'http://localhost:8080/v1/api',
    timeout: 5000,
    headers: {
    'Content-Type': 'application/json',
    },
});

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
