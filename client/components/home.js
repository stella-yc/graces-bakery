import React from 'react';
import Nav from './nav';

const Jumbotron = () => {
  return (
    <div className="jumbotron">
      <h2 className="jumbotron-text">
        <span>Quality baked goods
        <br />delivered to your doorstep</span>
      </h2>
      <img className="chevron" src="/img/chevron-down.png" />
    </div>
  );
};

const About = () => {
  return (
    <div className="about">
      <h2>
        About
      </h2>
      <p>
        Founded in 2017, Grace's Bakery is dedicated to making fresh, delicious baked goods for all occasions.
      </p>
      <p>
        We take pride in offering customers an unparalleled experience, whether they are visiting one of our storefronts or browsing from the comfort of their mobile devices.
      </p>
    </div>

  );
};

/*** COMPONENT ***/
export const Home = () => {
  return (
    <div>
      <Jumbotron />
      <About />
      <div className="about-img">
        <img src="/img/henry-chuy.jpg" />
      </div>
    </div>
  );
};

export default Home;

