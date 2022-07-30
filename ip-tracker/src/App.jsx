import React from 'react'
import './App.css'
import { MapContainer , TileLayer,Marker,Popup } from 'react-leaflet'
import { useState , useRef } from 'react'
import getLocation from './call'

export default function App() {
    const input = useRef()
    const [Info, setInfo] = useState({location:""});
    const [handlePopup, sethandlePopup] = useState(false)

    async function setLocation(){
        let locationT = await getLocation(input.current.value)
        console.log(locationT)
        setInfo(locationT);
        sethandlePopup(!handlePopup)
    }
    return (
    <div className='container'>
        <nav>
            <h1>IP ADDRESS TRACKER</h1>
            <div className='input-control'>
                <input ref={input} id='input' type='text' name='search' placeholder='Type IP or click the button to check your info'/>
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
        <MapContainer center={[51.505, -0.09]} zoom={15} scrollWheelZoom={true}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {handlePopup ? <Marker position={[Info.location.lat , Info.location.lng]}>
                <Popup>
                    Gotcha
                </Popup>
            </Marker> :
            <Marker position={[20 , 20]}>
                <Popup>
                    It will look like this.
                </Popup>
            </Marker>
            }
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