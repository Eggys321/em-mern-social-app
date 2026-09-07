import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

const TimeAgo = ({ date }) => {
  const [timeAgo, setTimeAgo] = useState('');

  useEffect(() => {
    if (!date) {
      return;
    }

    const calculateTimeAgo = () => {
      const relativeTimeDifference = dayjs(date).fromNow();
      setTimeAgo(relativeTimeDifference);
    };

    calculateTimeAgo();

    const interval = setInterval(calculateTimeAgo, 60000);

    return () => clearInterval(interval);
  }, [date]);

  return <time dateTime={date}>{timeAgo}</time>;
};

export default TimeAgo;