import { CanopyInterface } from '@/types/events.types';

export type Event = {
  id: string;
  title: string;
  date: Date | string;
  location: string;
  category?: string;
  description?: string;
  image?: string;
  attendees?: string;
  organizer?: string;
};

export const eventsData: Event[] = [
  {
    id: '1',
    title: 'S.R.C First Year’s Orientation at The Aba Bentil Hall',
    date: '2026-05-01T20:00:00Z',
    location: 'Aba Bentil Hall',
    category: 'Educational',
    description:
      'An orientation session to welcome and guide first-year students through the academic and social environment of the university.',
    image: 'https://images.unsplash.com/photo-1596495577886-d920f1fb7238',
    attendees: '2.7K+',
    organizer: 'S.R.C Ghana',
  },
  {
    id: '2',
    title: 'Freshers Welcome Concert',
    date: '2026-01-03T18:30:00Z',
    location: 'Campus Main Arena',
    category: 'Entertainment',
    description:
      'An energetic night of music, performances, and fun to celebrate the arrival of new students on campus.',
    image: 'https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2',
    attendees: '3.4K+',
    organizer: 'Campus Vibes Team',
  },
  {
    id: '3',
    title: 'Tech Innovators Meetup',
    date: '2026-02-06T15:00:00Z',
    location: 'Innovation Hub',
    category: 'Technology',
    description:
      'A networking event for students and developers passionate about emerging technologies and startups.',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c',
    attendees: '1.2K+',
    organizer: 'Tech Club',
  },
  {
    id: '4',
    title: 'Career and Internship Fair 2025',
    date: '2026-03-10T09:00:00Z',
    location: 'Auditorium Block B',
    category: 'Career',
    description:
      'Meet top recruiters, explore internship opportunities, and learn how to build a successful career in your field.',
    image: 'https://images.unsplash.com/photo-1581092795360-fd1ca05a0e97',
    attendees: '2.1K+',
    organizer: 'Career Services',
  },
  {
    id: '5',
    title: 'Cultural Night: A Celebration of Heritage',
    date: '2026-01-18T19:00:00Z',
    location: 'Campus Amphitheater',
    category: 'Cultural',
    description:
      'An evening filled with cultural performances, traditional food, and storytelling from different regions.',
    image: 'https://images.unsplash.com/photo-1508675801608-4f48a1e0b7a5',
    attendees: '1.9K+',
    organizer: 'Cultural Committee',
  },
  {
    id: '6',
    title: 'Sports Festival: Unity Through Games',
    date: '2026-04-20T08:00:00Z',
    location: 'University Sports Complex',
    category: 'Sports',
    description:
      'Inter-faculty competitions in athletics, football, and basketball promoting teamwork and sportsmanship.',
    image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b',
    attendees: '3.1K+',
    organizer: 'Sports Directorate',
  },
  {
    id: '7',
    title: 'Music & Art Exhibition',
    date: '2026-02-25T17:00:00Z',
    location: 'Arts Gallery',
    category: 'Art',
    description:
      'A creative showcase of paintings, digital art, and live acoustic performances by local student artists.',
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c',
    attendees: '950+',
    organizer: 'Arts & Design Society',
  },
  {
    id: '8',
    title: 'Campus Innovation Challenge Finals',
    date: '2026-05-30T14:00:00Z',
    location: 'Auditorium Hall A',
    category: 'Competition',
    description:
      'Final presentations of student-led projects solving real-world problems with creative and sustainable solutions.',
    image: 'https://images.unsplash.com/photo-1551836022-4c4c79ecde51',
    attendees: '1.5K+',
    organizer: 'Innovation Hub Ghana',
  },
];

export const canopyOptions: CanopyInterface[] = [
  { id: '1', name: '1 Canopy', price: 120, quantity: 3 },
  { id: '2', name: '1 1/2 Canopy', price: 260, quantity: 3 },
];
