import React from 'react';
import styles from './styles.module.scss';
import { IUserCardProps } from '../../types/types';

export const UserCard: React.FC<IUserCardProps> = ({ user, key }) => {
  return (
    <div className={styles.card} key={key}>
      <img src={user.photo} alt={user.name} className={styles.photo} />
      <div className={styles.details}>
        <h2 className={styles.name}>{user.name}</h2>
        <p className={styles.position}>{user.position}</p>
        <p className={styles.email}>{user.email}</p>
        <p className={styles.phone}>{user.phone}</p>
      </div>
    </div>
  );
};
