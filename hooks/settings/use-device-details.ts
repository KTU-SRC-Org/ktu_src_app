import { useState, useEffect } from 'react';
import * as Device from 'expo-device';
import * as Location from 'expo-location';

export type DeviceLocation = {
  latitude: number | null;
  longitude: number | null;
  city: string | null;
  country: string | null;
};

export type DeviceInfo = {
  name: string | null;
  model: string | null;
  brand: string | null;
  os: string;
  osVersion: string | null;
  location: DeviceLocation;
};

export const useDeviceDetails = () => {
  const [info, setInfo] = useState<DeviceInfo | null>(null);

  useEffect(() => {
    const load = async () => {
      // Device Info
      const name = Device.deviceName ?? null;
      const model = Device.modelName ?? null;
      const brand = Device.brand ?? null;
      const os = Device.osName ?? 'Unknown';
      const osVersion = Device.osVersion ?? null;

      // Location Info
      let latitude = null;
      let longitude = null;
      let city: string | null = null;
      let country: string | null = null;

      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status === 'granted') {
        const pos = await Location.getCurrentPositionAsync({});
        latitude = pos.coords.latitude;
        longitude = pos.coords.longitude;

        // Reverse geocode  city + country
        const geo = await Location.reverseGeocodeAsync({
          latitude,
          longitude,
        });

        if (geo.length > 0) {
          const g = geo[0];
          city = g.city ?? null;
          country = g.country ?? null;
        }
      }

      setInfo({
        name,
        model,
        brand,
        os,
        osVersion,
        location: {
          latitude,
          longitude,
          city,
          country,
        },
      });
    };

    load();
  }, []);

  return info;
};
