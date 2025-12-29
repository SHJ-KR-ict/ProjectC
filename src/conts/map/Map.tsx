import React, { useEffect, useState } from 'react'

const Map: React.FC = () => {
    const [address, setAddress] = useState<string>('');
    useEffect(() => {
        const { naver } = window;

        if (naver && naver.maps && document.getElementById('map')) {
            const mapOptions = {
                center: new naver.maps.LatLng(37.5666103, 126.9783882),
                zoom: 14,
            };
            const map = new naver.maps.Map('map', mapOptions);
            const marker = new naver.maps.Marker({
                position: mapOptions.center,
                map: map
            });
            naver.maps.Event.addListener(map, 'click', (e: any) => {
                const clickedLatLng = e.coord;
                marker.setPosition(clickedLatLng);
                naver.maps.Service.reverseGeocode({
                    coords: clickedLatLng,
                    orders: [
                        naver.maps.Service.OrderType.ADDR,
                        naver.maps.Service.OrderType.ROAD_ADDR
                    ].join(',')
                }, (status: any, response: any) => {
                    if (status !== naver.maps.Service.Status.OK) {
                        return alert('주소를 찾을 수 없습니다.');
                    }
                    const items = response.v2.results;
                    if (items.length > 0) {
                        const res = items[0];
                        const addr = `${res.region.area1.name} ${res.region.area2.name} ${res.region.area3.name} ${res.land.number1 || ''}`;
                        setAddress(addr);
                        console.log("변환된 주소:", addr);
                    }
                });
            });
        }
    }, []);
    return (
        <div>
            <div style={{textAlign:'center'}}>
                <div id="map" style={{ width: '50%', height: '400px', marginLeft:'280px'}} />
                <p>{address}</p>
            </div>
        </div>
    )
}

export default Map