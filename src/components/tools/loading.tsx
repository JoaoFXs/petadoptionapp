import { MdPets } from "react-icons/md";

export interface LoadingProps {
  children?: React.ReactNode;
  condition?: boolean;
  conditionPet?: boolean;
}

export const Loading: React.FC<LoadingProps> = ({ children, condition, conditionPet }) => {
  if (condition) {
    const paws = Array.from({ length: 8 });

    return (
      <div className="flex justify-center items-center h-64">
        <div className="relative w-40 h-40">
          {paws.map((_, i) => {
            const angle = i * (360 / paws.length);
            const delay = i * 0.15; // delay em sequência

            return (
              <div
                key={i}
                className="absolute left-1/2 top-1/2"
                style={{
                  transform: `rotate(${angle}deg) translate(70px) rotate(-${angle}deg)`,
                  animation: `pawBounce 1.2s ease-in-out ${delay}s infinite`,
                }}
              >
                <MdPets
                  className={`${
                    i % 2 === 0 ? "text-green-500" : "text-yellow-500"
                  } size-8`}
                />
              </div>
            );
          })}
        </div>

        {/* keyframes diretamente aqui, pode mover para um CSS se quiser */}
        <style>
          {`
            @keyframes pawBounce {
              0%, 100% { transform: scale(1); opacity: 1; }
              50% { transform: scale(1.5); opacity: 0.6; }
            }
          `}
        </style>
      </div>
    );
  }

  return <>{children}</>;
};

export default Loading;
