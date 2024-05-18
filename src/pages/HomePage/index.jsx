import { JourneyDetail } from '../../components/JourneyDetail';
import { JourneyPicker } from '../../components/JourneyPicker';
import { useState } from 'react';
import { SelectedSeat } from '../../components/SelectedSeat';

export const HomePage = () => {
  const [journey, setJourney] = useState(null);

  const handleJourneyChange = (journeyData) => {
    setJourney(journeyData);
      };

  const handleBuy = () => {
console.log("Funguju")


  }    
  return (
    <main>
      <JourneyPicker onJourneyChange={handleJourneyChange} />
      {journey ? (
        <div>
          {/* <p>
            Nalezeno spojení s id
            {journey.journeyId}
          </p>{' '} */}
          <JourneyDetail journey={journey} />
        </div>
      ) : null}

      {journey ? <SelectedSeat number={journey.autoSeat}/> : null}

      <div className="controls container" onClick={handleBuy}>
        <button className="btn btn--big" type="button">
          Rezervovat
        </button>
      </div>

    </main>
  );
};
