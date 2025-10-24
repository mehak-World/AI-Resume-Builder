import React from 'react'
import { Trash2Icon } from 'lucide-react'

const ProjectForm = ({project, onChange, onDelete, index}) => {

    const updateProj = (e) => {
        const key = e.target.name;
        const value = e.target.value;

        const updatedProject = {...project};

        updatedProject[key] = value;
        onChange(index, updatedProject)
    }
  return (
    <div>
         <div className="flex justify-between text-sm font-bold mb-4">
        <h2>Project #{index + 1}</h2>
        <Trash2Icon onClick = {() => onDelete(index)} className="text-red-700 cursor-pointer" size={16} />
      </div>


      <form className = "text-sm flex flex-col gap-2">
        <input onChange = {(e) => updateProj(e)} className=" p-2 focus:outline-none focus:border-2 focus:border-blue-500 focus:shadow-lg rounded-lg border border-gray-200" type = "text" value = {project.name} name = "name" placeholder = "Enter Project name"/>
        <input onChange = {(e) => updateProj(e)}  className=" p-2 focus:outline-none focus:border-2 focus:border-blue-500 focus:shadow-lg rounded-lg border border-gray-200" type = "text" value = {project.type} name = "type" placeholder = "Enter Project type"/>
        <textarea placeholder = "Enter Project Description" name = "description" onChange = {(e) => updateProj(e)}  className=" p-2 focus:outline-none focus:border-2 focus:border-blue-500 focus:shadow-lg rounded-lg border border-gray-200 resize-none">{project.description}</textarea>
      </form>
      
    </div>
  )
}

export default ProjectForm
