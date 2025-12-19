import React from 'react';
import { useNavigate } from 'react-router';
import useRole from '../../../hooks/useRole';

const ForbiddenPage = () => {
    const navigate = useNavigate();
    const { role } = useRole()

    const handleGoHome = () => {
        navigate('/'); // Navigate to the public homepage
    };

    const handleGoBack = () => {
        navigate('/dashboard'); // Navigate one step back in history
    };

    return (
        <div style={styles.container}>
            <div style={styles.content}>
                <span style={styles.icon}>🔒</span>
                <h1 style={styles.title}>403 - Access Denied</h1>
                <p style={styles.message}>
                    You do not have the necessary permissions to view this page.
                </p>
                <p style={styles.suggestion}>
                    If you believe this is an error, please contact support.
                </p>
                <div style={styles.buttonGroup}>
                    <button onClick={handleGoHome} style={styles.homeButton}>
                        Go to Home
                    </button>
                    <button onClick={handleGoBack} style={styles.backButton}>
                        Go to Dashboard
                    </button>
                </div>
            </div>
        </div>
    );
};

// Simple inline styles for a clean, centered look
const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '80vh',
        textAlign: 'center',
        backgroundColor: '#f8f9fa',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
    },
    content: {
        backgroundColor: '#fff',
        padding: '40px 60px',
        borderRadius: '10px',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
        maxWidth: '500px',
    },
    icon: {
        fontSize: '4em',
        marginBottom: '10px',
    },
    title: {
        fontSize: '3em',
        color: '#dc3545', // Bootstrap Danger Red
        margin: '10px 0',
    },
    message: {
        fontSize: '1.2em',
        color: '#343a40',
        marginBottom: '15px',
    },
    suggestion: {
        fontSize: '1em',
        color: '#6c757d',
        marginBottom: '30px',
    },
    buttonGroup: {
        display: 'flex',
        justifyContent: 'center',
        gap: '15px',
    },
    homeButton: {
        padding: '10px 20px',
        backgroundColor: '#007bff', // Bootstrap Primary Blue
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '1em',
        transition: 'background-color 0.3s',
    },
    backButton: {
        padding: '10px 20px',
        backgroundColor: '#6c757d', // Bootstrap Secondary Gray
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '1em',
        transition: 'background-color 0.3s',
    }
};

export default ForbiddenPage;