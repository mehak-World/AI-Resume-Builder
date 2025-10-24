import {useState} from 'react'
import SectionHeading from './SectionHeading'
import { DeleteIcon, LucideDelete, PlusIcon } from 'lucide-react'

const Skills = ({data, setData}) => {
 
    // State variable for skill input field
    const [skill, setSkill] = useState("");

     const addSkill = () => {
        if(skill != ""){
            setData((prev) => ({
            ...prev,
            skills: [...prev.skills, skill]
        }))
        }
    }

    const deleteSkill = (idx) => {
          setData((prev) => ({
            ...prev,
            skills: prev.skills.filter((skill, i) => i !== idx)
        }))
    }

  return (
    <div>
      <SectionHeading title = "Skills" description = "Add your skills" />

      <div className = "flex justify-between items-center text-sm gap-2">
        <input value = {skill} onChange={(e) => setSkill(e.target.value)} placeholder = "Type your skill" className = "p-2 flex-1 rounded-lg focus:outline-none focus:border-2 focus:border-blue-500"/>
        <button onClick = {addSkill} className = "p-2 rounded-lg flex gap-2 bg-blue-600 text-white items-center cursor-pointer"><PlusIcon />Add</button>
      </div>

        <div className = "m-2 flex gap-3 flex-wrap">
        {data.skills.map((skill, idx) => <button className = "text-sm items-center flex gap-2 bg-blue-100 text-blue-800 rounded-full p-3">
                <p>{skill}</p>
                <LucideDelete size = {16} className = "cursor-pointer" onClick = {() => deleteSkill(idx)}/>
            </button>)}
        </div>
    

      <button className = "bg-gradient-to-r from-green-100 to-green-200 text-green-700 cursor-pointer p-2 rounded-lg border border-green-400 text-sm mt-3">Save Changes</button>
    </div>
  )
}

export default Skills
