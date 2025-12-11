export interface NotificationItem {
  id: string;
  recipientId: string;
  actorId?: string | null;
  type: string;
  title: string;
  body?: string | null;
  data?: Record<string, any>;
  linkType?: string | null;
  linkId?: string | null;
  read: boolean;
  createdAt: string;
}

export interface AnnouncementItem {
  id: string;
  title: string;
  subtitle?: string | null;
  summary?: string | null;
  body?: string | null;
  notice?: string | null;
  headsUp?: string | null;
  category: string;
  isImportant: boolean;
  pinned: boolean;
  startsAt?: string | null;
  endsAt?: string | null;
  isPublic: boolean;
  location?: string | null;
  address?: string | null;
  contact?: string | null;
  quickFacts?: { label: string; value: string }[];
  attachments?: { name: string; url: string }[];
  authorId?: string | null;
  createdAt: string;
  updatedAt: string;
}
