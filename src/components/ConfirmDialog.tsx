"use client";

interface ConfirmDialogProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmDialog({ message, onConfirm, onCancel }: ConfirmDialogProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-xs w-full mx-4 shadow-xl">
        <div className="text-center mb-6 font-bold">{message}</div>
        <div className="flex gap-3">
          <button
            className="flex-1 bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded hover:bg-gray-300"
            onClick={onCancel}
          >
            キャンセル
          </button>
          <button
            className="flex-1 bg-teal-700 text-white font-bold py-2 px-4 rounded hover:bg-teal-800"
            onClick={onConfirm}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}
