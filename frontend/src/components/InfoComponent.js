import React from 'react';

class InfoComponent extends React.Component {

    state = {
    };

    componentDidMount() {
    }

    renderAddress = () => {
        const incident = this.props.incident;
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

    render() {
        return (
            <div>
                <h2>Incident Information</h2>
                <p>Date/Time: TODO</p>
                <p>Location: { this.renderAddress() }</p>
                <p>Weather: TODO</p>
            </div>
        )
    }    
}

export default InfoComponent;
