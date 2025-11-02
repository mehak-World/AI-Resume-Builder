import { tempOptions } from "../../../utils.js/constants";
import { LayoutTemplateIcon } from "lucide-react";

const TemplateSelector = ({showTempMenu, setShowTempMenu, setTempIndex, setFormData}) => {
  return (
     <div className="relative">
                  <button
                    onClick={() => {
                      setShowTempMenu(!showTempMenu);
                    }}
                    className="cursor-pointer flex gap-2 bg-blue-100 items-center p-2 rounded-lg text-blue-700 text-sm"
                  >
                    {" "}
                    <LayoutTemplateIcon size={16} /> <p>Template</p>
                  </button>
                  {showTempMenu && (
                    <div className="absolute bg-white">
                      {tempOptions.map((temp_option, idx) => (
                        <div
                          onClick={() => {
                            setTempIndex(idx);
                            setShowTempMenu(false);
                            setFormData((prev) => ({
                              ...prev,
                              template: tempOptions[idx],
                            }));
                          }}
                          className="cursor-pointer p-3 bg-blue-100 rounded-lg m-2 hover:bg-blue-300"
                        >
                          {temp_option}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
  )
}

export default TemplateSelector
