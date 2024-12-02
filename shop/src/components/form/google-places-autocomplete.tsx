import { useState, useEffect, useMemo } from 'react';
import { Autocomplete, GoogleMap, MarkerF } from '@react-google-maps/api';
import { GoogleMapLocation } from '@/types';
import { useTranslation } from 'next-i18next';
import { SpinnerLoader } from '@/components/ui/loaders/spinner/spinner';
import { MapPin } from '@/components/icons/map-pin';
import useLocation, { locationAtom, fullAddressAtom } from '@/lib/use-location';
import CurrentLocation from '../icons/current-location';
import { useAtom } from 'jotai';
import Input from '../ui/forms/input';

export default function GooglePlacesAutocomplete({
  register,
  downtown,
  onChange,
  onChangeCurrentLocation,
  data,
  disabled = false,
}: {
  register: any;
  downtown: any;
  onChange?: () => void;
  onChangeCurrentLocation?: () => void;
  data?: GoogleMapLocation;
  disabled?: boolean;
}) {
  const { t } = useTranslation();
  const [inputValue, setInputValue] = useState('');
  const [
    onLoad,
    onUnmount,
    onPlaceChanged,
    getCurrentLocation,
    getCurrentLocationByPosition,
    isLoaded,
    loadError,
  ] = useLocation({
    downtown,
    onChange,
    onChangeCurrentLocation: onChangeCurrentLocation || onChange,
    setInputValue,
  });
  const [location] = useAtom(locationAtom);
  console.log('getLocation', location);
  useEffect(() => {
    const getLocation = data?.formattedAddress;
    setInputValue(getLocation!);
  }, [data]);

  if (loadError) {
    return <div>{t('common:text-map-cant-load')}</div>;
  }
  /*
  const downtown = {
    lat: -8.1119424,
    lng: -79.0288934,
  };
  */

  //-8.1119424,-79.0288934,708m
  const center = useMemo(
    () => ({
      lat: data?.lat || location?.lat || downtown?.lat,
      lng: data?.lng || location?.lng || downtown?.lng,
    }),
    [location, data],
  );

  const containerStyle = {
    //widthMin: '350px',
    height: '400px',
  };

  return isLoaded ? (
    <div className="relative">
      {/* 
      <div className="absolute top-0 left-0 flex h-12 w-10 items-center justify-center text-gray-400">
        <MapPin className="w-[18px]" />
      </div>*/}
      <Autocomplete
        onLoad={onLoad}
        onPlaceChanged={onPlaceChanged}
        onUnmount={onUnmount}
        fields={[
          'address_components',
          'geometry.location',
          'formatted_address',
        ]}
        types={['address']}
      >
        <input
          type="text"
          {...register('location')}
          placeholder={t('common:placeholder-search-location')}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className={`line-clamp-1 flex h-12 w-full appearance-none items-center rounded border border-border-base p-4 pr-9 text-sm font-medium text-heading transition duration-300 ease-in-out invalid:border-red-500 focus:border-accent focus:outline-0 focus:ring-0 ${
            disabled ? 'cursor-not-allowed border-[#D4D8DD] bg-[#EEF1F4]' : ''
          }`}
          disabled={disabled}
        />
      </Autocomplete>
      <div className="absolute top-0 right-0 flex h-12 w-12 items-center justify-center text-accent">
        <CurrentLocation
          className="h-5 w-5 cursor-pointer hover:text-accent"
          onClick={() => {
            getCurrentLocation();
            setInputValue(location?.formattedAddress!);
          }}
        />
      </div>
      <br />
      <div>
        <GoogleMap
          //onMapClick={() => {}}

          onClick={(e) => {
            getCurrentLocationByPosition({
              lat: e.latLng?.lat(),
              lng: e.latLng?.lng(),
            });
          }}
          //parseFloat
          mapContainerStyle={containerStyle}
          //@ts-ignore
          center={center}
          zoom={16}
          options={{
            zoomControl: true,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
        >
          <MarkerF
            draggable
            //@ts-ignore
            position={center}
            onDragEnd={(e) => {
              getCurrentLocationByPosition({
                lat: e.latLng?.lat(),
                lng: e.latLng?.lng(),
              });
            }}
          />
        </GoogleMap>
      </div>
    </div>
  ) : (
    <SpinnerLoader />
  );
}
