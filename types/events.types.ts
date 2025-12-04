export type TabKeys = 'featured' | 'popular' | 'upcoming';

export type EventAttendanceStatus = 'going' | 'interested' | 'not_going' | null;

export interface Event {
  id: string;
  title: string;
  description: string | null;
  location: string | null;
  is_featured: boolean;
  starts_at: string;
  ends_at: string | null;
  category: string;
  cover_image: string | null;
  organizer_id: string | null;
  capacity: number | null;
  visibility: 'public' | 'private';
  created_at: string;
  going_count: number;
  interested_count: number;
  can_book_canopy: boolean;
  disable_attendance: boolean;
  user_attendance_status?: EventAttendanceStatus;
  organizer?: {
    full_name: string | null;
    avatar_url: string | null;
  };
}

export interface BookingsInterface {
  selectedCanopies: {
    id: string;
    name: string;
    price: number;
    selectedQty: number;
  }[];
  totalAmount: number;
}

export interface CanopyInterface {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export type CanopyModalProps = {
  visible: boolean;
  onClose: () => void;
  event: Event;
};

export type ShowSuccessData = {
  visible: boolean;
  data?: BookingsInterface;
};
