import React from 'react';
import styles from '../styles/page.module.css';

interface StatusIndicatorProps {
  status: boolean | null;
}

const StatusIndicator: React.FC<StatusIndicatorProps> = ({ status }) => {
  return (
    <div className={styles.statusIndicator}>
      {status === null ? (
        <p>Verification in progress...</p>
      ) : status ? (
        <p className={styles.success}>✔ Verified</p>
      ) : (
        <p className={styles.error}>✘ Not Verified</p>
      )}
    </div>
  );
};

export default StatusIndicator;
