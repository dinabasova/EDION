"use client";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default function AuthInput({ label, ...props }: Props) {
  return (
    <div className="space-y-1">
      <label className="text-xs font-medium text-[#3b3c55]/80">{label}</label>
      <input
        {...props}
        className="w-full rounded-xl border border-[#3b3c55]/20 px-3 py-2 text-sm outline-none 
        focus:border-[#860021] focus:ring-1 focus:ring-[#860021] transition-all"
      />
    </div>
  );
}
