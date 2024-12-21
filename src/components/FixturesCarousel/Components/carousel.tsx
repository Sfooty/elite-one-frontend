import teamsData from "@/data/team-data";

interface CarouselProps {
  fixture: Fixture;
}

function getTeamNameById(id: number) {
  const team = teamsData.find(team => team.id === id);
  return team ? team.name : "Unknown Team";
}

function getTeamLogoById(id: number) {
  const team = teamsData.find(team => team.id === id);
  return team ? team.logo : "https://static.flashscore.com/res/image/data/zPbZzeFG-IcoqV5ye.png";
}

export function Carousel(
  {fixture}: CarouselProps
) {
  return (
    <div key={fixture.id} className="p-4 ">
      <div className=" border-r-2 flex flex-row justify-between">
        <div className={`w-full`}>
          <p>Date: {fixture.date}</p>
          <p>Time: {fixture.time}</p>
          <div className="flex flex-col justify-between gap-3">
            <div className="flex flex-row justify-between">
              <p className="my-auto flex flex-row gap-2">
                <img src={getTeamLogoById(fixture.home_team_id)} height="20px" width="20px"/>
                {getTeamNameById(fixture.home_team_id)}
              </p>
              <div className="match-slider-card_score">0</div>
            </div>
            <div className="flex flex-row justify-between">
              <p className="my-auto flex flex-row gap-2"><img src={getTeamLogoById(fixture.away_team_id)} height="20px" width="20px" /> {getTeamNameById(fixture.away_team_id)}</p>
              <div className="match-slider-card_score">2</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
