import React, { Component } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './App.css';

// Self Made Functions
import CommandPrompt from './components/cmdPrompt/cmdPrompt';
import CreateAreaSN from './components/stickyNotes/createArea';
import AutoProjectTimeLine from './components/autoProjectTimeline/autoProjectTimeline';

// Images
import HomeCircle from './img/Main-Page-Circle.png';
import HomeCoffee from './img/coffee.png';
import TimelineCoffee from './img/Timeline-Coffee.jpg';
import ResearchClock from './img/clockimg.png';
import ExtracurrImg from './img/extracurr img.png';
import ExtracurrCoffee from './img/extracurr-coffee.png';
import powerpoint from './img/example.pdf';

export default class SimpleSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      currentSlide: 0,
    };

    // Binding methods
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.downloadResume = this.downloadResume.bind(this);
    this.addNote = this.addNote.bind(this);
    this.deleteNote = this.deleteNote.bind(this);
  }

  next() {
    this.slider.slickNext();
  }

  previous() {
    this.slider.slickPrev();
  }

  downloadResume() {
    const link = document.createElement('a');
    link.href = 'Tran_Justine_2024.pdf';
    link.download = 'Tran_Justine_2024.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  addNote() {
    const newNote = {
      id: Math.random(), // Simple ID generation for example purposes
    };
    this.setState(prevState => ({
      notes: [...prevState.notes, newNote],
    }));
  }

  deleteNote(id) {
    this.setState(prevState => ({
      notes: prevState.notes.filter(note => note.id !== id),
    }));
  }

  render() {
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      initialSlide: 1,
      afterChange: current => this.setState({ currentSlide: current }), // Update current slide index
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
              <div className="CommandPrompt">
                  <CommandPrompt />
              </div>
              </div>
              <div className='ExtraCurrSlide' style={{ display: 'flex', alignItems: 'center' }}>
              <div>
                <h3><span>{"C:\\Users\\Justine Tran\\Extracurricular>"}</span></h3>
                <div className='ExtracurrCoffee'>
                  <img src={ExtracurrCoffee} alt="ExtracurrCoffee"/>
                </div>
                <div className='ExtracurrImg'>
                  <img src={ExtracurrImg} alt="ExtracurrImg"/>
                </div>
              </div>
              <div style={{ marginLeft: '30%', position: 'relative' }}>
              <iframe
                src={powerpoint}
                className="iframePresentation"
                title="Extracurricular Activities Presentation"
              ></iframe>
              <div className="iframeOverlay"></div>
              </div>
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
          <h3><a href="https://github.com/justinetrann" target="_blank" rel="noopener noreferrer">Github</a></h3>
          <h3><a href="https://www.linkedin.com/in/justine-tran/" target="_blank" rel="noopener noreferrer">Linkedin</a></h3>
          <h3><a href="https://docs.google.com/document/d/1rdYaZLt3fdBohS73TBhsXubA2c9VPYtzAWvS9d4hyfM/edit?usp=sharing" target="_blank" rel="noopener noreferrer">Portfolio</a></h3>
          <h3><a href="mailto:justinetran.091@outlook.com">Email</a></h3>
        </div>
          <div className="Timeline-Img">
            <img src={TimelineCoffee} alt="TimelineCoffee"/>
          </div>
          <div className="Timeline-Project">
            <h3><span>Projects</span></h3>
          </div>
        </div>
        <div className='container-icon'>
          <div className="stickyNote">
            <CreateAreaSN currentSlide={this.state.currentSlide} onAdd={this.addNote} />
          </div>
          <div className='timeline'>
            <AutoProjectTimeLine/>
          </div>
        </div>
      </div>
    );
  }
}
