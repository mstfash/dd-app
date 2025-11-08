import { Minus, Shirt } from 'lucide-react';
import type { Player } from '../../types';
import { kitSize } from '../../utils/Select';

interface PlayerFormProps {
  player: Player;
  index: number;
  updatePlayer: (
    index: number,
    field: keyof Player,
    value: string | number | File
  ) => void;
  removePlayer: (index: number) => void;
  requiresKitNumber?: boolean;
}

export default function PlayerForm({
  player,
  index,
  updatePlayer,
  removePlayer,
  requiresKitNumber,
}: PlayerFormProps) {
  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (file) {
  //     updatePlayer(index, 'playerIDFile', file);
  //   }
  // };

  return (
    <div className="p-4 md:p-8 bg-white/90 backdrop-blur-md rounded-2xl shadow-md space-y-4 md:space-y-6 border-2 border-sage-100 hover:border-peach-400 transition-all duration-300">
      <div className="flex justify-between items-center">
        <h4 className="font-display font-bold text-sage-600 text-lg">
          Player {index + 1}
        </h4>
        <button
          type="button"
          onClick={() => removePlayer(index)}
          className="text-red-500 hover:text-red-600 transition-colors p-2 hover:bg-red-50 rounded-lg"
        >
          <Minus className="w-4 h-4" />
        </button>
      </div>

      <div className="flex md:grid md:grid-col-2 flex-col gap-4 max-w-lg mx-auto">
        <input
          type="text"
          placeholder="First Name"
          value={player.firstName}
          onChange={(e) => updatePlayer(index, 'firstName', e.target.value)}
          className="p-4 pl-10 border-2 border-sage-200 rounded-xl focus:ring-2 focus:ring-peach-400 w-full bg-white/90 transition-all duration-300 group-hover:border-peach-400 text-base md:text-lg"
          required
        />
        <input
          type="text"
          placeholder="Last Name"
          value={player.lastName}
          onChange={(e) => updatePlayer(index, 'lastName', e.target.value)}
          className="p-4 pl-10 border-2 border-sage-200 rounded-xl focus:ring-2 focus:ring-peach-400 w-full bg-white/90 transition-all duration-300 group-hover:border-peach-400"
          required
        />
        <input
          type="email"
          placeholder="Email Address"
          value={player.email}
          onChange={(e) => updatePlayer(index, 'email', e.target.value)}
          className="p-4 pl-10 border-2 border-sage-200 rounded-xl focus:ring-2 focus:ring-peach-400 w-full bg-white/90 transition-all duration-300 group-hover:border-peach-400"
          required
        />
        <input
          type="text"
          placeholder="Phone Number"
          value={player.phoneNumber}
          onChange={(e) => updatePlayer(index, 'phoneNumber', e.target.value)}
          className="p-4 pl-10 border-2 border-sage-200 rounded-xl focus:ring-2 focus:ring-peach-400 w-full bg-white/90 transition-all duration-300 group-hover:border-peach-400"
          required
        />
        {/* <input
          type="text"
          placeholder="National ID Number"
          value={player.playerID}
          onChange={(e) => updatePlayer(index, 'playerID', e.target.value)}
          className="p-4 pl-10 border-2 border-sage-200 rounded-xl focus:ring-2 focus:ring-peach-400 w-full bg-white/90 transition-all duration-300 group-hover:border-peach-400"
          required
        /> */}
        <select
          value={player.kitSize}
          onChange={(e) => updatePlayer(index, 'kitSize', e.target.value)}
          className="p-4 pl-10 border-2 text-black border-sage-200 rounded-xl focus:ring-2 focus:ring-peach-400 w-full bg-white/90 transition-all duration-300 group-hover:border-peach-400"
          required
        >
          <option value="">Select Kit Size</option>
          {kitSize.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
        {requiresKitNumber && (
          <div className="relative">
            <Shirt className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-sage-400" />
            <input
              type="number"
              placeholder="Kit Number (1-99)"
              value={player.jerseyNumber || ''}
              onChange={(e) =>
                updatePlayer(index, 'jerseyNumber', parseInt(e.target.value))
              }
              min="1"
              max="99"
              className="p-4 pl-10 border-2 border-sage-200 rounded-xl focus:ring-2 focus:ring-peach-400 w-full bg-white/90 transition-all duration-300 group-hover:border-peach-400"
              required
            />
          </div>
        )}

        {/* <div className="relative col-span-2">
          <label>National ID</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="p-4 pl-10 border-2 border-sage-200 rounded-xl focus:ring-2 focus:ring-peach-400 w-full bg-white/90 transition-all duration-300 group-hover:border-peach-400"
            required
          />
          {player.playerIDFile && (
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-sage-600">
              File selected
            </span>
          )}
        </div> */}
      </div>
    </div>
  );
}
