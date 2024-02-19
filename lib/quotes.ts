import axios from 'axios';

export const getQuoteOfTheDay = async () => {
  try {
    const response = await axios.get('https://api.quotable.io/random');
    return response.data;
  } catch (error) {
    console.error(error);
  }
};