import axios from "axios"
export default () => {
    return axios.create({
        baseURL:'localhost:5000/api' 
    })
}