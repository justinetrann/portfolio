import React, { useState, useEffect } from 'react';
import './autoProjectTimeline.css';
import timeline from './img/timeline.png';
import chipmunk from './img/chipmunk.png';
import nut from './img/nut.png';
// Firebase imports
import { db } from './firebase-config'; // Adjust the path as necessary
import { collection, addDoc, getDocs } from 'firebase/firestore';

function AutoProjectTimeLine() {
  const [showForm, setShowForm] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [project, setProject] = useState({ title: '', content: '', URL: '', startDate: '', endDate: '' });
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProject((prevProject) => ({
      ...prevProject,
      [name]: value,
    }));
  };

  const submitNote = async (event) => {
    event.preventDefault();
    const newProject = {...project, visible: Math.random() < 0.5};
    try {
      const docRef = await addDoc(collection(db, "projects"), newProject);
      console.log("Document written with ID: ", docRef.id);
      fetchProjects(); // Refresh projects after adding
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    // Reset form, including startDate and endDate
    setProject({ title: '', content: '', URL: '', startDate: '', endDate: '' });
    setShowForm(false);
  };

  const fetchProjects = async () => {
    const querySnapshot = await getDocs(collection(db, "projects"));
    const items = [];
    querySnapshot.forEach((doc) => {
      items.push({ ...doc.data(), id: doc.id });
    });
    setProjects(items);
  };

  const handleClick = () => {
    const username = prompt("Please enter Admin username:");
    const password = prompt("Please enter Admin password:");
    if (username === "admin" && password === "makeproject") {
      setShowForm(true);
    } else {
      alert("Access denied. Incorrect username or password.");
    }
  };

  return (
    <div>
      <div className="icon-timeline-container"
           onMouseEnter={() => setIsHovered(true)}
           onMouseLeave={() => setIsHovered(false)}
           onClick={handleClick}>
        {isHovered && <div className="tooltip">Add Project Timeline</div>}
        <div className="timeline-icon">
          <img src={timeline} alt="Timeline Icon"/>
        </div>
      </div>
      {showForm && (
        <div className="form-overlay">
          <div className="form-container">
            <form onSubmit={submitNote}>
              <input name="title" onChange={handleChange} value={project.title} placeholder="Project Title" />
              <input name="startDate" type="date" onChange={handleChange} value={project.startDate} placeholder="Start Date"/>
              <input name="endDate" type="date" onChange={handleChange} value={project.endDate} placeholder="End Date"/>
              <textarea name="content" onChange={handleChange} value={project.content} placeholder="Describe Your Project Here (max 500 characters)" rows="3" maxLength="500"/>
              <textarea name="URL" onChange={handleChange} value={project.URL} placeholder="Paste Project URL Here" rows="1" />
              <button type="submit">Add Project</button>
            </form>
          </div>
        </div>
      )}
      {projects.map((project, index) => (
        <div key={project.id} className="project-timeline">
          <div className="timeline-vertical"></div>
          <div className={index % 2 === 0 ? "timeline-horizontal-left" : "timeline-horizontal-right"}>
            {index % 2 === 0 ? (
              <>
                <span className="project-date-left">{project.startDate} - {project.endDate}</span>
                <img src={chipmunk} alt="Chipmunk" style={{ position: 'absolute', right: '50%', top: '50%', transform: 'translateY(-50%) translateY(-10px)', width: '40px', height: '40px', visibility: project.visible ? 'visible' : 'hidden' }} />
              </>
            ) : (
              <>
                <img src={nut} alt="Nut" style={{ position: 'absolute', left: '50%', top: '-20%', transform: 'translateY(-50%) translateY(-10px)', width: '20px', height: '20px', visibility: project.visible ? 'visible' : 'hidden' }} />
                <span className="project-date-right">{project.startDate} - {project.endDate}</span>
              </>
            )}
            <span>{project.title} : {project.content} </span>
            <a href={project.URL} target="_blank" rel="noopener noreferrer" className="about-project-button">About Project</a>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AutoProjectTimeLine;
