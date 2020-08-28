import React from 'react';

import InfoComponent from '../components/InfoComponent';
import MapComponent from '../components/MapComponent';

class IncidentDisplayComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            rawJson: '',
            incidentJson: null,
            meteostatJson: null,
            errorMessage: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleShowIncidentClick = this.handleShowIncidentClick.bind(this);
    }

    handleChange(event) {
        this.setState({
            rawJson: event.target.value
        });
    }

    async handleShowIncidentClick(event) {
        // first clear the error message
        this.setState({
            errorMessage: ''
        });
        // check if something was entered at all
        if (0 === this.state.rawJson.trim().length) {
            this.setState({
                rawJson: '',
                incidentJson: null,
                meteostatJson: null,
                errorMessage: 'Come on, please enter raw JSON for incident!'
            })
        } else {
            // try to parse the JSON, show error message if it's invalid
            try {
                const json = JSON.parse(this.state.rawJson);
                await this.setState({ incidentJson: json });
            }
            catch (e) {
                this.setState({
                    rawJson: '',
                    incidentJson: null,
                    meteostatJson: null,
                    errorMessage: 'Unable to parse the JSON, please check its validity and try again.'
                })
                return;
            }

            // call meteostat and get weather for date/time
            const requestOptions = {
                method: 'GET',
                headers: {
                    'x-api-key': this.meteostatKey()
                }
            };
            // perform fetch and receive meteostat data
            let res;
            try {
                res = await fetch(this.buildMeteostatFetchLink(), requestOptions);
            } catch (ex) {
                this.setState({ errorMessage: ex.toString() });
            }

            if (res === undefined) {
                this.setState({ errorMessage: 'Failed to fetch Meteostat data.  Response undefined' });
            } else {
                if (res.status === 200) {
                    const json = await res.json();
                    this.setState({ meteostatJson: json });
                } else {
                    this.setState({ errorMessage: `Failed to retrieve Meteostat data.  Status code=${res.status}` });
                }
            }
        }
    }

    meteostatKey = () => {
        return process.env.REACT_APP_METEOSTAT_API_KEY;
    }

    buildMeteostatFetchLink() {
        let eventOpened = this.state.incidentJson.description.event_opened;
        let url = `https://api.meteostat.net/v2/point/hourly` +
            `?lat=${ this.state.incidentJson.address.latitude }` +
            `&lon=${ this.state.incidentJson.address.longitude }` +
            `&start=${ eventOpened.substring(0, 10) }` +
            `&end=${ eventOpened.substring(0, 10) }` +
            `&tz=${ this.state.incidentJson.fire_department.timezone }`
        ;
        return url;
    }

    componentDidMount() {
    }

    renderErrorMessage = () => {
        if (this.state.errorMessage === null || 0 === this.state.errorMessage.length) {
            return <div></div>
        } else {
            return <div className="errorMessage">{this.state.errorMessage}</div>
        }
    }

    render() {
        return (
            <div>
                <div className="collect-data-div">
                    <h2>Enter Incident</h2>
                    { this.renderErrorMessage() }
                    <label>Enter (or paste) the raw JSON for the incident:</label>
                    <textarea className="full" value={this.state.rawJson} onChange={this.handleChange} />
                    <button onClick={this.handleShowIncidentClick}>Show Incident Details</button>
                </div>
                <InfoComponent incidentJson={this.state.incidentJson} meteostatJson={this.state.meteostatJson} />
                <MapComponent incident={this.state.incidentJson} />
            </div>
        )
    }    
}

export default IncidentDisplayComponent;
