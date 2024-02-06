import React, { Component } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './App.css';

import HomeCircle from './img/Main-Page-Circle.png';
import HomeCoffee from './img/coffee.png';
import TimelineCoffee from './img/Timeline-Coffee.jpg';
import ResearchClock from './img/clockimg.png';
// import ResearchImage from './img/research-img.png';
// import CommandPrompt from './img/Main-Page-Command-Prompt.png';


export default class SimpleSlider extends Component {
  constructor(props) {
    super(props);
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.downloadResume = this.downloadResume.bind(this);
  }
  next() {
    this.slider.slickNext();
  }
  previous() {
    this.slider.slickPrev();
  }

  downloadResume() {
    // Function to trigger the resume download
    const link = document.createElement('a');
    link.href = 'Tran_Justine_2024.pdf';
    link.download = 'Tran_Justine_2024.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
              <div className="directory-listing">
                <span>{"Directory of C:\\Users\\Justine Tran\\RESEARCH>"}</span>
                <div className='researchButton'>
                  <span>{"01/12/2023 10:01 AM <FILE>"}</span>
                  <button id="ResearchButton" onClick={this.someFunction}>Evaluation Of HGBP WCET Analysis.txt</button>
                </div>
                <div className='researchButton1'>
                  <span>{"06/05/2023 08:02 AM <FILE>"}</span>
                  <button id="ResearchButton1" onClick={this.anotherFunction}>Optimizing WCET: ML Branch Prediction.txt</button>
                </div>
                <div className='researchclockimg'>
                  <img src={ResearchClock} alt="ResearchClock"/>
                </div>
              </div>
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
                <button id="resumeButton" onClick={this.downloadResume}>Resume PDF</button>
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
          <div style={{ borderTop: '8px solid #D9B9AC', width: '90%', margin: 'auto', marginTop:'40px' }}></div>
          <div className='TimelineAboutMe'>
            <h3><span>About Me</span></h3>
          </div>
          <div className='Timeline-Links'>
            <h3><a href="https://github.com/justinetrann">Github</a></h3>
            <h3><a href="https://www.linkedin.com/in/justine-tran/">Linkedin</a></h3>
            <h3><a href="https://docs.google.com/document/d/1rdYaZLt3fdBohS73TBhsXubA2c9VPYtzAWvS9d4hyfM/edit?usp=sharing">Portfolio</a></h3>
            <h3><a href="mailto:justinetran.091@outlook.com">Email</a></h3>
          </div>
          <div className="Timeline-Img">
            <img src={TimelineCoffee} alt="TimelineCoffee"/>
          </div>
          <div className="Timeline-Project">
            <h3><span>Projects</span></h3>
          </div>
        </div>
      </div>
    );
  }
}
