import Header from '../components/Header';
import TopStrip from '../components/TopStrip';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="home-page">
      <TopStrip />
      <Header />
      <div className="body_text">
        Your reason<br />
        to get out<br />
        of bed<br />
        today!
      </div>
      <Footer />
    </div>
  );
}