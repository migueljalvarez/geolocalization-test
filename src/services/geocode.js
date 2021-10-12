import axios from "axios";
const mainRequest = async (token, address) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const result = await axios({
    url: `https://geocode.search.hereapi.com/v1/geocode?q=${address}`,
    method: "GET",
    headers: headers,
  });
  if (result.status === 200) {
    return result.data;
  }
};
const getCoordinates = async (hereToken, address) => {
  try {
    const opt1 = await mainRequest(hereToken, address);
    if (opt1.items.length > 0) {
      return opt1;
    } else {
      return "buscar en la segunda options";
    }
    
  } catch (error) {
    console.log(error);
  }
};

export { getCoordinates };
