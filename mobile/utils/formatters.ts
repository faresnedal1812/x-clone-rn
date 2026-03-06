import {
  differenceInMinutes,
  differenceInHours,
  differenceInDays,
} from "date-fns";

export const formatNumber = (num: number): string => {
  if (num > 1000) return Math.floor(num / 1000) + "K";
  return num.toString();
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return "Invalid Date";
  }
  const now = new Date();

  const minutes = differenceInMinutes(now, date);
  const houres = differenceInHours(now, date);
  const days = differenceInDays(now, date);

  if (minutes < 1) return `now`;
  if (minutes < 60) return `${minutes}m`;
  if (houres < 24) return `${houres}h`;
  if (days < 7) return `${days}d`;
  return Math.floor(days / 7) + "w";
};
