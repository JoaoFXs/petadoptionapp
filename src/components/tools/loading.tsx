import { MdPets } from "react-icons/md";
export interface LoadingProps{
    children?: React.ReactNode;
        condition?: boolean;
        conditionPet?: boolean;
}

export const Loading: React.FC<LoadingProps> = ({children, condition, conditionPet}) =>{
    if (condition) {
        return (<div className="animate-spin">
            <MdPets className="text-green-700 size-10"/>
            <MdPets className="text-yellow-500 size-10 rotate-180" />

        </div>
)
    }else {
       return <>{children}</>;
    }
    return null;
}

export default Loading;