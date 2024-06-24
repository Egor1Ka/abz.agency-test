import React, {
  useEffect,
  useState,
  useRef,
  useImperativeHandle,
  forwardRef,
  useCallback,
} from 'react';
import { getUsers } from '../../services/api';
import { UserCard } from '../UserCard';
import styles from './styles.module.scss';
import { Button } from '../Button';
import { IUser, IUserListRef, IUserListProps } from '../../types/types';

export const UserList = forwardRef<IUserListRef, IUserListProps>(
  ({ currentPage, setCurrentPage }, ref) => {
    const [users, setUsers] = useState<IUser[]>([]);
    const [hasMore, setHasMore] = useState(true);

    const loadUsers = useCallback(async (page: number, count: number) => {
      try {
        const response = await getUsers(page, count);
        if (page === 1) {
          setUsers(response.data.users);
        } else {
          setUsers((prevUsers) => [...prevUsers, ...response.data.users]);
        }
        if (response.data.total_pages <= page) {
          setHasMore(false);
        }
      } catch (error) {
        console.error('Failed to load users:', error);
      }
    }, []);

    useEffect(() => {
      loadUsers(1, 6);
    }, []);

    useEffect(() => {
      if (currentPage > 1) {
        loadUsers(currentPage, 6);
      }
    }, [currentPage, loadUsers]);

    useImperativeHandle(ref, () => ({
      fetchUsers: async () => {
        loadUsers(1, users.length + 6);
      },
    }));

    return (
      <div className={styles.container}>
        <div className={styles.userList}>
          <h2 className={styles.title}>Working with GET request</h2>
          <div className={styles.cards}>
            {users.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>
          {hasMore && (
            <Button
              className={styles.showMore}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Show more
            </Button>
          )}
        </div>
      </div>
    );
  }
);
