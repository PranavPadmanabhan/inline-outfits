import axios from "axios";

const Axios = axios.create({
    baseURL:process.env.NEXT_PUBLIC_API_URL,
    headers:{
        apikey:process.env.NEXT_PUBLIC_API_KEY
    }
})

export default Axios