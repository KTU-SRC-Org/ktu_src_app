import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatTime = (date: Date | string) => {
  const now = new Date();
  const target = new Date(date);
  const diff = Math.floor((now.getTime() - target.getTime()) / 1000);

  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;

  return target.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

export const getFormattedDate = (inputDate: Date | string) => {
  const date = new Date(inputDate);

  const month = date.toLocaleString('en-US', { month: 'short' }).toUpperCase();

  const day = date.getDate().toString().padStart(2, '0');

  const time = date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return { month, day, time };
};
