import React from 'react';
import Countdown from 'react-countdown';

const Timer = ({ durationInMinutes, onComplete }) => {
    // Calculate the countdown target time
    const countdownDate = Date.now() + durationInMinutes * 60 * 1000;

    return (
        <Countdown
            date={countdownDate}
            onComplete={onComplete}
            renderer={({ hours, minutes, seconds, completed }) => {
                if (completed) {
                    // Render a message when the timer completes
                    return <span>Time's up!</span>;
                } else {
                    // Render the countdown
                    return (
                        <span>
                            {hours}:{minutes}:{seconds}
                        </span>
                    );
                }
            }}
        />
    );
};

export default Timer;
