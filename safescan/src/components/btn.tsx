// src/component/btn.tsx
type BtnProps = {
  label?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  className?: string;
};

export default function BtnLong({
  label = "버튼",
  disabled = false,
  type = "button",
  onClick,
  className = "",
}: BtnProps) {
  const base =
  "w-full py-3.5 flex items-center justify-center rounded-[5px] text-white font-sans font-semibold ";
  const active = "bg-[#2C3E54] hover:bg-[#233147]";
  const inactive = "bg-gray-400 cursor-not-allowed";

  return (
    <button
      type={type}
      disabled={disabled}
      aria-disabled={disabled}
      onClick={onClick}
      className={`${base} ${disabled ? inactive : active} ${className}`}
    >
      {label}
    </button>
  );
}
