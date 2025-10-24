import { ArrowDownLeftFromSquare, ArrowLeft, BookTemplate, DownloadCloud, EyeIcon, Folder, LayoutTemplateIcon, MoveLeft, MoveRight, Share2Icon, View, ViewIcon } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import PersonalInfo from "../components/PersonalInfo";
import ProfessionalSummary from "../components/ProfessionalSummary";
import ProfessionalExperience from "../components/ProfessionalExperience";
import ClassicTemplate from "../assets/templates/ClassicTemplate";
import Education from "../components/Education";
import Projects from "../components/Projects";
import Skills from "../components/Skills";
import MinimalTemplate from "../assets/templates/MinimalTemplate";
import ModernTemplate from "../assets/templates/ModernTemplate";
import MinimalImageTemplate from "../assets/templates/MinimalImageTemplate";

const ResumeBuilder = () => {
  const [formData, setFormData] = useState({
    personalInfo: {
      full_name: "",
      email: "",
      phone: "",
      location: "",
      linkedin: "",
      website: "",
      profession: "",
      image: "",
    },
    title: "",
    summary: "",
    education: [],
    experiences: [],
    public: "",
    skills: [],
    projects: []
  });

  const [activeIndex, setActiveIndex] = useState(0);

  const sections = [
    "Personal information",
    "Professional Summary",
    "Professional Experience",
    "Education",
    "Projects",
    "Skills",
  ];


  // Template index local state variable
  const [tempIndex, setTempIndex] = useState(0);
  const [showTempMenu, setShowTempMenu] = useState(false);
  const [showColorMenu, setShowColorMenu] = useState(false);
  const colorPallete = [
    "#3B82F6", "#6466f1", "#8b5cf6", "#0eb981", "#f97316", "#17b8a6", "#6b7280", "black"
  ]
  const [colorIdx, setColorIdx] = useState(colorPallete.length-1);

  const tempOptions = ["Classic", "Modern", "Minimal Image", "Minimal"]

  

  return (
    <div className="max-w-7xl mx-auto p-8">
      <div className="flex gap-10 flex-col lg:flex-row">
        {/* Builder left section */}

        <div>
          {/* Link to dashboard */}
          <div>
            <Link to="/app" className="text-slate-600 flex gap-3">
              <p>
                <ArrowLeft />
              </p>
              <p>Back to Dashboard</p>
            </Link>
          </div>

          <div className="transition-all duration-300 lg:w-[40vw] bg-white mt-5 rounded-lg">
            {/* Progress Bar */}
            <div className="transition-all duration-300 relative w-full h-1 bg-gray-300 rounded-lg">
              <div
                className="transition-all duration-700 ease-in absolute top-0 h-1 bg-green-600 left-0"
                style={{ width: `${activeIndex * 100 / (sections.length-1)}%` }}
              ></div>
            </div>

            {/* Buttons to change the template and accent, nav buttons */}

            <div className = "flex flex-col sm:flex-row justify-between p-3 items-center">
              <div className = "transition-all duration-300 flex gap-2 items-center">
                <div className="relative">
                      <button onClick = {() => setShowTempMenu(!showTempMenu)} className = "cursor-pointer flex gap-2 bg-blue-100 items-center p-2 rounded-lg text-blue-700 text-sm"> <LayoutTemplateIcon size = {16} /> <p>Template</p></button>
                      {showTempMenu && (
                        <div className = "absolute bg-white">
                            {tempOptions.map((temp_option, idx) => 
                            <div onClick = {() => {setTempIndex(idx); setShowTempMenu(false)}} className = "cursor-pointer p-3 bg-blue-100 rounded-lg m-2 hover:bg-blue-300">
                              {temp_option}
                              </div>)}
                        </div>
                      )}
                </div>
                
                      <div>
                         <button onClick = {() => setShowColorMenu(true)} className = "flex gap-2 bg-pink-100 items-center p-2 rounded-lg text-pink-700 text-sm"> <LayoutTemplateIcon size = {16} /> <p>Accent</p></button>
                           {showColorMenu && (
                        <div className = "absolute flex gap-2 flex-wrap bg-white max-w-[200px]">
                            {colorPallete.map((color, idx) => 
                            <div onClick = {() => {setColorIdx(idx); setShowColorMenu(false)}} className = {`rounded-full cursor-pointer p-3 h-10 w-10 m-2 hover:bg-blue-300`} style = {{backgroundColor: color}}>
                            </div>)}
                        </div>
                      )}
                      </div>
                 
              </div>



              {/* Buttons for navigation */}
              <div className = "flex gap-3 items-center text-slate-600">
                    <button className = "transition-all duration-300 p-2 rounded-lg cursor-pointer hover:text-black hover:bg-gray-100 text-md flex gap-2 text-sm items-center" onClick = {() => setActiveIndex(Math.max(0, activeIndex-1))} disabled = {activeIndex == 0}><MoveLeft size = {20}/> <p>Previous</p></button>
                    <button className = "transition-all duration-300 p-2 rounded-lg cursor-pointer hover:text-black hover:bg-gray-100 text-md flex gap-2 text-sm items-center" onClick = {() => setActiveIndex(Math.min(sections.length-1, activeIndex+1))} disabled = {activeIndex == sections.length-1}> <p>Next</p> <MoveRight size = {20}/> </button>
              </div>
            </div>

          {/* Display all sections */}
          <div className = "p-4">
             {activeIndex == 0 && <PersonalInfo data = {formData} setData = {setFormData}/>}
             {activeIndex == 1 && <ProfessionalSummary data = {formData} setData = {setFormData}/>}
             {activeIndex == 2 && <ProfessionalExperience data = {formData} setData = {setFormData}/>}
             {activeIndex == 3 && <Education data = {formData} setData = {setFormData}/>}
             {activeIndex == 4 && <Projects data = {formData} setData = {setFormData}/>}
             {activeIndex == 5 && <Skills data = {formData} setData = {setFormData}/>}
          </div>
           

          </div>
        </div>

        {/* Right preview section */}
        <div className = "flex-1">
          <div className = "flex justify-end text-sm mb-2 gap-2">
            <button className = "flex gap-2 items-center bg-blue-100 text-blue-700 p-2 rounded-lg"><Share2Icon size = {16}/>Share</button>
            <button className = "flex gap-2 items-center bg-pink-100 text-pink-700 p-2 rounded-lg"><EyeIcon size = {16}/>Public</button>
            <button className = "flex gap-2 items-center bg-green-200 text-green-700 p-2 rounded-lg"><DownloadCloud size = {16}/>Download</button>
          </div>
          {tempIndex == 0 && <ClassicTemplate data = {formData} accentColor = {colorPallete[colorIdx]} />}
          {tempIndex == 1 && <ModernTemplate data = {formData} accentColor = {colorPallete[colorIdx]} />}
          {tempIndex == 2 && <MinimalImageTemplate data = {formData} accentColor = {colorPallete[colorIdx]} />}
          {tempIndex == 3 && <MinimalTemplate data = {formData} accentColor = {colorPallete[colorIdx]} />}
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
