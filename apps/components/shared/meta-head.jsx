import Head from 'next/head';
import {
  siteBaseUrl,
  siteFaviconUrl,
  siteTitle,
  siteDescription,
  siteIndex,
} from '@/config/setting';

function MetaHead(props) {
  // Props variable
  const { title, description, index, canonical } = props;

  // Define variabel
  const baseUrl = siteBaseUrl();
  const faviconUrl = siteFaviconUrl();
  const faviconType = faviconUrl.split('.');

  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta
        name="robots"
        content={index == 'noindex' ? 'noindex, nofollow' : index}
      />
      <link rel="canonical" href={baseUrl + canonical} />
      <link
        rel="icon"
        type={`image/${faviconType[faviconType.length - 1]}`}
        href={faviconUrl.includes('http') ? faviconUrl : baseUrl + faviconUrl}
      />
    </Head>
  );
}

MetaHead.defaultProps = {
  title: siteTitle(),
  description: siteDescription(),
  index: siteIndex(),
  canonical: '/',
};

export default MetaHead;
