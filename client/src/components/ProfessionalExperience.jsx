import React from "react";
import SectionHeading from "./SectionHeading";
import { PlusIcon } from "lucide-react";
import ExperienceForm from "./ExperienceForm";

const ProfessionalExperience = ({ data, setData }) => {
  const blankExperience = {
    company: "",
    position: "",
    startDate: "",
    endDate: "",
    currentlyWorking: false,
    jobDescription: "",
  };

  const addExperience = () => {
    setData(prev => ({
      ...prev,
      experiences: [...prev.experiences, blankExperience],
    }));
  };

  const updateExperience = (index, updatedExp) => {
    setData(prev => ({
      ...prev,
      experiences: prev.experiences.map((exp, i) => i === index ? updatedExp : exp),
    }));
  };

  const deleteExperience = (index) => {
    setData(prev => ({
      ...prev,
      experiences: prev.experiences.filter((_, i) => i !== index),
    }));
  };

  return (
    <div>
      <div className="flex justify-between">
        <SectionHeading
          title="Professional Experience"
          description="Add your job experience"
        />
        <button
          onClick={addExperience}
          className="bg-pink-100 hover:bg-pink-200 cursor-pointer text-pink-800 p-1 mb-2 rounded-lg text-sm gap-3 flex items-center"
        >
          <PlusIcon />
          Add Experience
        </button>
      </div>

      {data.experiences.length === 0 ? (
        <div className="border border-gray-300 p-3 rounded-lg text-sm">
          There are no experiences
        </div>
      ) : (
        data.experiences.map((exp, index) => (
          <ExperienceForm
            key={index}
            experience={exp}
            index={index}
            onChange={updateExperience}
            onDelete={deleteExperience}
          />
        ))
      )}
       <button className = "bg-gradient-to-r from-green-100 to-green-200 text-green-700 cursor-pointer p-2 rounded-lg border border-green-400 text-sm mt-3">Save Changes</button>
    </div>
  );
};

export default ProfessionalExperience;
