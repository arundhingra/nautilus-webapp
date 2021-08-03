import React from 'react';
import { Button, Alert } from 'react-bootstrap';


class NautilusAlert extends React.Component {

    render() {
        return (
            <>
            {this.props.show ?
                <Alert variant="danger" onClose={this.props.handleClose} dismissible>
                    <Alert.Heading>Internal Server Error</Alert.Heading>
                    <p>
                        Would you like to retry?                
                    </p>
                    <Button variant='secondary' onClick={this.props.handleClick}>Retry</Button>
                </Alert>
                : <div/>}
            </>
        );
    }
}

export default NautilusAlert;