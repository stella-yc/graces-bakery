import React from 'react';
import Nav from './nav';

const Jumbotron = () => {
  return (
    <div className="jumbotron">
      <h1 className="jumbotron-text">
        <span>Quality, baked goods
        <br />delivered to your doorstep</span>
        <div>
          <button><a href="#">Shop Now</a></button>
        </div>
      </h1>
      <img className="chevron" src="/img/chevron-down.png" />
    </div>
  );
};

const About = () => {
  return (
    <div className="about">
      <div className="about-text">
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
    </div>
  );
};

const Descriptor = (props) => {
  return (
    <div className="descriptor">
      <h1>What we do</h1>
      <div className="descriptor-container">
        <div className="descriptor-box">
          <i className="fa fa-laptop fa-3x" aria-hidden="true" />
          <p>Place orders online</p>
        </div>
        <div className="descriptor-box">
          <i className="fa fa-truck fa-3x" aria-hidden="true" />
          <p>Goods delivered directly to you.</p>
        </div>
        <div className="descriptor-box">
          <i className="fa fa-clock-o fa-3x" aria-hidden="true" />
          <p>Next-day delivery guaranteed.</p>
        </div>
      </div>
    </div>
  );
};

const Ingredients = () => {
  return (
    <div className="ingredients">
      <div className="ingred-text">
        <h1>The best ingredients</h1>
        <h3>All organic, fair-trade ingredients</h3>
          <button className="ingred-btn">
            <a href="#">
              Learn More
            </a>
          </button>
      </div>
    </div>
  );
};

/*** COMPONENT ***/
export const Home = () => {
  return (
    <div>
      <Jumbotron />
      <Descriptor />
      <Ingredients />
      <About />
    </div>
  );
};

export default Home;

