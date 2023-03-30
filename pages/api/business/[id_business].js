import { getDataApiById } from '@/helpers/fetch-data';

async function BusinessesAPI(req, res) {
  // Get id from url
  const { id_business } = req.query;

  try {
    // Get data from https://api.yelp.com
    const result = await getDataApiById(id_business);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ error: err?.message });
  }
}

export default BusinessesAPI;
