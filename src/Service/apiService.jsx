import React from 'react'

export const apiService = async ({
    url,
    method = "GET",
    data = null,
    headers = {},
    params = {},
}) => {
    try {
        // Build query params if provided (for GET or DELETE)
        const queryString = new URLSearchParams(params).toString();
        const fullUrl = queryString ? `${url}?${queryString}` : url;

        const options = {
            method,
            headers: {
                "Content-Type": "application/json",
                "ngrok-skip-browser-warning": "true",
                ...headers,


              
    

            },
        };

        if (data && method !== "GET" && method !== "DELETE") {
            options.body = JSON.stringify(data);
        }

        const response = await fetch(fullUrl, options);

        const contentType = response.headers.get("Content-Type");

        const isJson = contentType && contentType.includes("application/json");

        const responseData = isJson ? await response.json() : await response.text();

        if (!response.ok) {
            throw new Error(responseData?.message || "API Error");
        }

        return responseData;
    } catch (error) {
        console.error("API Service Error:", error.message);
        return { error: true, message: error.message };
    }
};



