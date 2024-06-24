import React, { useRef, useState } from 'react';
import styles from './styles.module.scss';
import { UserList } from '../../components/UserList';
import { RegistrationForm } from '../../components/RegistrationForm';
import { Header } from '../../components/Header';
import { Landing } from '../../components/Landing';

export const HomePage: React.FC = () => {
  const userListRef = useRef<{ fetchUsers: () => void }>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const handleUpdateUsers = () => {
    if (userListRef.current) {
      userListRef.current.fetchUsers();
    }
  };

  return (
    <div className={styles.container}>
      <Header />
      <Landing />
      <UserList
        ref={userListRef}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      <RegistrationForm onUpdateUsers={handleUpdateUsers} />
    </div>
  );
};
