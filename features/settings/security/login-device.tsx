import { useState } from "react";
import { ScrollView, Text, View, Pressable } from "react-native";
import FormModal from "@/components/builders/form.modal";
import {useDeviceDetails} from "@/hooks/settings/use-device-details";

export type DeviceType = {
  id: string;
  name: string;
  application: string;
  location: string;
  lastActive: string;
  status?: string;
};

type DeviceCardProps = {
  device: DeviceType;
  onPress: (device: DeviceType) => void;
};

type SectionHeaderProps = {
  title: string;
};

type DetailRowProps = {
  label: string;
  value?: string | null;
  showBorder?: boolean;
};


const LoginDevice = () => {
  const [selectedDevice, setSelectedDevice] = useState<DeviceType | null>(null);

  const device = useDeviceDetails();

  if (!device) return null;

  const devices: { current: DeviceType; active: DeviceType[]; } = {
    current: {
      id: "0",
      name: device.name ?? device.model ?? "Unknown Device",
      application: `${device.os} ${device.osVersion ?? ""}`,
      location: `${device.location.city ?? "Unknown"}, ${device.location.country ?? ""}`,
      lastActive: "online",
    },
    active: [
      {
        id: "2",
        name: "Precision 7520",
        application: "Telegram Desktop 6.3.2 x64 Microsoft Store",
        location: "Accra, Ghana",
        lastActive: "yesterday at 20:41",
      },
      {
        id: "3",
        name: "Precision 7520",
        application: "Telegram Desktop 6.3.2 x64 Microsoft Store",
        location: "Accra, Ghana",
        lastActive: "yesterday at 20:41",
      },
    ],
  };

  const handleTerminate = (deviceId: string) => {
    console.log(deviceId);
  }
  return (
    <>
      <ScrollView
        className="p-4"
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="automatic"
      >
        <View className="flex-col gap-4">
          <View className={"w-full flex items-center justify-center"}>
            <View className="w-16 h-16 items-center justify-center p-4 border border-neutral-500 rounded-full">
              <DeviceIcon />
            </View>
          </View>

          {/* This Device */}
          <View className="flex-col gap-2">
            <SectionHeader title="THIS DEVICE" />
            <DeviceCard
              device={devices.current}
              onPress={setSelectedDevice}
            />

            <TerminateButton
              bg={"bg-white"}
              title={"Terminate all other sessions"}
              terminate={() => handleTerminate(devices.current?.id)}
              />
            <Text className="text-xs text-neutral-500">
              This will sign out all other devices and keep only this device active.
            </Text>
          </View>

          {/* active login sessions */}
          <View className="flex-col gap-2">
            <SectionHeader title="ACTIVE SESSIONS" />
           <View className={"flex-col gap-4"}>
             {devices.active.map((device) => (
               <DeviceCard
                 key={device.id}
                 device={device}
                 onPress={setSelectedDevice}
               />
             ))}
           </View>
          </View>
          <Text className="text-center text-sm text-neutral-500">
            Your sessions help keep your SRC account secure across all logged-in
            devices. Manage your activity to ensure your information stays protected.
          </Text>
        </View>
      </ScrollView>

      <FormModal
        visible={selectedDevice !== null}
        onClose={() => setSelectedDevice(null)}
        heightRatio={0.7}
      >
        <View className="w-full flex-col items-start gap-4">
            <View className="w-full items-start flex-col gap-2">
              <View className={"w-full flex items-center justify-center"}>
                <View
                  className="w-16 h-16 items-center justify-center p-4 border border-neutral-500 rounded-full">
                  <DeviceIcon />
                </View>
              </View>
              <Text className="text-2xl font-bold">
                {selectedDevice?.name}
              </Text>

              <DetailRow
                label="Last Active"
                value={selectedDevice?.lastActive}
              />
              <DetailRow
                label="Application"
                value={selectedDevice?.application}
              />
              <DetailRow
                label="Location"
                value={selectedDevice?.location}
                showBorder={false}
              />

              <Text className="text-start text-xs text-gray-500">
                Location is estimated from the device network and may not always be exact.
              </Text>
            </View>

           <TerminateButton
             title={"Terminate Session"}
             bg={"bg-gray-50"}
             terminate={ () => {
               handleTerminate(selectedDevice!.id )
               setSelectedDevice(null)
             }}
             />
        </View>
      </FormModal>
    </>
  );
};

export default LoginDevice;

const DeviceIcon = () => {
  return (
    <View className="h-12 w-8 rounded-lg bg-blue-500 p-1">
      <View className="flex-1 rounded bg-blue-800" />
    </View>
  );
};

const DeviceCard = ({ device, onPress }: DeviceCardProps) => (
  <Pressable
    onPress={() => onPress(device)}
    className="rounded-lg bg-white p-4"
    android_ripple={{ color: "#ddd" }}
  >
    <View className="flex-row items-start">
      <View className="mr-2">
        <DeviceIcon/>
      </View>
      <View className="flex-col gap-1">
        <Text className="text-lg font-semibold">{device.name}</Text>
        <Text className="text-sm">{device.application}</Text>
        <Text className="text-sm">
          {device.location} • {device.lastActive}
        </Text>
      </View>
    </View>
  </Pressable>
);

const SectionHeader = ({ title }: SectionHeaderProps) => (
  <Text className="text-xs font-semibold uppercase tracking-wide">
    {title}
  </Text>
);

const DetailRow = ({ label, value, showBorder = true }: DetailRowProps) => (
  <>
    <View className="">
      <Text className="text-sm text-neutral-400">{label}</Text>
      <Text className="text-base">{value}</Text>
    </View>
    {showBorder && <View className="h-px bg-white" />}
  </>
);

const TerminateButton = ({title, terminate, bg}: {title: string, bg: string, terminate: () => void}) => {
  return (
    <Pressable
      className={`w-full rounded-lg border border-neutral-100 p-4 ${bg}`}
      onPress={() => terminate()}>
      <Text className="text-center text-base font-medium text-red-500">{title}</Text>
    </Pressable>
  );
}
