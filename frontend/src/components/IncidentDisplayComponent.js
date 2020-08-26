import React from 'react';

import InfoComponent from '../components/InfoComponent';
import MapComponent from '../components/MapComponent';

class IncidentDisplayComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            rawJson: '',
            incidentJson: null,
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

    handleShowIncidentClick(event) {
        // first clear the error message
        this.setState({
            errorMessage: ''
        });
        // check if something was entered at all
        if (0 === this.state.rawJson.trim().length) {
            this.setState({
                errorMessage: 'Come on, please enter raw JSON for incident!'
            })
        } else {
            // try to parse the JSON, show error message if it's invalid
            try {
                const json = JSON.parse(this.state.rawJson);
                this.setState({
                    incidentJson: json
                });
            }
            catch (e) {
                this.setState({
                    errorMessage: 'Unable to parse the JSON, please check its validity and try again.'
                })
            }
        }
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
                <InfoComponent incident={this.state.incidentJson} />
                <MapComponent incident={this.state.incidentJson} />
            </div>
        )
    }    
}

export default IncidentDisplayComponent;
