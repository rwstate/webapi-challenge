import React, {useState, useEffect} from 'react';
import {Route, Link} from "react-router-dom";
import axios from 'axios';

import ProjectDetails from "./components/ProjectDetails.js"
import './App.css';

function App() {
  const [projects, setProjects] = useState([])

  useEffect(() => {
    axios.get('http://localhost:4000/api/projects/')
      .then(res => setProjects(res.data))
      .catch(err => console.log(err))
  }, [])

  return (
    <div className="App">
      {projects.map(project => <Link to={`/project/${project.id}`}>{project.name}</Link>)}
      <Route path="/project/:id" component={ProjectDetails} />
    </div>
  );
}

export default App;
