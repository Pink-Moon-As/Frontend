import { BASE_URL } from "@env";
import axios from 'axios';

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