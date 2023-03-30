import Link from 'next/link';
import { siteTitle } from '@/config/setting';

function Footer() {
  const currYear = new Date().getFullYear();

  return (
    <footer className="bg-light">
      <p className="text-center text-dark my-3">
        {`Copyright ©${currYear} `}
        <Link href="/" className="text-dark text-decoration-none">
          {siteTitle()}
        </Link>
      </p>
    </footer>
  );
}

export default Footer;
