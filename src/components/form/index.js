import React, { useState, useEffect} from 'react';
import axios from 'axios'; // Import Axios
import './index.css'
const FacultyUpdateForm = ({ user }) => {
  console.log(user, 'user')
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [position, setPosition] = useState(user.position);
  const [contact, setContact] = useState(user.contact);
  const [educationList, setEducationList] = useState(user.education || []);
  const [publicationList, setPublicationList] = useState(user.publications || []);
  const [areasOfInterest, setAreasOfInterest] = useState(user.areasOfInterest || null)
  const [projects, setProjects] = useState(user.projects || [])
  const [year, setJoinYear] = useState(user.year || '')
  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email)
      if(user.position) setPosition(user.position)
      if(user.contact) setContact(user.contact)
      if(user.education) setEducationList(user.education)
      if(user.publications) setPublicationList(user.publications)
      
    }
  }, [user]);
  const handleAreasChange = (value) => {
    setAreasOfInterest(value);
  };
  const handleEducationChange = (index, field, value) => {
    const updatedEducationList = [...educationList];
    updatedEducationList[index][field] = value;
    setEducationList(updatedEducationList);
  };
  const handleProjectChange = (index, field, value)=>{
    const updatedProjectList = [...projects]
    updatedProjectList[index][field] = value
    setProjects(updatedProjectList)
  }

  const handlePublicationChange = (index, field, value) => {
    const updatedPublicationList = [...publicationList];
    updatedPublicationList[index][field] = value;
    setPublicationList(updatedPublicationList);
  };

  const handleAddEducation = () => {
    setEducationList([...educationList, { institute: '', start: '', end: '', degree: '', remarks: '' }]);
  };
  const handleAddProject = ()=>{
    setProjects([...projects, {title: '', role : '', duration: '', status : '', sponsoredBy: ''}])
  }
  const handleAddPublication = () => {
    setPublicationList([...publicationList, { title: '', date: '', remarks: '' }]);
  };
  const [course, setCourse] = useState('');
  const [coursesList, setCoursesList] = useState(user?.coursesList || []);

  const handleAddCourse = () => {
    if (course.trim() !== '') {
      setCoursesList([...coursesList, course]);
      setCourse(''); // Clear the input field
    }
  };

  const handleRemoveCourse = (index) => {
    const updatedCourses = [...coursesList];
    updatedCourses.splice(index, 1);
    setCoursesList(updatedCourses);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    // Create an object with the updated details
    const updatedDetails = {
      name,
      email,
      position,
      contact,
      education: educationList,
      publications: publicationList,
    };

    // Send a POST request to update the details
    axios.post('/api/update-faculty', updatedDetails)
      .then((response) => {
        console.log('Details updated successfully:', response.data);
        // Handle success feedback or redirection
      })
      .catch((error) => {
        console.error('Error updating details:', error);
      });
  };

  return (
    <div>
      <h2>Update Details</h2>
      <form onSubmit={handleUpdate}>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />

        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

        <label>Position:</label>
        <select value={position} onChange={(e) => setPosition(e.target.value)}>
          <option value="Professor">Professor</option>
          <option value="Associate Professor">Associate Professor</option>
          <option value="Assistant Professor">Assistant Professor</option>
        </select>

        <label>Contact:</label>
        <input type="text" value={contact} onChange={(e) => setContact(e.target.value)} />

        <h3>Education:</h3>
        {educationList.map((education, index) => (
          
          <div key={index}>
            <div><h2>{`Education ${index + 1}`}</h2> </div>
            <input
              type="text"
              value={education.institute}
              onChange={(e) => handleEducationChange(index, 'institute', e.target.value)}
              placeholder="Institute"
            />
            <input type='text' value = {education.degree} onChange={(e)=>handleEducationChange(index, 'degree', e.target.value)}
            placeholder='Degree'/>
            <input type='text' value={education.start} onChange={(e)=>handleEducationChange(index, 'start', e.target.value)} placeholder='Start'/>
            <input type='text' value={education.end} onChange={(e)=>handleEducationChange(index, 'end', e.target.value)} placeholder='Start'/>
            <input type='textarea' value={education.remarks} onChange={(e)=>handleEducationChange(index, 'remarks', e.target.value)}
            placeholder='Achievments'/>
            {/* ... other education fields */}
          </div>
        ))}
        <button type="button" onClick={handleAddEducation}>Add Education</button>
        
        <h3>Projects:</h3>
        {projects.map((project, index) => (
          
          <div key={index}>
            <div><h2>{`Project ${index + 1}`}</h2> </div>
            <input
              type="text"
              value={project.title}
              onChange={(e) => handleProjectChange(index, 'title', e.target.value)}
              placeholder="Title"
            />
            <input type='text' value = {project.sponsoredBy} onChange={(e)=>handleProjectChange(index, 'sponsoredBy', e.target.value)}
            placeholder='SponsoredBy'/>
            <input type='text' value={project.role} onChange={(e)=>handleProjectChange(index, 'role', e.target.value)} placeholder='Role'/>
            <input type='text' value={project.duration} onChange={(e)=>handleProjectChange(index, 'duration', e.target.value)} placeholder='Duration'/>
            <label>Position:</label>
          <select value={project.status} onChange={(e) => handleProjectChange(index, 'status',e.target.value)}>
            <option value="running">Running</option>
            <option value="completed">Completed</option>
          </select>
            {/* ... other education fields */}
          </div>
        ))}
        <button type="button" onClick={handleAddProject}>Add</button>


        <h3>Publications:</h3>
        {publicationList.map((publication, index) => (
          <div key={index}>
            <input
              type="text"
              value={publication.title}
              onChange={(e) => handlePublicationChange(index, 'title', e.target.value)}
              placeholder="Title"
            />
            {/* ... other publication fields */}
          </div>
        ))}
        <button type="button" onClick={handleAddPublication}>Add Publication</button>
      
        <div>
          <label>Areas of Interest:</label>
          <textarea
            rows="3"
            value={areasOfInterest}
            onChange={(e) => handleAreasChange(e.target.value)}
          />
        </div>

        <div>
      <h2>Courses Taught</h2>
      <div>
        <label>Enter Course:</label>
        <input
          type="text"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
        />
        <button type="button" onClick={handleAddCourse}>Add Course</button>
      </div>
      <ul>
        {coursesList.map((course, index) => (
          <li key={index}>
            {course}
            <button type="button" onClick={() => handleRemoveCourse(index)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>

    <label>Joined Year:</label>
        <input type="text" value={year} onChange={(e) => setJoinYear(e.target.value)} />

        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default FacultyUpdateForm;
