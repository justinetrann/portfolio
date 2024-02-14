import React, { useState } from 'react';
import './autoProjectTimeline.css';
import timeline from './img/timeline.png';

function AutoProjectTimeLine() {
  const [showForm, setShowForm] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [project, setProject] = useState({ title: '', content: '', URL: '' });
  const [projects, setProjects] = useState([]);

  const toggleForm = () => setShowForm(!showForm);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProject((prevProject) => ({
      ...prevProject,
      [name]: value,
    }));
  };

  const submitNote = (event) => {
    event.preventDefault();
    setProjects([...projects, project]);
    setProject({ title: '', content: '', URL: '' }); // Reset form
    setShowForm(false); // Hide form
  };

  return (
    <div>
      <div className="icon-timeline-container"
           onMouseEnter={() => setIsHovered(true)}
           onMouseLeave={() => setIsHovered(false)}
           onClick={toggleForm}>
        {isHovered && <div className="tooltip">Add Project Timeline</div>}
        <div className="timeline-icon">
          <img src={timeline} alt="Timeline Icon"/>
        </div>
      </div>
      {showForm && (
        <form onSubmit={submitNote}>
          <input name="title" onChange={handleChange} value={project.title} placeholder="Project Title" />
          <textarea name="content" onChange={handleChange} value={project.content} placeholder="Describe Your Project Here (max 500 characters)" rows="3" maxLength="500"/>
          <textarea name="URL" onChange={handleChange} value={project.URL} placeholder="Paste Project URL Here" rows="1" />
          <button type="submit">Add Project</button>
        </form>
      )}
      {projects.map((project, index) => (
        <div key={index} className="project-timeline">
          <div className="timeline-vertical"></div>
          <div className={index % 2 === 0 ? "timeline-horizontal-left" : "timeline-horizontal-right"}>
            <span>{project.title}: {project.content} - {project.URL}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AutoProjectTimeLine;
