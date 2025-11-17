export type TabKeys = 'featured' | 'popular' | 'upcoming';

export interface Event {
  id: string;
  title: string;
  date: Date | string;
  location: string;
  category?: string;
  description?: string;
  image?: string;
  attendees?: string;
  organizer?: string;
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
