// src/components/common/AlertModal.tsx
type AlertModalProps = {
  open: boolean;
  message: string;
  onClose: () => void;
};

export default function AlertModal({ open, message, onClose }: AlertModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <div className="w-[400px] rounded-2xl bg-white px-6 pt-8 pb-6 text-center">
        <p className="text-base font-medium text-black mb-4">{message}</p>

        <button
          className="w-40 h-10 rounded-lg bg-[#283A4E] text-white"
          onClick={onClose}
        >
          확인
        </button>
      </div>
    </div>
  );
}
