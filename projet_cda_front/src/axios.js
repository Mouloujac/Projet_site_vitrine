import Axios from 'axios'
console.log(process.env.REACT_APP_API_URL)

const axios = Axios.create({
    baseURL: 'http://localhost/',
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Acces-Control-Allow-Origin': 'http://localhost:80',
        'Acces-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        'Acces-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
        'Content-Type': 'application/json',
    },
    withCredentials: true,
})

export default axios