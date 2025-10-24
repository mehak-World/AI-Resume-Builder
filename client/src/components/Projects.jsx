import React from 'react'
import SectionHeading from './SectionHeading'
import { PlusIcon } from 'lucide-react'
import ProjectForm from './ProjectForm'

const Projects = ({data, setData}) => {
  const blankProject = {
    name: "",
    type: "",
    description: ""
  };

  const addProject = () => {
    setData((prev) => ({
      ...prev,
      projects: [ ...prev.projects, blankProject ],
    }));
  };

  const updateProject = (idx, updatedProject) => {
    setData((prev) => ({
      ...prev,
      projects: prev.projects.map((proj, i) => i != idx ? proj: updatedProject),
    }));
  };

  const deleteProject = (idx) => {
     setData((prev) => ({
      ...prev,
      projects: prev.projects.filter((proj, i) => i != idx),
    }));
  };

  return (
    <div>
       <div className="flex justify-between">
        <SectionHeading
          title="Projects"
          description="Add your Projects"
        />
        <div>
          <button
            onClick={addProject}
            className="bg-pink-100 hover:bg-pink-200 cursor-pointer text-pink-800 p-2 rounded-lg text-sm gap-3 flex items-center"
          >
            <PlusIcon />
            Add Project
          </button>
        </div>
      </div>

       {/* Render all educations */}
      <div>
        {data.projects.length == 0 ? (
          <div className="text-sm text-gray-600 p-2 border rounded-lg border-gray-200">
            <p>There are no projects.</p>
          </div>
        ) : (
          data?.projects?.map((proj, index) =>  (
              <ProjectForm
                project = {proj}
                onChange={updateProject}
                onDelete={deleteProject}
                index={index}
              />
            ))
        )}
      </div>
      <button className = "bg-gradient-to-r from-green-100 to-green-200 text-green-700 cursor-pointer p-2 rounded-lg border border-green-400 text-sm mt-4">Save Changes</button>

    </div>
  )
}

export default Projects
