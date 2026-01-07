import React, { useEffect, useRef } from 'react';


export const AddressMap = ({ address }: { address: string }) => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { naver } = window as any;
    if (!naver || !mapRef.current) return;

    naver.maps.Service.geocode({ query: address }, (status: any, response: any) => {
      if (status === naver.maps.Service.Status.OK) {
        const { x, y } = response.v2.addresses[0];
        const location = new naver.maps.LatLng(y, x);
        
        const map = new naver.maps.Map(mapRef.current!, {
          center: location,
          zoom: 15
        });

        new naver.maps.Marker({ position: location, map });
      }
    });
  }, [address]);

  return <div ref={mapRef} style={{ width: '100%', height: '300px' }} />;
};