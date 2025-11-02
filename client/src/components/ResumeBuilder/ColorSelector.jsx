import { colorPallete } from "../../../utils.js/constants";
import { LayoutTemplateIcon } from "lucide-react";

const ColorSelector = ({setShowColorMenu, showColorMenu, setColorIdx, setFormData}) => {
  return (
       <div>
                  <button
                    onClick={() => setShowColorMenu(true)}
                    className="flex gap-2 bg-pink-100 items-center p-2 rounded-lg text-pink-700 text-sm"
                  >
                    {" "}
                    <LayoutTemplateIcon size={16} /> <p>Accent</p>
                  </button>
                  {showColorMenu && (
                    <div className="absolute flex gap-2 flex-wrap bg-white max-w-[200px]">
                      {colorPallete.map((color, idx) => (
                        <div
                          onClick={() => {
                            setColorIdx(idx);
                            setShowColorMenu(false);
                            setFormData((prev) => ({
                              ...prev,
                              accent: colorPallete[idx],
                            }));
                          }}
                          className={`rounded-full cursor-pointer p-3 h-10 w-10 m-2 hover:bg-blue-300`}
                          style={{ backgroundColor: color }}
                        ></div>
                      ))}
                    </div>
                  )}
                </div>
  )
}

export default ColorSelector
