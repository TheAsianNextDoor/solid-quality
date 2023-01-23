import dayjs from 'dayjs';

export const formatCommentTimeStamp = (date: Date, now: Date) => {
  const diffInMinutes = dayjs(now).diff(date, 'minutes');

  if (diffInMinutes <= 0) {
    const diffInSeconds = dayjs(now).diff(date, 'second');
    return `${diffInSeconds}s`;
  }

  if (diffInMinutes < 60 && diffInMinutes > 0) {
    return `${diffInMinutes}m`;
  }

  if (diffInMinutes < 1440 && diffInMinutes >= 60) {
    const diffInHours = dayjs(now).diff(date, 'hour');

    return `${diffInHours}h`;
  }

  if (diffInMinutes < 10080 && diffInMinutes >= 1440) {
    const diffInDays = dayjs(now).diff(date, 'day');

    return `${diffInDays}d`;
  }

  if (diffInMinutes >= 10080) {
    return dayjs(date).format('M/D/YY');
  }

  // eslint-disable-next-line no-console
  console.error(`Unable to handle date, ${date}`);

  return '';
};

export const wait = async (waitMs = 1000) => {
  return new Promise((resolve) => {
    setTimeout(resolve, waitMs);
  });
};
