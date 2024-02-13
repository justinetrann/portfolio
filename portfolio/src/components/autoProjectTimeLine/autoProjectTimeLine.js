import React, { useState } from 'react';
import './autoProjectTimeline.css';
import timeline from './img/timeline.png';

function AutoProjectTimeLine() {
  const [showForm, setShowForm] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [project, setProject] = useState({ title: '', content: '' });

  // Toggles the form display
  const toggleForm = () => setShowForm(!showForm);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProject((prevProject) => ({
      ...prevProject,
      [name]: value,
    }));
  };

  // Handles form submission
  const submitNote = (event) => {
    event.preventDefault();
    console.log('Project Added:', project);
    // Add project submission logic here
    setProject({ title: '', content: '' }); // Reset project state
    setShowForm(false); // Optionally hide form after submission
  };

  return (
    <div>
      <div className="icon-timeline-container"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={toggleForm}> {/* Added toggleForm on click */}
        {isHovered && <div className="tooltip">Add Project Timeline</div>}
        <div className="timeline-icon">
          <img src={timeline} alt="Timeline Icon"/>
        </div>
      </div>
      {showForm && (
        <form onSubmit={submitNote}>
          <input name="title" onChange={handleChange} value={project.title} placeholder="Project Title" />
          <textarea name="content" onChange={handleChange} value={project.content} placeholder="Project's URL here" rows="2" />
          <button type="submit">Add Project</button>
        </form>
      )}
    </div>
  );
}

export default AutoProjectTimeLine;
