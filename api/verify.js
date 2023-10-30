import { BASE_URL } from "@env";
import axios from 'axios';
// const sendSmsVerification = async (phoneNumber) => {
//  try {
//    const data = JSON.stringify({
//      to: phoneNumber,
//      channel: "sms",
//    });

//    const response = await fetch(`${BASE_URL}/start-verify`, {
//      method: "POST",
//      headers: {
//        "Content-Type": "application/json",
//      },
//      body: data,
//    });

//    const json = await response.json();
//    return json.success;
//  } catch (error) {
//    console.error(error);
//    return false;
//  }
// };

// const checkVerification = async (phoneNumber, code) => {
//  try {
//    const data = JSON.stringify({
//      to: phoneNumber,
//      code,
//    });

//    const response = await fetch(`${BASE_URL}/check-verify`, {
//      method: "POST",
//      headers: {
//        "Content-Type": "application/json",
//      },
//      body: data,
//    });

//    const json = await response.json();
//    return json.success;
//  } catch (error) {
//    console.error(error);
//    return false;
//  }
// };

// module.exports = {
//  sendSmsVerification,
//  checkVerification,
// };
export const sendSmsVerification = async (phoneNumber) => {
  try {
    // Prepare the data to be sent in the request
    const data = {
      to: phoneNumber,
      channel: "sms",
    };

    // Make a POST request to the specified URL using Axios
    const url = BASE_URL + "/start-verify"
    console.log(url);
    const response = await axios.post(`${BASE_URL}/start-verify`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Access the response data
    const responseData = response.data;
    console.log(responseData,"Response data")
    // Return the 'success' property from the response data
    return responseData.success;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const checkVerification = async (phoneNumber, code) => {
  try {
    // Prepare the data to be sent in the request
    const data = {
      to: phoneNumber,
      code:code,
    };

    // Define the URL for the POST request
    const url = BASE_URL+"/check-verify"

    // Make a POST request to the specified URL using Axios
    const response = await axios.post(url, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response.data)
    // Access the response data
    const responseData = response.data;

    // Return the 'success' property from the response data
    return responseData.success;
  } catch (error) {
    console.error(error);
    return false;
  }
};