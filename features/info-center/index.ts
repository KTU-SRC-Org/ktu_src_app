export interface InfoCardInterface {
  id: string;
  title: string;
  message: string;
  type: "notification" | "announcement";
  timestamp: string;
}

export interface InfoDetailsInterface extends InfoCardInterface {
  subtitle?: string;
  time?: string;
  updatedAt?: string;
  createdAt?: string;
  isImportant?: boolean;
  notice?: string;
  details?: string;
  headsUp?: string;
  location?: string;
  address?: string;
  contact?: string;
  quickFacts?: { label: string; value: string }[];
  attachments?: { name: string }[];
}

export const infoData: InfoDetailsInterface[] = [
  {
    id: "1",
    title: "System Update Available",
    message:
      "A new system update is now available for your student app. Please update to enjoy improved performance and new features.",
    type: "notification",
    timestamp: "2025-11-02T14:30:00Z",
    notice: "App update may temporarily sign you out.",
    details:
      "Version 3.2 introduces faster page loading, improved notifications, and bug fixes. Make sure to back up your preferences before updating.",
    isImportant: true,
    quickFacts: [
      { label: "Version", value: "3.2.0" },
      { label: "Size", value: "45 MB" },
    ],
    attachments: [{ name: "Update Guide.pdf" }],
  },
  {
    id: "2",
    title: "New Campus Shuttle Timetable",
    message:
      "The transport department has released an updated timetable for the campus shuttle service.",
    type: "announcement",
    timestamp: "2025-11-01T10:00:00Z",
    subtitle: "KTU Transport Division | Admin Block",
    updatedAt: "2025-11-02T08:00:00Z",
    notice: "New routes include East and South Halls.",
    details:
      "Morning shuttles will start at 6:30 AM, while the last trip departs at 10:00 PM. Students are advised to be at pickup points 5 minutes before time.",
    location: "Campus Main Terminal",
    address: "KTU Main Gate",
    contact: "024 555 8888",
    quickFacts: [
      { label: "First Trip", value: "6:30 AM" },
      { label: "Last Trip", value: "10:00 PM" },
      { label: "Fee", value: "Free for Students" },
    ],
    attachments: [{ name: "New Timetable.pdf" }],
  },
  {
    id: "3",
    title: "Maintenance Notice – Power Interruption",
    message:
      "A temporary power outage will occur in the Engineering Block due to scheduled maintenance.",
    type: "notification",
    timestamp: "2025-11-03T08:30:00Z",
    details:
      "The Electrical Department will perform maintenance between 1:00 PM – 3:00 PM. Please save your work and disconnect devices before that time.",
    headsUp: "Power may be restored earlier than planned.",
    location: "Engineering Block",
    contact: "024 111 2222",
  },
  {
    id: "4",
    title: "SRC Week – Opening Concert & Cultural Night",
    message:
      "Celebrate SRC Week with a night of music, dance, and culture at the KTU Forecourt.",
    type: "announcement",
    timestamp: "2025-11-04T19:00:00Z",
    subtitle: "Official SRC Event | Hosted by PM",
    time: "7:00 PM",
    updatedAt: "2025-11-04T09:30:00Z",
    createdAt: "2025-11-02T12:00:00Z",
    isImportant: true,
    notice: "Entry is free — come early for better seating!",
    details:
      "Featuring performances from top local artists and cultural groups. Refreshments available on site.",
    headsUp:
      "Expect high winds; avoid using light tents. Bring jackets for the evening breeze.",
    location: "KTU Forecourt",
    address: "Main Campus, KTU",
    contact: "024 333 4444",
    quickFacts: [
      { label: "Venue", value: "KTU Forecourt" },
      { label: "Access", value: "Free Entry" },
      { label: "Start Time", value: "7:00 PM" },
      { label: "Security", value: "SRC Volunteers + Campus Patrol" },
    ],
    attachments: [
      { name: "Event Schedule.pdf" },
      { name: "Performer List.pdf" },
    ],
  },
  {
    id: "5",
    title: "Library Hours Extended",
    message:
      "The campus library will now close at 10:00 PM on weekdays during the exam season.",
    type: "announcement",
    timestamp: "2025-10-31T16:00:00Z",
    details:
      "This extension aims to support students preparing for mid-semester exams. Group rooms remain bookable via the library portal.",
    quickFacts: [
      { label: "Old Closing Time", value: "8:00 PM" },
      { label: "New Closing Time", value: "10:00 PM" },
    ],
    contact: "library@ktu.edu.gh",
  },
  {
    id: "6",
    title: "New Feature: Dark Mode",
    message:
      "Dark Mode is now available in the student portal settings. Try it out for a more comfortable night reading experience!",
    type: "notification",
    timestamp: "2025-11-03T12:15:00Z",
    details:
      "To enable, go to Settings → Display → Dark Mode. Your preference will sync across all devices linked to your student account.",
    attachments: [{ name: "Feature Overview.pdf" }],
  },
  {
    id: "7",
    title: "Holiday Schedule",
    message:
      "Campus offices will remain closed during the national holiday next week.",
    type: "announcement",
    timestamp: "2025-11-03T09:05:00Z",
    subtitle: "KTU Administration | HR Department",
    time: "All Day",
    updatedAt: "2025-11-03T09:05:00Z",
    createdAt: "2025-11-03T08:15:00Z",
    isImportant: true,
    notice: "Only essential services (security, clinic) will operate.",
    details:
      "All administrative offices and lecture halls will be closed on the declared national holiday. Classes resume the following Monday.",
    headsUp: "Students in residence halls are advised to restock supplies.",
    location: "Main Campus",
    address: "KTU, Koforidua",
    contact: "020 888 9999",
    quickFacts: [
      { label: "Holiday", value: "Founders’ Day" },
      { label: "Date", value: "November 10, 2025" },
      { label: "Offices Closed", value: "All Academic & Admin" },
    ],
    attachments: [{ name: "Holiday Circular.pdf" }],
  },
];
