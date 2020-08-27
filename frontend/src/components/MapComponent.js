import React from 'react';
import GoogleMapReact from 'google-map-react';
import LocationPin from 'google-map-react';

import '../components/MapComponent.css';

class MapComponent extends React.Component {

    state = {
        zoomLevel: 14
    };

    componentDidMount() {
    }

    googleMapsKey = () => {
        return process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
    }

    noMap = () => {
        return (
            <div className="map-div">
                <h2>Map</h2>
            </div>
        )
    }

    showMap = (location, zoomLevel) => {
        return (
            <div className="map-div">
                <h2>Map</h2>
                <div className="google-map">
                    <GoogleMapReact
                        center={location}
                        zoom={zoomLevel}
                        defaultCenter={location}
                        defaultZoom={zoomLevel}
                        bootstrapURLKeys={{key: this.googleMapsKey() }}
                    >
                        <LocationPin
                            lat={location.lat}
                            lng={location.lng}
                            text={location.address}
                        />
                    </GoogleMapReact>
                </div>
            </div>
        )
    }

    render() {
        if (this.props.incident === undefined || this.props.incident === null) {
            return this.noMap()
        } else {
            return this.showMap({ lat: this.props.incident.address.latitude, lng: this.props.incident.address.longitude }, this.state.zoomLevel)
        }
    }    
}

export default MapComponent;
