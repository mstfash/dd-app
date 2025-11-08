import { Filter } from 'lucide-react';

interface SportFilterProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SportFilter({ value, onChange }: SportFilterProps) {
  return (
    <div className="relative">
      <Filter className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 appearance-none bg-white"
      >
        <option value="all">All Sports</option>
        <option value="football">Football</option>
        <option value="padel">Padel</option>
        <option value="basketball">Basketball</option>
        <option value="padbol">Padbol</option>
      </select>
    </div>
  );
}