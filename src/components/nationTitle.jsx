import React, { Component, PropTypes } from 'react';

class NationTitle extends Component {
    render() {
        return (
            <div style={{ width: '1200px', margin: '0 auto', height: '60px', color: '#565656', background: '#FECC39', borderRadius: '10px', fontSize: "30px", display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 30 }}>{this.props.title}</div>
        )
    }
}

export default NationTitle