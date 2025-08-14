import { POST_url } from "../connection/connection ";
import { apiService } from "./apiService"

export const greeting = async ( data)=>{ 
    console.log("greeting", data, POST_url.greeting)
    data = await apiService( { url:POST_url.greeting, method:"POST",data: data });
    console.log("greeting", data)
    return data.data;
    
}