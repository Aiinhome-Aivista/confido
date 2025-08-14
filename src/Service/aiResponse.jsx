import { POST_url } from "../connection/connection ";
import { apiService } from "./apiService";

export const aiResponse = async ( data)=>{ 
    console.log("greeting", data, POST_url.aiResponse)
    data = await apiService( { url:POST_url.aiResponse, method:"POST",data: data });
    console.log("greeting", data)
    return data.data;
    
}