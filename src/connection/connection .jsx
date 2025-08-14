import { devUrl, baseUrl } from "../env/env.jsx";

export const POST_url = {
    greeting: devUrl + "greet",
    aiResponse: devUrl + "ask",
    userSession: devUrl + "get-user-session",
    userTicket: devUrl + "uset_ticket",
    userTicketStatus: devUrl + "get_user_ticket_status",
    login: baseUrl + "auth/login",
    logout: baseUrl + "auth/logout"

};

export const GET_url = {

};