import api from "../api/axios";


export const saveEmployeeLocationApi = (location) => {
  return api.post("/location-history", {
    latitude: location.latitude,
    longitude: location.longitude,
    accuracy: location.accuracy,
    speed: location.speed,
    heading: location.heading,
    timestamp: location.timestamp,
  });
};

export const getCompanyLatestLocationsApi = () =>
  api.get("/location-history/company/latest");