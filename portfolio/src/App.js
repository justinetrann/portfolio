import React, { Component } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './App.css';

import HomeCircle from './img/Main-Page-Circle.png';
import HomeCoffee from './img/coffee.png';
// import CommandPrompt from './img/Main-Page-Command-Prompt.png';


export default class SimpleSlider extends Component {
  constructor(props) {
    super(props);
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
  }
  next() {
    this.slider.slickNext();
  }
  previous() {
    this.slider.slickPrev();
  }
  render() {
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      initialSlide: 1,
    };
    return (
      <div>
        <div className="SimpleSlider">
          <Slider ref={c => (this.slider = c)} {...settings}>
            <div className='ResearchSlide'>
              <h3><span>{"C:\\Users\\Justine Tran\\Research>dir"}</span></h3>
            </div>
            <div className='HomeSlide'>
              <h3><span>Justine Home</span></h3>
              <div className='HomeCircle'>
                <img src={HomeCircle} alt="JustineCircle"/>
              </div>
              <div className='HomeCoffee'>
                <img src={HomeCoffee} alt="HomeCoffee"/>
              </div>
              <div className='HomeButton'>
                <button id="resumeButton" onClick=''>Resume PDF</button>
                <button id="LearnAbtWebsite" onClick=''>Learn About Website</button>
              </div>
              </div>
            <div className='ExtraCurrSlide'>
              <h3><span>{"C:\\Users\\Justine Tran\\Extracurricular>"}</span></h3>
            </div>
          </Slider>
          <div style={{ textAlign: "center" }}>
          <div className='arrowButton'>
            <button className="button previous" onClick={this.previous}><i className="fas fa-chevron-left"></i></button>
            <button className="button next" onClick={this.next}><i className="fas fa-chevron-right"></i></button>
          </div>
          </div>
        </div>
        <div className="Timeline">
            {/* Content of the white page (if any) */}
        </div>
      </div>
    );
  }
}
