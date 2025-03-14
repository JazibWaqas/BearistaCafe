import Header from '../components/Header';
import TopStrip from '../components/TopStrip';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="home-page container-fluid">
      <Header />
      <TopStrip />
      <div className="row align-items-center justify-content-start text-left">
        <div className="col-md-6">
          <h1 className="body_text">Your reason<br />to get out<br />of bed<br />today!</h1>
        </div>
      </div>
      <Footer />
    </div>
  );
}
