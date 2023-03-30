import { useState } from 'react';
import Link from 'next/link';
import MetaHead from '@/components/shared/meta-head';
import Title from '@/components/shared/title';
import { getData } from '@/helpers/fetch-data';
import Icon from '@/components/shared/icons';

function Business() {
  const [dataBusiness, setDataBusiness] = useState([]);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState('');
  const [sortBy, setSortBy] = useState('best_match');
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  // Fetch data by page
  const fetchData = async (pageNow) => {
    setLoading(true);
    try {
      // Get data from my server, not from https://api.yelp.com because CORS
      const result = await getData(location, sortBy, limit, pageNow);

      setDataBusiness(result);
    } catch (error) {
      alert(error?.message);
    } finally {
      setLoading(false);
    }
  };

  // Form submit
  const formSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    fetchData(1);
  };

  // Previous page
  const prevPage = () => {
    let pageNow = page - 1;
    setPage(pageNow);
    fetchData(pageNow);
  };

  // Next page
  const nextPage = () => {
    let pageNow = page + 1;
    setPage(pageNow);
    fetchData(pageNow);
  };

  // Option limit
  const optionLimit = () => {
    const optionLimit = [];
    for (let i = 1; i <= 50; i++) {
      optionLimit.push(i);
    }
    return optionLimit;
  };

  return (
    <>
      <MetaHead title="Business" description="Business" />
      <div className="card">
        <div className="card-header">
          <Title>Business</Title>
        </div>
        <div className="card-body">
          <form onSubmit={formSubmit}>
            <div className="row">
              <div className="col">
                <div className="mb-3">
                  <label htmlFor="location" className="form-label">
                    Location
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="location"
                    autoComplete="off"
                    onChange={(e) => setLocation(e.target.value)}
                    required
                  />
                  <div id="locationHelp" className="form-text">
                    <small>
                      Examples: "New York City", "NYC", "350 5th Ave, New York,
                      NY 10118".
                    </small>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col col-md-6">
                <div className="mb-3">
                  <label htmlFor="sort-by" className="form-label">
                    Sort By
                  </label>
                  <select
                    id="sort-by"
                    className="form-select"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="best_match">Best Match</option>
                    <option value="rating">Rating</option>
                    <option value="review_count">Review Count</option>
                    <option value="distance">Distance</option>
                  </select>
                </div>
              </div>
              <div className="col col-md-6">
                <div className="mb-3">
                  <label htmlFor="limit" className="form-label">
                    Limit
                  </label>
                  <select
                    id="limit"
                    className="form-select"
                    value={limit}
                    onChange={(e) => setLimit(e.target.value)}
                  >
                    {optionLimit().map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="d-grid gap-2">
              <button className="btn btn-primary" type="submit">
                Search
              </button>
            </div>
          </form>
        </div>
      </div>

      {loading && (
        <div className="alert alert-primary mt-3 text-center" role="alert">
          Loading...
        </div>
      )}

      {dataBusiness.length != 0 && !loading ? (
        <div className="mt-4">
          <h3 className="h5 m-0 p-0 mb-2 text-center">Result :</h3>
          {dataBusiness?.error ? (
            <div className="alert alert-danger" role="alert">
              {dataBusiness?.error?.description}
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-bordered text-nowrap">
                <thead className="bg-light">
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Status</th>
                    <th scope="col">Rating</th>
                    <th scope="col">Address</th>
                  </tr>
                </thead>
                <tbody>
                  {dataBusiness?.businesses?.map((item, i) => (
                    <tr key={i}>
                      <td>
                        <Link
                          href={`/business/${item.alias}`}
                          className="text-decoration-none"
                        >
                          {item?.name}
                        </Link>
                      </td>
                      <td>{item?.is_closed ? 'Closed' : 'Open'}</td>
                      <td>
                        {Icon('StarIcon', 'text-warning mb-1')}
                        {` ${item?.rating} / ${item?.review_count} Users`}
                      </td>
                      <td>
                        {item?.location?.display_address?.map(
                          (address) => `${address} `
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <nav>
                <ul className="pagination justify-content-center">
                  <li className={`page-item ${page == 1 ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={prevPage}>
                      <span>&laquo; Prev</span>
                    </button>
                  </li>
                  <li className="page-item disabled">
                    <button className="page-link">{`Page ${page}`}</button>
                  </li>
                  <li
                    className={`page-item ${
                      page == dataBusiness?.total ? 'disabled' : ''
                    }`}
                  >
                    <button className="page-link" onClick={nextPage}>
                      <span>Next &raquo;</span>
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          )}
        </div>
      ) : (
        ''
      )}
    </>
  );
}

export default Business;
