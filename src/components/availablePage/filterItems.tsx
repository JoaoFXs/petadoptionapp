import { ReactEventHandler } from "react";
import { FaMapMarkerAlt, FaTimes, FaChevronDown, FaChevronRight } from 'react-icons/fa';
import { useState } from "react";
import { select } from "framer-motion/client";
export class FilterItemsCardProps<T = any>{
    onClick?:  () => void;
    arrowIcon?: boolean | undefined;
    listItems?: T[];
    itemLabelKey?: keyof T; // <== chave dinâmica
    labelText?: string;
    onSelectionChange?: (selectedValues: string) => void; //envia para o backend
}


export const FilterItems: React.FC<FilterItemsCardProps> = (filter: FilterItemsCardProps) =>{

  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const handleCheckboxChange = (value: string, checked: boolean) => {
      const updated = checked
        ? [...selectedItems, value]
        : selectedItems.filter(item => item !== value);

      setSelectedItems(updated);

      // Enviar a string separada por vírgulas para o backend (ou componente pai)
      const csvString = updated.join(",");
      filter.onSelectionChange?.(csvString);
    };

    
    return (
        <div className="flex basis-1/3 p-6 max-h-[80vh] overflow-y-auto w-full gap-2">
                        
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
                                 <ul className="space-y-2 text-gray-700 max-h-64 overflow-y-auto">
                                  {(filter.listItems ?? []).map((item, index) => {
                                    const value = filter.itemLabelKey ? String(item[filter.itemLabelKey]) : String(item);
                                    return (
                                      <li key={index} className="flex items-center space-x-2">
                                        <input
                                          type="checkbox"
                                          id={`loc-${index}`}
                                          className="form-checkbox h-4 w-4 text-green-500"
                                          checked={selectedItems.includes(value)}
                                          onChange={(e) => handleCheckboxChange(value, e.target.checked)}
                                        />
                                        <label htmlFor={`loc-${index}`} className="cursor-pointer">
                                          {value}
                                        </label>
                                      </li>
                                    );
                                  })}
                                </ul>
                                )}
                              </div>
    );
}