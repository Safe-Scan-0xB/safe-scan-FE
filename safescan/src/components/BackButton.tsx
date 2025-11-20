// src/components/BackButton.tsx
import { useNavigate } from "react-router-dom";
import arrow from "../assets/icon/icon_arrowLeft.svg";

type Props = {
  className?: string;
};

export default function BackButton({ className = "" }: Props) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className={`flex items-center justify-center ${className}`}
    >
      <img
        src={arrow}
        alt="back"
        className="h-8 sm:h-9 md:h-9 lg:h-9 w-auto transition-all duration-200"
      />
    </button>
  );
}