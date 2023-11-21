import React from 'react';
import { Spinner } from 'react-bootstrap'; // You can use Bootstrap's Spinner component for loading animation
import './LoadingScreen.css'; // You can create a CSS file for custom styling

const LoadingScreen = () => {
    return (
        <div className="loading-screen">
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </div>
    );
};

export default LoadingScreen;
