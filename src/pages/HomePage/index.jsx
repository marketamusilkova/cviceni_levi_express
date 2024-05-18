import { JourneyDetail } from '../../components/JourneyDetail';
import { JourneyPicker } from '../../components/JourneyPicker';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SeatPicker } from '../../components/SeatPicker';

export const HomePage = () => {
  const navigate = useNavigate();
  const [journey, setJourney] = useState(null);
  const [userSeat, setUserSeat] = useState(null);

  const handleJourneyChange = (journeyData) => {
    setJourney(journeyData);
    setUserSeat(journeyData.autoSeat);
  };

  const handleBuy = async () => {
    const response = await fetch(
      'https://apps.kodim.cz/daweb/leviexpress/api/reservation',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'create',
          seat: userSeat,
          journeyId: journey.journeyId,
        }),
      },
    );
    const data = await response.json();
    const reservationId = data.results.reservationId;
    console.log(reservationId);
    navigate(`/reservation/${reservationId}`);
  };
  console.log(journey);

  return (
    <main>
      <JourneyPicker onJourneyChange={handleJourneyChange} />
      {journey ? (
        <div>
          <JourneyDetail journey={journey} />
        </div>
      ) : null}

      {journey ? (
        <SeatPicker
          seats={journey.seats}
          selectedSeat={userSeat}
          onSeatSelected={setUserSeat}
        />
      ) : null}

      <div className="controls container" onClick={handleBuy}>
        <button className="btn btn--big" type="button">
          Rezervovat
        </button>
      </div>
    </main>
  );
};
