import React, { useState, useEffect } from 'react';

const AD_DURATION = 15; // in seconds

const WatchAdsPage: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(AD_DURATION);
  const [isWatching, setIsWatching] = useState(false);
  const [pointsEarned, setPointsEarned] = useState(0);

  useEffect(() => {
    let timer: number;
    if (isWatching && timeLeft > 0) {
      timer = window.setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (isWatching && timeLeft === 0) {
      setIsWatching(false);
      setPointsEarned(25); // Award points
    }
    return () => clearTimeout(timer);
  }, [isWatching, timeLeft]);

  const handleStartWatching = () => {
    setTimeLeft(AD_DURATION);
    setPointsEarned(0);
    setIsWatching(true);
  };
  
  const handleClaim = () => {
    alert(`You claimed ${pointsEarned} points!`);
    setPointsEarned(0);
    setTimeLeft(AD_DURATION);
  }

  const progressPercentage = ((AD_DURATION - timeLeft) / AD_DURATION) * 100;

  return (
    <div className="max-w-4xl mx-auto text-center">
      <h1 className="text-4xl font-bold text-fog-dark dark:text-fog-light">Watch Ads, Earn Points</h1>
      <p className="mt-2 text-lg text-fog-mid dark:text-slate-400">Watch a short ad from our partners to earn FOG Points, redeemable for discounts and boosts.</p>
      
      <div className="mt-8 bg-white dark:bg-fog-mid-dark p-8 rounded-xl shadow-lg dark:shadow-lg-dark">
        <div className="aspect-w-16 aspect-h-9 bg-gray-900 dark:bg-black rounded-lg mb-6 flex items-center justify-center">
          {isWatching ? (
            <p className="text-white text-2xl">Ad playing... {timeLeft}s</p>
          ) : (
             <img src="https://picsum.photos/seed/tech-ad/800/450" alt="Ad placeholder" className="w-full h-full object-cover rounded-lg" />
          )}
        </div>
        
        {isWatching && (
          <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-4 mb-4">
            <div 
              className="bg-fog-secondary h-4 rounded-full transition-all duration-1000 ease-linear" 
              style={{ width: `${progressPercentage}%` }}>
            </div>
          </div>
        )}

        {!isWatching && pointsEarned > 0 && (
          <div className="my-4 p-4 bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300 rounded-lg">
            <p className="font-semibold">Congratulations! You've earned {pointsEarned} points.</p>
          </div>
        )}

        {!isWatching ? (
          pointsEarned > 0 ? (
            <button
              onClick={handleClaim}
              className="w-full px-8 py-4 bg-fog-secondary text-white font-bold rounded-lg shadow-md hover:bg-fog-secondary-hover transition-colors text-xl"
            >
              Claim {pointsEarned} Points
            </button>
          ) : (
            <button
              onClick={handleStartWatching}
              className="w-full px-8 py-4 bg-fog-accent text-white font-bold rounded-lg shadow-md hover:bg-fog-accent-hover transition-colors text-xl"
            >
              Watch Next Ad (15s)
            </button>
          )
        ) : (
          <button
            disabled
            className="w-full px-8 py-4 bg-gray-400 dark:bg-slate-600 text-white font-bold rounded-lg cursor-not-allowed text-xl"
          >
            Watching...
          </button>
        )}
      </div>
    </div>
  );
};

export default WatchAdsPage;