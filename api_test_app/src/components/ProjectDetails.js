import React, {useState, useEffect} from "react";
import axios from "axios"

const ProjectDetails = props => {
  const [actions, setActions] = useState([])
  const projectId = props.match.params.id

  useEffect(() => {
    axios.get(`http://localhost:4000/api/projects/${projectId}/actions`)
      .then(res => setActions(res.data))
      .catch(err => console.log(err))
  }, [projectId])

  return (
    <div>
      {actions.map(action => <p>{action.description}</p>)}
    </div>
  )
}

export default ProjectDetails;