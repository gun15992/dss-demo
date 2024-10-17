// Import Libraries
import React from 'react';

// Default Badges
export const BlueBadge = ({ children, ...props }) => {
    return (
        <span className="badge bg-primary" {...props}>
            {children}
        </span>
    );
}
export const GrayBadge = ({ children, ...props }) => {
    return (
        <span className="badge bg-secondary" {...props}>
            {children}
        </span>
    );
}
export const GreenBadge = ({ children, ...props }) => {
    return (
        <span className="badge bg-success" {...props}>
            {children}
        </span>
    );
}
export const RedBadge = ({ children, ...props }) => {
    return (
        <span className="badge bg-danger" {...props}>
            {children}
        </span>
    );
}
export const YellowBadge = ({ children, ...props }) => {
    return (
        <span className="badge bg-warning" {...props}>
            {children}
        </span>
    );
}
export const LightBlueBadge = ({ children, ...props }) => {
    return (
        <span className="badge bg-info" {...props}>
            {children}
        </span>
    );
}
export const LightBadge = ({ children, ...props }) => {
    return (
        <span className="badge bg-light text-dark" {...props}>
            {children}
        </span>
    );
}
export const DarkBadge = ({ children, ...props }) => {
    return (
        <span className="badge bg-dark" {...props}>
            {children}
        </span>
    );
}