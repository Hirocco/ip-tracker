import React from 'react'
import './App.css'
import { MapContainer , TileLayer,Marker,Popup } from 'react-leaflet'
import { useState , useRef } from 'react'
import getLocation from './call'

export default function App() {
    const input = useRef()
    const [Info, setInfo] = useState({location:""});
    const mapRef = useRef()

    let location = [51.505, -0.09];

    async function setLocation(){
        let locationT = await getLocation(input.current.value)
        console.log(locationT)
        setInfo(locationT);
        handleOnFlyTo(locationT.location.lat , locationT.location.lng)

    }
    function handleOnFlyTo(lat,lng){
        mapRef.current.flyTo([lat,lng],14,{
            duration:2
        });
        location = [lat,lng]
    }

    return (
    <div className='container'>
        <nav>
            <h1>IP ADDRESS TRACKER</h1>
            <div className='input-control'>
                <input type='number' ref={input} id='input' name='search' placeholder='Type IP or click the button to check your info'/>
                <button onClick={setLocation} className='search-btn'><svg xmlns="http://www.w3.org/2000/svg" width="10" height="14"><path fill="none" stroke="#FFF" strokeWidth="3" d="M2 1l6 6-6 6"/></svg></button>
            </div>
            <div className='results'>
                <div className='tile'>
                    <p className='res-header'>IP ADDRESS:</p>
                    <p className='info'>{Info.ip}</p>
                </div>
                <div className='tile'>
                    <p className='res-header'>LOCATION:</p>
                    <p className='info'>{Info.location.city} {Info.postalcode}</p>
                </div>
                <div className='tile'>
                    <p className='res-header'>TIMEZONE:</p>
                    <p className='info'>{Info.location.timezone}</p>
                </div>
                <div className='tile' style={{border:"none"}}>
                    <p className='res-header'>ISP:</p>
                    <p className='info'>{Info.isp}</p>
                </div>
            </div>
        </nav>
        <MapContainer ref={mapRef} center={location} zoom={10} scrollWheelZoom={true}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
        </MapContainer>
    </div>
  )
}

/*
<Marker
key = {something.id}
position = {[something.latitude , sometihng.longitude]}>
</Marker>
*/