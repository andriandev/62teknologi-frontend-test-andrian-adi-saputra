import { siteBaseUrl } from '@/config/setting';

// Api url
const apiUrl = 'https://api.yelp.com/v3';

// Base url
const baseUrl = siteBaseUrl();

// Option request
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer Ubf1-f0uqsJUnssqPMGo-tiFeZTT85oFmKfznlPmjDtX8s83jYMoAb-ApuD63wgq6LDZNsUXG6gurZIVYaj2jzxJmmLdCdXbDqIHU_b6KiCEVi8v-YB0OSsW6MWaY3Yx',
  },
};

// Function get data from api
export async function getDataApi(location, sort, limit, page) {
  // Set offset
  const offset = (page - 1) * limit;

  // Set var data
  let data = null;

  try {
    // Make the HTTP Api request
    const items = await fetch(
      `${apiUrl}/businesses/search?location=${location}&sort_by=${sort}&limit=${limit}&offset=${offset}`,
      options
    );

    // Replace var data with items from api
    data = await items.json();
  } catch (error) {
    // Throw error message
    throw new Error(error?.message);
  }

  return data;
}

// Funtion get data from api by id
export async function getDataApiById(id) {
  // Set var data
  let data = null;

  try {
    // Make the HTTP Api request
    const items = await fetch(`${apiUrl}/businesses/${id}`, options);

    // Replace var data with items from api
    data = await items.json();
  } catch (error) {
    // Throw error message
    throw new Error(error?.message);
  }

  return data;
}

// Function get data from my server
export async function getData(location, sort, limit, page) {
  // Set var data
  let data = null;

  try {
    // Make the HTTP Api request
    const items = await fetch(
      `${baseUrl}/api/business?location=${location}&sort_by=${sort}&limit=${limit}&page=${page}`
    );

    // Replace var data with items from api
    data = await items.json();
  } catch (error) {
    // Throw error message
    throw new Error(error?.message);
  }

  return data;
}

// Function get data from my server by id
export async function getDataById(id) {
  // Set var data
  let data = null;

  try {
    // Make the HTTP Api request
    const items = await fetch(`${baseUrl}/api/business/${id}`);

    // Replace var data with items from api
    data = await items.json();
  } catch (error) {
    // Throw error message
    throw new Error(error?.message);
  }

  return data;
}
