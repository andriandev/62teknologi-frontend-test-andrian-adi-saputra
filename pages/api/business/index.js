import { getDataApi } from '@/helpers/fetch-data';

async function BusinessesAPI(req, res) {
  try {
    const location = req?.query?.location;
    const sortBy = req?.query?.sort_by;
    const limit = req?.query?.limit;
    const page = req?.query?.page;

    // Get data from https://api.yelp.com
    const result = await getDataApi(location, sortBy, limit, page);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ error: err?.message });
  }
}

export default BusinessesAPI;
