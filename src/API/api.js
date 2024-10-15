import { base_URL } from "./base_URL"
import { commonAPI } from "./commonAPI"

//register API
export const registerAPI = async (user) => {
    return await commonAPI('POST', `${base_URL}/user/register`, user, "")
}

//login API
export const loginAPI = async (user) => {
    return await commonAPI('POST', `${base_URL}/user/login`, user, "")
}

//add event
export const addEventAPI = async (body, header) => {
    return await commonAPI('POST', `${base_URL}/events/add`, body, header)
}

//get events
export const getAllEventAPI = async (header) => {
    return await commonAPI('GET', `${base_URL}/events`, "", header)
}

//delete events
export const deleteEventAPI = async (eventId, header) => {
    return await commonAPI('DELETE', `${base_URL}/event/remove/${eventId}`, {}, header)
}

//edit profile
export const editProfileAPI = async (reqbody, reqheader) => {
    return await commonAPI('PUT', `${base_URL}/user/edit`, reqbody, reqheader)
}

//edit event
export const editEventAPI = async (eventId, reqbody, reqheader) => {
    //eventid path parameter
    return await commonAPI('PUT', `${base_URL}/event/edit/${eventId}`,reqbody,reqheader)
}

//getEvent in user 
export const getUserEventAPI = async (searchkey, header) => {
    return await commonAPI('GET', `${base_URL}/view-events?search=${searchkey}`, "", header)
}

//get user details
export const getuserDetails=async(reqheader)=>{
    return await commonAPI('GET',`${base_URL}/user-profile`,"",reqheader)
}

//book event
export const bookevent=async(id,header)=>{
    return await commonAPI('GET',`${base_URL}/view-book/${id}`,"",header)
}

//booked event details
export const eventbooked=async(body,header)=>{
    return await commonAPI(`POST`,`${base_URL}/book`,body,header)
}

export const getuserBookings=async(header)=>{
    return await commonAPI('GET',`${base_URL}/view-bookings`,"",header)
}


export const adminviewbookings=async(searchkey,header)=>{
    return await commonAPI('GET',`${base_URL}/view-userBookings?search=${searchkey}`,"",header)
}

export const deleteadminEventAPI=async(id,header)=>{
    return await commonAPI('DELETE',`${base_URL}/book/delete/${id}`,{},header)
}

