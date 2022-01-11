import moment from 'moment';
import 'moment-timezone';

/**
 * Helper function to log fetch details in development environments.
 * @param {number} page - The page number, where 1 has the most recent photo(s).
 * @param {number} numPerPage - The number of photos displayed per page.
 * @param {string} today - YYYY-MM-DD present day EST
 * @param {string} startDate - YYYY-MM-DD start of date range
 * @param {string} endDate - YYYY-MM-DD end of date range
 */
const logPageFetch = async function apiLogPageFetch(
  page,
  numPerPage,
  today,
  startDate,
  endDate
) {
  if (process.env.NODE_ENV === 'development') {
    const pageFetchDetails = {
      page,
      numPerPage,
      today,
      startDate,
      endDate,
    };
    // eslint-disable-next-line no-console
    console.log({ pageFetchDetails });
  }
};

/**
 *
 * @param {number} page - The page number, where 1 has the most recent photo(s).
 * @param {number} numPerPage - The number of photos displayed per page.
 * @returns {array} The collection of objects with each photo's (meta)data.
 */

const getPhotosService = async function apiGetPhotosService(page, numPerPage) {
  const date = new Date();
  const today = moment(date).tz('America/New_York').format('YYYY-MM-DD');

  const endDate = moment(today)
    .subtract((page - 1) * numPerPage, 'days')
    .format('YYYY-MM-DD');
  const startDate = moment(endDate)
    .subtract(numPerPage - 1, 'days')
    .format('YYYY-MM-DD');

  logPageFetch(page, numPerPage, today, startDate, endDate);

  try {
    const resp = await fetch(
      `${process.env.REACT_APP_API_URL}?api_key=${process.env.REACT_APP_API_KEY}&start_date=${startDate}&end_date=${endDate}`
    );
    if (resp.ok) {
      const data = await resp.json();
      return data;
    }
    throw new Error('Bad API response');
  } catch (error) {
    throw new Error('Bad API response');
  }
};

export default getPhotosService;
