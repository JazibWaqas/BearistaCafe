import Header from '../components/Header';
import TopStrip from '../components/TopStrip';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <>
      <TopStrip />
      <Header />
      <div className="body_text">
        Your reason<br />
        to get out<br />
        of bed<br />
        today!
      </div>
      <Footer />
    </>
  );
}