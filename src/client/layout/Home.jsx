import PhoneImage from "./Phone.png";

import "./Home.scss";

export default function Home() {
  return (
    <>
      <div className='home'>
        <h1 className='main-title'>Welcome To My Connect Hub!!!</h1>
        <section className='main-image'>
          <img src={PhoneImage} alt='error loading phone image' />
        </section>
      </div>
    </>
  );
}
