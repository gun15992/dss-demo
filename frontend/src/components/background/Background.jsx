// Import Libraries
import React from 'react';

// Import Assets
import '@assets/css/components/background/Background.css';

// Import Utilities
import { getPublicUrl } from '../../utils/getUrl';

export const ModernBackground = ({ children, ...props }) => {
    return (
        <div className="modern-background" {...props}>
            <div className="sub-modern-background">
                <div className="bg-shape1 bg-teal opacity-50 bg-blur"></div>
                <div className="bg-shape2 bg-primary opacity-50 bg-blur"></div>
                <div className="bg-shape1 bg-purple opacity-50 bg-blur"></div>
            </div>
            {children}
        </div>
    );
}
