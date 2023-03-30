import MetaHead from '@/components/shared/meta-head';
import Title from '@/components/shared/title';

function Home() {
  return (
    <>
      <MetaHead title="Home" />
      <div className="card">
        <div className="card-header">
          <Title>Home</Title>
        </div>
        <div className="card-body">
          Next js Bootstrap Template created by Andriandev
        </div>
      </div>
    </>
  );
}

export default Home;
