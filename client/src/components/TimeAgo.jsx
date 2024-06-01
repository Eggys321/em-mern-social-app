import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

const TimeAgo = ({ date }) => {
  const [timeAgo, setTimeAgo] = useState('');

  useEffect(() => {
    if (!date) {
      return;
    }

    // Calculate the relative time difference
    const calculateTimeAgo = () => {
      const relativeTimeDifference = dayjs(date).fromNow();
      setTimeAgo(relativeTimeDifference);
    };

    // Initial calculation
    calculateTimeAgo();

    // Update timeAgo every minute
    const interval = setInterval(calculateTimeAgo, 60000);

    // Cleanup function to clear interval
    return () => clearInterval(interval);
  }, [date]);

  return <span>{timeAgo}</span>;
};

export default TimeAgo;