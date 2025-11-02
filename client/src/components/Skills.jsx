import { useState } from "react";
import SectionHeading from "./SectionHeading";
import { PlusIcon } from "lucide-react";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";

const Skills = ({ data, setData }) => {
  const { user } = useUser();
  const [skills, setSkills] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const url = import.meta.env.VITE_BACKEND_URL;

  // State variable for skill input field
  const [skill, setSkill] = useState("");

  const addSkill = (s) => {
    if (s != "") {
      setData((prev) => ({
        ...prev,
        skills: [...prev.skills, s],
      }));
    }
  };

  const deleteSkill = (idx) => {
    setData((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill, i) => i !== idx),
    }));
  };

  const getSkillSugg = async () => {
    try {
      setIsLoading(true);
      let res = await axios.post(
        `${url}/ai/${user.id}/${data._id}/suggestSkills`,
        { resumeData: data }
      );
      console.log(typeof res.data);
      res = res.data.replace(/```json|```/g, "").trim();
      const skills = JSON.parse(res);
      setSkills(skills);
      setIsLoading(false);
    } catch (err) {
      console.log("An error occured");
    }
  };

  return (
    <div>
      <SectionHeading title="Skills" description="Add your skills" />

      <div className="flex justify-between items-center text-sm gap-2">
        <input
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
          placeholder="Type your skill"
          className="p-2 flex-1 rounded-lg focus:outline-none focus:border-2 focus:border-blue-500"
        />
        <button
          onClick={() => addSkill(skill)}
          className="p-2 rounded-lg flex gap-2 bg-blue-600 text-white items-center cursor-pointer"
        >
          <PlusIcon />
          Add
        </button>
      </div>

     <div className="m-2 flex gap-2 flex-wrap">
  {data.skills.map((skill, idx) => (
    <div
      key={idx}
      className="group flex items-center gap-2 bg-blue-100 text-blue-800 rounded-full px-4 py-2 text-sm shadow-sm hover:shadow-md transition-all"
    >
      <span>{skill}</span>
      <button
        onClick={() => deleteSkill(idx)}
        className="text-blue-600 group-hover:text-red-500 font-bold transition-colors px-1"
        aria-label={`Remove ${skill}`}
      >
        ×
      </button>
    </div>
  ))}
</div>


      <div className="flex flex-col gap-4 mt-6">
  {/* AI Suggest Button */}
  <button
    onClick={getSkillSugg}
    className="self-start cursor-pointer bg-yellow-200 hover:bg-yellow-400 transition text-yellow-900 font-medium text-sm rounded-md px-4 py-2 shadow-sm flex items-center gap-2"
  >
    ⚡ {isLoading ? "Generating..." : "Get AI Skill Suggestions"}
  </button>

  {/* Skill Tags Section */}
  <div className="flex flex-wrap gap-2">
    {skills.map((s) => (
      <span
        key={s}
        onClick = {() => addSkill(s)}
        className="bg-blue-100 text-blue-800 text-xs md:text-sm font-medium px-3 py-1 rounded-full border border-blue-200 shadow-sm hover:bg-blue-200 cursor-pointer transition"
      >
        {s}
      </span>
    ))}
  </div>
</div>

    </div> 
);
};

export default Skills;
