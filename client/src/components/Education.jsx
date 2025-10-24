import React from "react";
import SectionHeading from "./SectionHeading";
import { PlusIcon } from "lucide-react";
import EducationForm from "./EducationForm";

const Education = ({ data, setData }) => {
  const blankEducation = {
    institution: "",
    degree: "",
    field: "",
    graduationDate: "",
    gpa: "",
  };

  const addEducation = () => {
    setData((prev) => ({
      ...prev,
      education: [ ...prev.education, blankEducation ],
    }));
  };

  const updateEducation = (idx, updatedEdu) => {
    setData((prev) => ({
      ...prev,
      education: prev.education.map((edu, i) => i != idx ? edu: updatedEdu),
    }));
  };

  const deleteEducation = (idx) => {
     setData((prev) => ({
      ...prev,
      education: prev.education.filter((edu, i) => i != idx),
    }));
  };

  return (
    <div>
      {/* Section header and add education button */}
      <div className="flex justify-between">
        <SectionHeading
          title="Education"
          description="Add your Education Details"
        />
        <div>
          <button
            onClick={addEducation}
            className="bg-pink-100 hover:bg-pink-200 cursor-pointer text-pink-800 p-2 rounded-lg text-sm gap-3 flex items-center"
          >
            <PlusIcon />
            Add Education
          </button>
        </div>
      </div>

      {/* Render all educations */}
      <div>
        {data.education.length == 0 ? (
          <div className="text-sm text-gray-600 p-2 border rounded-lg border-gray-200">
            <p>There is no education to show</p>
          </div>
        ) : (
          data?.education?.map((edu, index) =>  (
              <EducationForm
                education={edu}
                onChange={updateEducation}
                onDelete={deleteEducation}
                index={index}
              />
            ))
        )}
      </div>
      <button className = "bg-gradient-to-r from-green-100 to-green-200 text-green-700 cursor-pointer p-2 rounded-lg border border-green-400 text-sm mt-4">Save Changes</button>
    </div>
  );
};

export default Education;
