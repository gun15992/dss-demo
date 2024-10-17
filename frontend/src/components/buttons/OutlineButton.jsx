// Import Libraries
import React from 'react';
import { Button } from 'react-bootstrap';

// Outline Buttons
export const BlueOutlineButton = ({ children, ...props }) => {
    return (
        <Button variant="outline-primary" {...props}>
            {children}
        </Button>
    );
}
export const DarkOutlineButton = ({ children, ...props }) => {
    return (
        <Button variant="outline-dark" {...props}>
            {children}
        </Button>
    );
}
export const GrayOutlineButton = ({ children, ...props }) => {
    return (
        <Button variant="outline-secondary" {...props}>
            {children}
        </Button>
    );
}
export const GreenOutlineButton = ({ children, ...props }) => {
    return (
        <Button variant="outline-success" {...props}>
            {children}
        </Button>
    );
}
export const LightBlueOutlineButton = ({ children, ...props }) => {
    return (
        <Button variant="outline-info" {...props}>
            {children}
        </Button>
    );
}
export const LightOutlineButton = ({ children, ...props }) => {
    return (
        <Button variant="outline-light" {...props}>
            {children}
        </Button>
    );
}
export const RedOutlineButton = ({ children, ...props }) => {
    return (
        <Button variant="outline-danger" {...props}>
            {children}
        </Button>
    );
}
export const YellowOutlineButton = ({ children, ...props }) => {
    return (
        <Button variant="outline-warning" {...props}>
            {children}
        </Button>
    );
}