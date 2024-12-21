// StandingsTable.tsx
import React from 'react';
import teamsData from '../../data/team-data';

interface TeamData {
  name: string;
  logo: string;
  matchesPlayed: number;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
  form: string[];
  headToHeadPoints?: number; // Optional
  headToHeadAwayGoals?: number; // Optional
}

export type StandingsBlockProps = {
  size?: 'small' | 'medium' | 'large';
}

type Props = StandingsBlockProps & {
  className?: string;
};

export const StandingsBlock: React.FC<Props> = ({ size= "small", className }) => {
  const sortedTeams = [...teamsData].sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    if (b.goalDifference !== a.goalDifference) return b.goalDifference - a.goalDifference;
    return b.goalsFor - a.goalsFor;
  });

  return (
    <div className={`standings-table container mx-auto ${className}`}>
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-200">
        <tr>
          <th className="p-3 text-left text-xs font-bold tracking-wide text-gray-700">Pos</th>
          <th className="p-3 text-left text-xs font-bold tracking-wide text-gray-700">Name</th>
          <th className="p-3 text-left text-xs font-bold tracking-wide text-gray-700">Pl</th>
          {size === 'large' && <th className="p-3 text-left text-xs font-bold tracking-wide text-gray-700">W</th>}
          {size === 'large' && <th className="p-3 text-left text-xs font-bold tracking-wide text-gray-700">D</th>}
          {size === 'large' && <th className="p-3 text-left text-xs font-bold tracking-wide text-gray-700">L</th>}
          {size === 'large' && <th className="p-3 text-left text-xs font-bold tracking-wide text-gray-700">GF</th>}
          {size === 'large' && <th className="p-3 text-left text-xs font-bold tracking-wide text-gray-700">GA</th>}
          <th className="p-3 text-left text-xs font-bold tracking-wide text-gray-700">GD</th>
          <th className="p-3 text-left text-xs font-bold tracking-wide text-gray-700">Pts</th>
          {(size === 'medium' || size === 'large') &&
            <th className="p-3 text-left text-xs font-bold tracking-wide text-gray-700">Form</th>}
        </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
        {sortedTeams.map((team, index) => (
          <tr key={team.name} className="border-b border-gray-200 hover:bg-gray-50">
            <td className="p-3 text-sm text-gray-700">{index + 1}</td>
            <td className="p-3 text-sm text-gray-700">
              <div className="flex flex-row gap-3">
                <img src={team.logo} className="h-7" alt={team.name}/>
                <span className="leading-[1.6rem]">{team.name}</span>
              </div>
            </td>
            <td className="p-3 text-sm text-gray-700">{team.matchesPlayed}</td>
            {size === 'large' && <td className="p-3 text-sm text-gray-700">{team.wins}</td>}
            {size === 'large' && <td className="p-3 text-sm text-gray-700">{team.draws}</td>}
            {size === 'large' && <td className="p-3 text-sm text-gray-700">{team.losses}</td>}
            {size === 'large' && <td className="p-3 text-sm text-gray-700">{team.goalsFor}</td>}
            {size === 'large' && <td className="p-3 text-sm text-gray-700">{team.goalsAgainst}</td>}
            <td className="p-3 text-sm text-gray-700">{team.goalDifference}</td>
            <td className="p-3 text-sm text-gray-700">{team.points}</td>
            {(size === 'medium' || size === 'large') && (
              <td className="p-3 text-sm text-gray-700">
                {team.form.map((result, i) => (
                  <span key={i} className={`inline-block w-5 h-5 text-center leading-[1.3rem] mx-0.5 rounded-full text-white ${
                    result === 'W' ? 'bg-green-500' : result === 'L' ? 'bg-red-500' : 'bg-gray-500'
                  }`}>
                        {result}
                    </span>
                ))}
              </td>
            )}
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
};
