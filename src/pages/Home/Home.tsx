import HeroImage from 'assets/hero.png';
import './Home.scss';

const Home = () => {
  return (
    <section className="hero">
      <div className="hero__image">
        <img src={HeroImage} alt="background"></img>
      </div>
      <div className="hero__about">
        <h1>More than just shorter links</h1>
        <p>
          Build your brand's recognition and get detailed insights on how your
          links are performing
        </p>
      </div>
    </section>
  );
};

export default Home;
