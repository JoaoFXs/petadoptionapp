import { ReactEventHandler } from "react";
import { FaMapMarkerAlt, FaTimes, FaChevronDown, FaChevronRight } from 'react-icons/fa';

export class FilterItemsCardProps<T = any>{
    onClick?:  () => void;
    arrowIcon?: boolean | undefined;
    listItems?: T[];
    itemLabelKey?: keyof T; // <== chave dinâmica
    labelText?: string;
}


export const FilterItems: React.FC<FilterItemsCardProps> = (filter: FilterItemsCardProps) =>{
    return (
        <div className="flex p-6 max-h-[80vh] overflow-y-auto w-full gap-2">
                        
                                <button onClick={filter.onClick} className="flex flex-row items-center gap-">
                                  {filter.arrowIcon ? (
                                    <FaChevronDown className="text-gray-800" />
                                    
                                    ):(
                                       <FaChevronRight className="text-gray-800" />
                                    )
                                  }
                                  
                                  <h3 className="text-xl text-gray-800 font-semibold">{filter.labelText}</h3>
                                </button>
                                {!filter.arrowIcon &&(
                                <ul className=" space-y-2 text-gray-700 max-h-64 overflow-y-auto">
                                  {(filter.listItems ?? []).map((loc, index) => (
                                    <li key={index} className="flex items-center space-x-2">
                                      <input
                                        type="checkbox"
                                        id={`loc-${index}`}
                                        className="form-checkbox h-4 w-4 text-green-500"
                                      />
                                      <label htmlFor={`loc-${index}`} className="cursor-pointer">
                                       { filter.itemLabelKey  ? (loc[filter.itemLabelKey!]) : (loc)
                                       }
                                      </label>
                                    </li>
                                  ))}
                                </ul>
                                )}
                              </div>
    );
}