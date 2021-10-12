import axios from "axios";
import config from "../config/config";
import { buildListAddressDto } from "../dto/buildResponseDto";
const mainRequest = async (token, address) => {
  console.log("looking in the main option");
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const result = await axios({
    url: `https://geocode.search.hereapi.com/v1/geocode?q=${address}`,
    method: "GET",
    headers: headers,
  });
  if (result.status === 200) {
    const response = await buildListAddressDto(result.data, 1);
    return response;
  }
};

const secondRequest = async (address) => {
  console.log("looking at the second option");
  const result = await axios({
    url: `https://api.tomtom.com/search/2/geocode/${encodeURIComponent(
      address
    )}.json?key=${config.tomtomCredentials.key}`,
    method: "GET",
  });
  if (result.status === 200) {
    const response = await buildListAddressDto(result.data, 2);
    return response;
  }
};

const getCoordinates = async (hereToken, address) => {
  try {
    const opt1 = await mainRequest(hereToken, address);
    if (opt1.length > 0) {
      console.log("receiving results from the main option");
      return opt1;
    } else {
      const opt2 = await secondRequest(address);
      console.log("receiving results from the second option");
      return opt2;
    }
  } catch (error) {
    throw error
  }
};

export { getCoordinates };
