import React from 'react';
import GoogleMapReact from 'google-map-react';
import LocationPin from 'google-map-react';

import '../components/MapComponent.css';

class MapComponent extends React.Component {

    // const location = {
    //     address: '1600 Amphitheatre Parkway, Mountain View, california.',
    //     lat: 37.42216,
    //     lng: -122.08427,
    //   }

    state = {
        location: {
            address: '1600 Amphitheatre Parkway, Mountain View, california.',
            lat: 37.42216,
            lng: -122.08427,
        },
        zoomLevel: 14
    };

    componentDidMount() {
        console.log('mounted');
        if (this.props.incident === undefined) {
            console.log('incident undefined');
        } else if (this.props.incident === null) {
            console.log('incident null');
        } else {
            console.log('lat=' + this.props.incident.address.latitude);
            console.log('long=' + this.props.incident.address.longitude);
        }
    }

    googleMapsKey = () => {
        return process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
    }

    showMap = (location, zoomLevel) => {
        console.log('entered here, key=' + this.googleMapsKey());
        return (
            <div className="map">
                <h2 className="map-h2">Map</h2>
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
        console.log('rendered map, location=' + JSON.stringify(this.state.location));
        return this.showMap(this.state.location, this.state.zoomLevel)
    }    
}

export default MapComponent;
