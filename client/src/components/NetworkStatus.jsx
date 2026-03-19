import { useEffect } from 'react';
import toast from 'react-hot-toast';

function NetworkStatus() {
    useEffect(() => {
    const handleOnline = () => toast.success('Back online!');
    const handleOffline = () => toast.error('You are offline. Changes may not save!', { duration: 5000 });

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Check Signal Strength (Experimental API)
    if (navigator.connection) {
      const updateConnection = () => {
        const { effectiveType, saveData } = navigator.connection;
        if (effectiveType === '2g' || effectiveType === 'slow-2g') {
          toast('Slow connection detected. Page might load slowly.', { icon: '⚠️' });
        }
        
        if (saveData) {
            toast('Data Saver is on. High-res images may not load.', { icon: '📉' });
        }
      };

      navigator.connection.addEventListener('change', updateConnection);
    }
  return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);
}

export default NetworkStatus