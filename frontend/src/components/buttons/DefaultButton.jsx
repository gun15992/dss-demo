// Import Libraries
import React from 'react';
import { Button } from 'react-bootstrap';

// Default Buttons
export const BlueButton = ({ children, ...props }) => {
    return (
        <Button variant="primary" {...props}>
            {children}
        </Button>
    );
}
export const DarkButton = ({ children, ...props }) => {
    return (
        <Button variant="dark" {...props}>
            {children}
        </Button>
    );
}
export const GrayButton = ({ children, ...props }) => {
    return (
        <Button variant="secondary" {...props}>
            {children}
        </Button>
    );
}
export const GreenButton = ({ children, ...props }) => {
    return (
        <Button variant="success" {...props}>
            {children}
        </Button>
    );
}
export const LightBlueButton = ({ children, ...props }) => {
    return (
        <Button variant="info" {...props}>
            {children}
        </Button>
    );
}
export const LightButton = ({ children, ...props }) => {
    return (
        <Button variant="light" {...props}>
            {children}
        </Button>
    );
}
export const RedButton = ({ children, ...props }) => {
    return (
        <Button variant="danger" {...props}>
            {children}
        </Button>
    );
}
export const YellowButton = ({ children, ...props }) => {
    return (
        <Button variant="warning" {...props}>
            {children}
        </Button>
    );
}