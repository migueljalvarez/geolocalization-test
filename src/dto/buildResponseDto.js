const buildAddressDto = (data, opt) => {
  let dto = {};
  switch (opt) {
    case 1:
      dto = {
        address: data.title,
        coordinates: {
          lat: data.position.lat,
          lng: data.position.lng,
        },
      };
      return dto;
    case 2:
      dto = {
        address: data.address.freeformAddress,
        coordinates: {
          lat: data.position.lat,
          lng: data.position.lon,
        },
      };
      return dto;
    default:
      break;
  }
};
const buildListAddressDto = async (data, opt) => {
  const items = opt === 1 ? "items" : "results";
  const result = await Promise.all(
    data[items].map((element) => buildAddressDto(element, opt))
  );
  return result;
};

export { buildListAddressDto };
