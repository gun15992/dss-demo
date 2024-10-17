// Import Libraries
import React from 'react';
import { Form } from 'react-bootstrap';

// Default Buttons
export const Searchbox = ({ ...props }) => {
    return (
        <Form.Control type="text" {...props} />
    );
}