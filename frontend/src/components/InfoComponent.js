import React from 'react';

class InfoComponent extends React.Component {

    state = {
    };

    CONDITIONS_MAP = new Map([
        [null, 'Not Given'],
        [1, 'Clear'],
        [2, 'Fair'],
        [3, 'Cloudy'],
        [4, 'Overcast'],
        [5, 'Fog'],
        [6, 'Freezing Fog'],
        [7, 'Light Rain'],
        [8, 'Rain'],
        [9, 'Heavy Rain'],
        [10, 'Freezing Rain'],
        [11, 'Heavy Freezing Rain'],
        [12, 'Sleet'],
        [13, 'Heavy Sleet'],
        [14, 'Light Snowfall'],
        [15, 'Snowfall'],
        [16, 'Heavy Snowfall'],
        [17, 'Rain Shower'],
        [18, 'Heavy Rain Shower'],
        [19, 'Sleet Shower'],
        [20, 'Heavy Sleet Shower'],
        [21, 'Snow Shower'],
        [22, 'Heavy Snow Shower'],
        [23, 'Lightning'],
        [24, 'Hail'],
        [25, 'Thunderstorm'],
        [26, 'Heavy Thunderstorm'],
        [27, 'Storm'],
    ]);

    componentDidMount() {
    }

    renderAddress = () => {
        const incident = this.props.incidentJson;
        let a = 'None';
        if (incident !== null && incident.address !== undefined) {
            const addressHasLine1 = (incident.address.address_line1 !== undefined);
            const addressHasCity = (incident.address.city !== undefined);
            const addressHasState = (incident.address.state !== undefined);
            if (addressHasLine1) {
                a = incident.address.address_line1;
                if (addressHasCity || addressHasState) {
                    a = a + ", "
                }
            }
            if (addressHasCity) {
                a = a + incident.address.city
                if (addressHasState) {
                    a = a + " "
                }
            }
            if (addressHasState) {
                a = a + incident.address.state
            }
        }
        return <span>{a}</span>;
    }

    findWeatherDataBucket() {
        let incidentTime = this.props.incidentJson.description.event_opened.substring(11, 19);
        let weatherByHour = this.props.meteostatJson.data;
        // find the "hour bucket" for the time of the incident
        for (var i = 0; i < weatherByHour.length - 1; i++) {
            if (weatherByHour[i].time_local.substring(11) < incidentTime
                    && weatherByHour[i+1].time_local.substring(11) < incidentTime) {
                return weatherByHour[i];
            }
        }
        // shouldn't reach here, if the JSON is good
        return null;
    }

    renderDateTime() {
        if (this.props.meteostatJson === undefined || this.props.meteostatJson == null) {
            return <span>None</span>
        } else {
            let incidentDate = this.props.incidentJson.description.event_opened.substring(0, 10);
            let incidentTime = this.props.incidentJson.description.event_opened.substring(11, 19);
            return <span>{ incidentDate } { incidentTime }</span>
        }
    }

    renderAirTemperature() {
        if (this.props.meteostatJson === undefined || this.props.meteostatJson == null) {
            return <span>None</span>
        } else {
            let weather = this.findWeatherDataBucket();
            return <span>{ weather.temp }&deg;C</span>
        }
    }

    renderWeatherCondition() {
        if (this.props.meteostatJson === undefined || this.props.meteostatJson == null) {
            return <span>None</span>
        } else {
            let weather = this.findWeatherDataBucket();
            return <span>{ this.CONDITIONS_MAP.get(weather.coco) }</span>
        }
    }

    render() {
        return (
            <div className="information-div">
                <h2>Incident Information</h2>
                <p>Date/Time: { this.renderDateTime() }</p>
                <p>Location: { this.renderAddress() }</p>
                <p>Air Temperature: { this.renderAirTemperature() }</p>
                <p>Weather Condition: { this.renderWeatherCondition() }</p>
            </div>
        )
    }    
}

export default InfoComponent;
