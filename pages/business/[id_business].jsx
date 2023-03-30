import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import MetaHead from '@/components/shared/meta-head';
import { getDataById } from '@/helpers/fetch-data';
import Title from '@/components/shared/title';
import Icon from '@/components/shared/icons';

function DetailBusiness() {
  const [dataBusiness, setDataBusiness] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Fetch data by page
  const fetchData = async () => {
    setLoading(true);
    try {
      // Get data from my server, not from https://api.yelp.com because CORS
      const result = await getDataById(router.query.id_business);

      setDataBusiness(result);
    } catch (error) {
      alert(error?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (router.isReady) fetchData();
  }, [router.isReady]);

  if (loading) {
    return (
      <>
        <MetaHead title="Loading..." />
        <div className="alert alert-primary text-center" role="alert">
          Loading..
        </div>
      </>
    );
  }

  if (dataBusiness?.error) {
    return (
      <>
        <MetaHead title="Busines Not Found" />
        <div className="alert alert-danger" role="alert">
          {dataBusiness?.error?.description}
        </div>
      </>
    );
  }

  return (
    <>
      <MetaHead title={dataBusiness.name} />
      <div className="card">
        <div className="card-header">
          <Title>{dataBusiness.name}</Title>
        </div>
        <div className="card-body">
          <div className="row mb-4">
            <div className="col-sm-12 col-md-5 col-lg-3 text-center mb-3">
              <img
                src={dataBusiness?.image_url}
                alt={dataBusiness?.name}
                className="rounded img-fluid"
              />
            </div>
            <div className="col-sm-12 col-md-7 col-lg-9">
              <p className="m-0 p-1 border-top border-bottom">
                <b>Name</b> : {dataBusiness?.name}
              </p>

              <p className="m-0 p-1 border-bottom">
                <b>Phone</b> : {dataBusiness?.display_phone}
              </p>
              <p className="m-0 p-1 border-bottom">
                <b>Rating</b> : {Icon('StarIcon', 'text-warning mb-1')}
                {` ${dataBusiness?.rating} / ${dataBusiness?.review_count} Users`}
              </p>
              <p className="m-0 p-1 border-bottom">
                <b>Price</b> : {dataBusiness?.price}
              </p>
              <p className="m-0 p-1 border-bottom">
                <b>Status</b> : {dataBusiness?.is_closed ? 'Closed' : 'Open'}
              </p>
              <p className="m-0 p-1 border-bottom">
                <b>Transactions</b> :{' '}
                {dataBusiness?.transactions?.map((item, i) => `${item}, `)}
              </p>
              <p className="m-0 p-1 border-bottom">
                <b>Location</b> :{' '}
                {dataBusiness?.location?.display_address?.map(
                  (address) => `${address} `
                )}
              </p>
              <p className="m-0 p-1 border-bottom">
                <b>Maps</b> :{' '}
                <a
                  href={`https://maps.google.com/maps?q=${dataBusiness?.coordinates?.latitude},${dataBusiness?.coordinates?.longitude}`}
                  target="_blank"
                  className="text-decoration-none"
                >
                  Go to Maps
                </a>
              </p>
              <p className="m-0 p-1 border-top border-bottom">
                <b>Website</b> :{' '}
                <a
                  href={dataBusiness?.url}
                  target="_blank"
                  className="text-decoration-none"
                >
                  Go to Busines
                </a>
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <h3 className="h5 border-bottom">Slideshow Photos</h3>
              <div
                id="carouselExampleControls"
                className="carousel slide"
                data-bs-ride="carousel"
              >
                <div className="carousel-inner">
                  {dataBusiness?.photos?.length != 0 &&
                    dataBusiness?.photos?.map((photo, i) => (
                      <div
                        key={i}
                        className={`carousel-item ${i == 1 && 'active'}`}
                      >
                        <img
                          src={photo}
                          className="d-block w-100"
                          alt="Foto"
                          style={{ maxHeight: '500px', objectFit: 'cover' }}
                        />
                      </div>
                    ))}
                </div>
                <button
                  className="carousel-control-prev"
                  type="button"
                  data-bs-target="#carouselExampleControls"
                  data-bs-slide="prev"
                >
                  <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                  />
                  <span className="visually-hidden">Previous</span>
                </button>
                <button
                  className="carousel-control-next"
                  type="button"
                  data-bs-target="#carouselExampleControls"
                  data-bs-slide="next"
                >
                  <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                  />
                  <span className="visually-hidden">Next</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DetailBusiness;
