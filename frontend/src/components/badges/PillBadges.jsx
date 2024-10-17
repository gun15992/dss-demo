// Import Libraries
import React from 'react';

// Pill Badges
export const BluePillBadge = ({ children, ...props }) => {
    return (
        <span className="badge rounded-pill bg-primary" {...props}>
            {children}
        </span>
    );
}
export const GrayPillBadge = ({ children, ...props }) => {
    return (
        <span className="badge rounded-pill bg-secondary" {...props}>
            {children}
        </span>
    );
}
export const GreenPillBadge = ({ children, ...props }) => {
    return (
        <span className="badge rounded-pill bg-success" {...props}>
            {children}
        </span>
    );
}
export const RedPillBadge = ({ children, ...props }) => {
    return (
        <span className="badge rounded-pill bg-danger" {...props}>
            {children}
        </span>
    );
}
export const YellowPillBadge = ({ children, ...props }) => {
    return (
        <span className="badge rounded-pill bg-warning" {...props}>
            {children}
        </span>
    );
}
export const LightBluePillBadge = ({ children, ...props }) => {
    return (
        <span className="badge rounded-pill bg-info" {...props}>
            {children}
        </span>
    );
}
export const LightPillBadge = ({ children, ...props }) => {
    return (
        <span className="badge rounded-pill bg-light text-dark" {...props}>
            {children}
        </span>
    );
}
export const DarkPillBadge = ({ children, ...props }) => {
    return (
        <span className="badge bg-dark" {...props}>
            {children}
        </span>
    );
}