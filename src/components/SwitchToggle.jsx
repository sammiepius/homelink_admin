export default function SwitchToggle({ checked, onChange }) {
  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        className="sr-only peer"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />

      <div
        className="
          w-11 h-6 bg-neutral-300 rounded-full
          peer-checked:bg-blue-600
          transition-all
        "></div>

      <span
        className="
          absolute left-1 top-1 h-4 w-4 rounded-full bg-white shadow
          transition-all
          peer-checked:translate-x-5
        "></span>
    </label>
  );
}
