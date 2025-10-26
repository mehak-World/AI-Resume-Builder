import React from "react";
import {
  UserIcon,
  MailIcon,
  PhoneIcon,
  MapPinIcon,
  LinkedinIcon,
  GlobeIcon,
  BriefcaseIcon,
  Image as ImageIcon,
  Trash2Icon,
} from "lucide-react";
import SectionHeading from "./SectionHeading";

const PersonalInfo = ({ data, setData }) => {
  const fields = [
    { key: "full_name", title: "Full Name", type: "text", icon: UserIcon },
    { key: "email", title: "Email", type: "email", icon: MailIcon },
    { key: "phone", title: "Phone", type: "tel", icon: PhoneIcon },
    { key: "location", title: "Location", type: "text", icon: MapPinIcon },
    { key: "linkedin", title: "LinkedIn", type: "url", icon: LinkedinIcon },
    { key: "website", title: "Website", type: "url", icon: GlobeIcon },
    { key: "profession", title: "Profession", type: "text", icon: BriefcaseIcon },
  ];

  const profileImage = data.personalInfo?.image;

  // Handle input changes
  const handleChange = (e, key) => {
    setData((prev) => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [key]: e.target.value,
      },
    }));
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setData((prev) => ({
        ...prev,
        personalInfo: {
          ...prev.personalInfo,
          image: file,
        },
      }));
    }
  };

  // Handle image removal
  const handleImageRemove = () => {
    setData((prev) => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        image: undefined,
      },
    }));
  };

  return (
    <div className="text-sm">
      <SectionHeading
        title="Personal Information"
        description="Enter your personal details below."
      />

      <form content-type = "multipart/form-data" className="flex flex-col gap-4 p-4">
        {/* Profile Image Upload */}
        <div className="mb-3 flex flex-col gap-2">
          {!profileImage ? (
            <div>
              <label
                htmlFor="image"
                className="flex gap-2 cursor-pointer items-center hover:bg-gray-100 p-3 rounded-lg border border-gray-300 text-gray-700"
              >
                <UserIcon className="w-5 h-5 text-gray-600" />
                Upload Profile Picture
              </label>
              <input
                type="file"
                id="image"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </div>
          ) : (
            <div className="flex items-center gap-3">
              {/* Image preview */}
              <img
                src={URL.createObjectURL(profileImage)}
                alt="Profile"
                className="w-16 h-16 rounded-full object-cover border border-gray-300"
              />
              <div className="flex flex-col">
                <p className="text-gray-700">{profileImage.name}</p>
                <button
                  type="button"
                  onClick={handleImageRemove}
                  className="flex items-center gap-1 text-pink-700 hover:text-pink-900 text-sm mt-1"
                >
                  <Trash2Icon size={14} />
                  Remove
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Input Fields */}
        {fields.map((field) => {
          const Icon = field.icon;
          return (
            <div key={field.key} className="flex flex-col gap-1">
              <label
                htmlFor={field.key}
                className="flex items-center gap-2 text-slate-700 font-medium"
              >
                <Icon className="w-4 h-4 text-slate-600" />
                {field.title}
              </label>

              <input
                id={field.key}
                type={field.type}
                name={field.key}
                value={data.personalInfo?.[field.key] || ""}
                onChange={(e) => handleChange(e, field.key)}
                className="focus:border-blue-600 focus:outline-none border border-slate-300 rounded-md px-3 py-2 transition-all duration-200"
              />
            </div>
          );
        })}

      
      </form>
    </div>
  );
};

export default PersonalInfo;
