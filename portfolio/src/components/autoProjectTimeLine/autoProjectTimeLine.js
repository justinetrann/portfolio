import React, { useState } from 'react';
import './autoProjectTimeline.css';
import timeline from './img/timeline.png';

function AutoProjectTimeLine() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="icon-timeline-container"
         onMouseEnter={() => setIsHovered(true)}
         onMouseLeave={() => setIsHovered(false)}>
      {isHovered && <div className="tooltip">Add Project Timeline</div>}
      <div className="timeline-icon">
        <img src={timeline} alt="Timeline Icon"/>
      </div>
    </div>
  );
}

export default AutoProjectTimeLine;
