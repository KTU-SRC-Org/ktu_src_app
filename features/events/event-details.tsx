import { useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  Pressable,
  Platform,
  useWindowDimensions,
  ActivityIndicator,
} from 'react-native';
import { MapPin, Calendar, Users, ArrowLeft } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { getFormattedDate } from '@/lib/utils';
import BookCanopyModal from '@/features/events/book-canopy-modal';
import { useEventDetails } from '@/hooks/events/use-event-details';
import { useUpdateAttendance } from '@/hooks/events/use-update-attendance';
import { EventAttendanceStatus } from '@/types/events.types';

const EventDetails = ({ id }: { id: string }) => {
  const router = useRouter();
  const [openModal, setOpenModal] = useState<boolean>(false);

  const { width } = useWindowDimensions();
  const imageHeight = width * 0.5;

  const { data: event, isLoading, isError } = useEventDetails(id);
  const { mutate: updateAttendance, isPending: isUpdatingAttendance } = useUpdateAttendance();

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (isError || !event) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <Text className="text-gray-500">Event not found.</Text>
      </View>
    );
  }

  const { day, time, month } = getFormattedDate(event.starts_at);

  // Calculate if user can update attendance
  const eventDate = new Date(event.starts_at);
  const now = new Date();
  const daysUntilEvent = Math.ceil((eventDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  const hasExistingStatus = event.user_attendance_status !== null;
  const canUpdateAttendance =
    !event.disable_attendance && (daysUntilEvent > 5 || !hasExistingStatus);

  const handleAttendanceChange = (status: EventAttendanceStatus) => {
    if (!canUpdateAttendance || isUpdatingAttendance) return;
    updateAttendance({ eventId: id, status });
  };

  const attendanceOptions: { label: string; value: EventAttendanceStatus; icon: string }[] = [
    { label: 'Going', value: 'going', icon: '✓' },
    { label: 'Interested', value: 'interested', icon: '★' },
    { label: 'Not Going', value: 'not_going', icon: '✗' },
  ];

  return (
    <>
      <View className="flex-1 bg-white">
        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
          contentContainerClassName={'flex flex-col gap-4 pb-8'}>
          <View className="relative w-full" style={{ height: imageHeight }}>
            <Image
              source={{
                uri: event.cover_image || 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1',
              }}
              className="h-full w-full"
            />

            <Pressable
              onPress={() => router.back()}
              className="absolute left-4 top-4 h-10 w-10 items-center rounded-full bg-white/80 p-2">
              <ArrowLeft size={24} color="#000" />
            </Pressable>

            <View className="absolute left-4 top-16 items-center rounded-md border-2 border-[#F5882B] bg-[#0B151EBD] p-2 shadow">
              <Text className="text-sm font-bold text-white">{month}</Text>
              <Text
                className="text-center text-3xl font-extrabold leading-none text-white"
                style={{
                  fontVariant: ['tabular-nums'],
                  fontFamily: Platform.select({
                    ios: 'Menlo',
                    android: 'monospace',
                    default: 'monospace',
                  }),
                }}>
                {day}
              </Text>
            </View>
          </View>

          <Text className="px-4 text-sm font-semibold capitalize text-blue-600">
            {event.category || 'Event'}
          </Text>

          <Text className="mt-1 px-4 text-xl font-bold text-neutral-900">{event.title}</Text>

          <View className="mt-2 flex-row flex-wrap items-center gap-3 px-4">
            <View className="flex-row items-center gap-1">
              <MapPin size={14} color="#475569" />
              <Text className="text-sm text-slate-700">{event.location || 'TBA'}</Text>
            </View>

            <View className="flex-row items-center gap-1">
              <Calendar size={14} color="#475569" />
              <Text className="text-sm text-slate-700">
                {month} {day} • {time}
              </Text>
            </View>
          </View>

          <View className="flex-row items-center justify-between px-4">
            <View className="flex-row items-center gap-2">
              <Users size={16} color="#334155" />
              <Text className="text-sm text-slate-700">{event.going_count} Going</Text>
            </View>
            {event.interested_count > 0 && (
              <Text className="text-sm text-slate-700">{event.interested_count} Interested</Text>
            )}
          </View>

          {/* Attendance Status Pills */}
          <View className="px-4">
            <Text className="mb-2 text-base font-semibold text-neutral-900">Your Status</Text>
            <View className="flex-row flex-wrap gap-2">
              {attendanceOptions.map((option) => {
                const isSelected = event.user_attendance_status === option.value;
                const isDisabled = !canUpdateAttendance && !isSelected;

                return (
                  <Pressable
                    key={option.value}
                    onPress={() => handleAttendanceChange(option.value)}
                    disabled={isDisabled || isUpdatingAttendance}
                    className={`rounded-full px-4 py-2 ${
                      isSelected
                        ? 'bg-blue-500'
                        : isDisabled
                          ? 'bg-gray-200'
                          : 'border border-gray-300 bg-white'
                    } ${isDisabled ? 'opacity-50' : 'active:opacity-70'}`}>
                    <Text
                      className={`text-sm font-medium ${
                        isSelected ? 'text-white' : isDisabled ? 'text-gray-400' : 'text-gray-700'
                      }`}>
                      {option.icon} {option.label}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
            {!canUpdateAttendance && hasExistingStatus && (
              <Text className="mt-2 text-xs text-gray-500">
                Attendance updates are disabled for this event
              </Text>
            )}
          </View>

          {/* Book Canopy Button */}
          {event.can_book_canopy && (
            <View className={'px-4'}>
              <Pressable
                onPress={() => setOpenModal(true)}
                className="mt-4 self-start rounded-md bg-blue-500 px-5 py-3 active:opacity-80">
                <Text className="text-center text-base font-semibold text-white">Book Canopy</Text>
              </Pressable>
            </View>
          )}

          <View className="px-4">
            <Text className="mb-1 text-base font-semibold text-neutral-900">About Event</Text>
            <Text className="text-sm leading-relaxed text-slate-700">
              {event.description || 'No detailed description available for this event.'}
            </Text>
          </View>

          {event.organizer && (
            <View className="px-4">
              <Text className="mb-1 text-base font-semibold text-neutral-900">Organizer</Text>
              <Text className="text-sm text-slate-700">{event.organizer.full_name || 'N/A'}</Text>
            </View>
          )}
        </ScrollView>
      </View>
      {openModal && (
        <BookCanopyModal visible={openModal} onClose={() => setOpenModal(false)} event={event} />
      )}
    </>
  );
};

export default EventDetails;
