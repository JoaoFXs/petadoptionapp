
export interface LoadingProps{
    children?: React.ReactNode;
        condition?: boolean;
        conditionPet?: boolean;
}

export const Loading: React.FC<LoadingProps> = ({children, condition, conditionPet}) =>{
    if (condition) {
        return (<div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>)
    }else {
       return <>{children}</>;
    }
    return null;
}

export default Loading;