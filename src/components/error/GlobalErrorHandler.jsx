import React, { useEffect } from 'react';
function GlobalErrorHandler() {
    useEffect(() => {
        const onError = (event) => {
            event.preventDefault();
            const error = event.error || new Error('Unknown error');
            console.error(error);
            // Log the error to an error tracking service
            // Show a notification to the user
        };
        window.addEventListener('error', onError);
        return () => window.removeEventListener('error', onError);
    }, []);
    useEffect(() => {
        const onUnhandledRejection = (event) => {
            event.preventDefault();
            const error = event.reason || new Error('Unknown error');
            console.error(error);
            // Log the error to an error tracking service
            // Show a notification to the user
        };
        window.addEventListener('unhandledrejection', onUnhandledRejection);
        return () => window.removeEventListener('unhandledrejection', onUnhandledRejection);
    }, []);
    useEffect(() => {
        const onFetchError = (event) => {
            event.preventDefault();
            const error = new Error('Fetch error');
            console.error(error);
            // Log the error to an error tracking service
            // Show a notification to the user
        };
        window.addEventListener('fetch', (event) => {
            event.response.catch((error) => {
                onFetchError(error);
            });
        });
    }, []);
    return null;
}
export default GlobalErrorHandler;
