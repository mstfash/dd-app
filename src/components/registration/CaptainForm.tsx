interface CaptainFormProps {
  players: Array<{ firstName: string; lastName: string }>;
  captainDetails: {
    username: string;
    password: string;
    confirmPassword: string;
    playerIndex: number;
  };
  setCaptainDetails: (details: any) => void;
  teamName: string;
}

export default function CaptainForm({
  players,
  captainDetails,
  setCaptainDetails,
  teamName
}: CaptainFormProps) {
  return (
    <div className="mt-8 p-6 bg-sage-50 rounded-xl border-2 border-sage-200">
      <h4 className="text-lg font-display font-bold text-sage-600 mb-4">Team Captain Details</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-sage-600 mb-2">Select Captain</label>
          <select
            value={captainDetails.playerIndex}
            onChange={(e) => setCaptainDetails({
              ...captainDetails,
              playerIndex: parseInt(e.target.value),
              username: e.target.value !== '-1' ? `ZED_${teamName}_${players[parseInt(e.target.value)].firstName}` : ''
            })}
            className="w-full p-3 border-2 border-sage-200 rounded-lg"
            required
          >
            <option value="-1">Select a player</option>
            {players.map((player, index) => (
              <option key={index} value={index}>
                {player.firstName} {player.lastName}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm text-sage-600 mb-2">Username</label>
          <input
            type="text"
            value={captainDetails.username}
            className="w-full p-3 border-2 border-sage-200 rounded-lg bg-sage-100"
            readOnly
          />
        </div>
        <div>
          <label className="block text-sm text-sage-600 mb-2">Password</label>
          <input
            type="password"
            value={captainDetails.password}
            onChange={(e) => setCaptainDetails({
              ...captainDetails,
              password: e.target.value
            })}
            className="w-full p-3 border-2 border-sage-200 rounded-lg"
            required
          />
        </div>
        <div>
          <label className="block text-sm text-sage-600 mb-2">Confirm Password</label>
          <input
            type="password"
            value={captainDetails.confirmPassword}
            onChange={(e) => setCaptainDetails({
              ...captainDetails,
              confirmPassword: e.target.value
            })}
            className="w-full p-3 border-2 border-sage-200 rounded-lg"
            required
          />
        </div>
      </div>
    </div>
  );
}