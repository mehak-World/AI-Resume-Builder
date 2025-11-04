import {
  ArrowLeft,
  EyeClosed,
  EyeIcon,
  MoveLeft,
  MoveRight,
  Share2Icon,
} from "lucide-react";
import { useState, useEffect } from "react";
import { sections } from "../../utils.js/constants";
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
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";
import { tempOptions, colorPallete } from "../../utils.js/constants";
import SuccessAlert from "../components/SuccessAlert";
import ErrorAlert from "../components/ErrorAlert";
import TemplateSelector from "../components/ResumeBuilder/TemplateSelector";
import ColorSelector from "../components/ResumeBuilder/ColorSelector";

const ResumeBuilder = () => {
  const navigate = useNavigate();
  const { isSignedIn, isLoaded, user } = useUser();
  const { resumeId } = useParams();
  const url = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    if (!isLoaded) return; //wait for the clerk to finish loading
    if (!isSignedIn) {
      navigate("/login");
    }
  }, [isLoaded, isSignedIn, navigate]);

  // I want to know if user is signed in or not
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
    public: false,
    skills: [],
    projects: [],
    template: "Classic",
    accent: "black",
  });

  // State variable to store save status
  const [isSaved, setIsSaved] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const getResumeData = async () => {
      const response = await axios.get(`${url}/resumes/${user.id}/${resumeId}`);
      console.log(response.data);
      const temp = response.data.template;
      setTempIndex(tempOptions.indexOf(temp));
      setColorIdx(colorPallete.indexOf(response.data.accent));

      if (response) {
        setFormData(response.data);
      }
    };
    getResumeData();
  }, [resumeId, user, isLoaded]);

  const handleShare = () => {
    const { origin, pathname } = window.location;

    // Remove "/app" from path if present
    const base = pathname.startsWith("/app") ? origin : origin; // origin stays same

    const shareUrl = `${origin.replace(/\/app$/, "")}/view/${resumeId}`;

    navigator.share({
      url: shareUrl,
      text: "My Resume",
    });
  };

  const saveData = async () => {
    try {
      const fd = new FormData();
      fd.append("data", JSON.stringify(formData));
      if (formData.personalInfo.image instanceof File) {
        fd.append("image", formData.personalInfo.image);
      }

      const res = await axios.post(
        `${url}/resumes/${user.id}/${resumeId}`,
        fd,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log(res.data);
      if (res) {
        setIsSaved(true);
      }
    } catch (err) {
      setIsSaved(false);
    } finally {
      setShowAlert(true);
    }
  };

  const [activeIndex, setActiveIndex] = useState(0);

  // Template index local state variable
  const [tempIndex, setTempIndex] = useState(0);
  const [showTempMenu, setShowTempMenu] = useState(false);
  const [showColorMenu, setShowColorMenu] = useState(false);
  const [colorIdx, setColorIdx] = useState(colorPallete.length - 1);

  return (
    <div className="max-w-7xl mx-auto p-8">
      {/* Alert */}
      <div className="flex justify-center fixed top-[2%] left-[40%]">
        {showAlert && (
          <div>
            {isSaved ? (
              <SuccessAlert
                text="Saved successfully"
                setShowAlert={setShowAlert}
              />
            ) : (
              <ErrorAlert
                text="Oops! An error occured"
                setShowAlert={setShowAlert}
              />
            )}
          </div>
        )}
      </div>

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
                style={{
                  width: `${(activeIndex * 100) / (sections.length - 1)}%`,
                }}
              ></div>
            </div>

            {/* Buttons to change the template and accent, nav buttons */}
            <div className="flex flex-col sm:flex-row justify-between p-3 items-center">
              <div className="transition-all duration-300 flex gap-2 items-center">
                <TemplateSelector
                  showTempMenu={showTempMenu}
                  setShowTempMenu={setShowTempMenu}
                  setTempIndex={setTempIndex}
                  setFormData={setFormData}
                />
                <ColorSelector
                  setShowColorMenu={setShowColorMenu}
                  showColorMenu={showColorMenu}
                  setColorIdx={setColorIdx}
                  setFormData={setFormData}
                />
              </div>

              {/* Buttons for navigation */}
              <div className="flex gap-3 items-center text-slate-600">
                <button
                  className="transition-all duration-300 p-2 rounded-lg cursor-pointer hover:text-black hover:bg-gray-100 text-md flex gap-2 text-sm items-center"
                  onClick={() => setActiveIndex(Math.max(0, activeIndex - 1))}
                  disabled={activeIndex == 0}
                >
                  <MoveLeft size={20} /> <p>Previous</p>
                </button>
                <button
                  className="transition-all duration-300 p-2 rounded-lg cursor-pointer hover:text-black hover:bg-gray-100 text-md flex gap-2 text-sm items-center"
                  onClick={() =>
                    setActiveIndex(
                      Math.min(sections.length - 1, activeIndex + 1)
                    )
                  }
                  disabled={activeIndex == sections.length - 1}
                >
                  {" "}
                  <p>Next</p> <MoveRight size={20} />{" "}
                </button>
              </div>
            </div>

            {/* Display all sections */}
            <div className="p-4">
              {activeIndex == 0 && (
                <PersonalInfo
                  data={formData}
                  setData={setFormData}
                  saveData={saveData}
                />
              )}
              {activeIndex == 1 && (
                <ProfessionalSummary
                  data={formData}
                  setData={setFormData}
                  saveData={saveData}
                />
              )}
              {activeIndex == 2 && (
                <ProfessionalExperience
                  data={formData}
                  setData={setFormData}
                  saveData={saveData}
                />
              )}
              {activeIndex == 3 && (
                <Education
                  data={formData}
                  setData={setFormData}
                  saveData={saveData}
                />
              )}
              {activeIndex == 4 && (
                <Projects
                  data={formData}
                  setData={setFormData}
                  saveData={saveData}
                />
              )}
              {activeIndex == 5 && (
                <Skills
                  data={formData}
                  setData={setFormData}
                  saveData={saveData}
                />
              )}
            </div>

            <button
              onClick={() => saveData()}
              className="bg-gradient-to-r m-4 from-green-100 to-green-200 text-green-700 cursor-pointer p-2 rounded-lg border border-green-400 text-sm mt-4"
            >
              Save Changes
            </button>
          </div>
        </div>

        {/* Right preview section */}
        <div className="flex-1">
          <div className="flex justify-end text-sm mb-2 gap-2">
            {formData.public && (
              <button
                onClick={handleShare}
                className="cursor-pointer flex gap-2 items-center bg-blue-100 text-blue-700 p-2 rounded-lg"
              >
                <Share2Icon size={16} />
                Share
              </button>
            )}
            <button
              onClick={() =>
                setFormData((prev) => ({ ...prev, public: !prev.public }))
              }
              className="cursor-pointer flex gap-2 items-center bg-pink-100 text-pink-700 p-2 rounded-lg"
            >
              {formData.public ? (
                <EyeIcon size={16} />
              ) : (
                <EyeClosed size={16} />
              )}
              {formData.public ? "Public" : "Private"}
            </button>
            {/* <button onClick = {downloadResume} className = "cursor-pointer flex gap-2 items-center bg-green-200 text-green-700 p-2 rounded-lg"><DownloadCloud size = {16}/>Download</button> */}
            <Link to={"/view/" + resumeId}>
              <button className="cursor-pointer flex gap-2 items-center bg-green-200 text-green-700 p-2 rounded-lg">
                View Resume
              </button>
            </Link>
          </div>
          <div>
            {console.log(tempIndex)}
            {tempIndex == 0 && (
              <ClassicTemplate
                data={formData}
                accentColor={colorPallete[colorIdx]}
              />
            )}
            {tempIndex == 1 && (
              <ModernTemplate
                data={formData}
                accentColor={colorPallete[colorIdx]}
              />
            )}
            {tempIndex == 2 && (
              <MinimalImageTemplate
                data={formData}
                accentColor={colorPallete[colorIdx]}
              />
            )}
            {tempIndex == 3 && (
              <MinimalTemplate
                data={formData}
                accentColor={colorPallete[colorIdx]}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
