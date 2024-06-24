import { useState, useEffect, useCallback } from 'react';
import { getUsers } from '../services/api';
import { IUser } from '../types/types';

const useUsers = (initialPage: number, initialCount: number) => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(initialPage);

  const loadUsers = useCallback(async (page: number, count: number) => {
    try {
      const response = await getUsers(page, count);
      setUsers((prevUsers) => [...prevUsers, ...response.data.users]);
      if (response.data.total_pages <= page) {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Failed to load users:', error);
    }
  }, []);

  useEffect(() => {
    loadUsers(1, initialCount);
  }, [loadUsers, initialCount]);

  useEffect(() => {
    if (currentPage > 1) {
      loadUsers(currentPage, initialCount);
    }
  }, [currentPage, loadUsers, initialCount]);

  const resetUsers = async () => {
    setUsers([]);
    setHasMore(true);
    setCurrentPage(1);
    await loadUsers(1, initialCount);
  };

  return {
    users,
    hasMore,
    currentPage,
    setCurrentPage,
    loadUsers,
    resetUsers,
  };
};

export default useUsers;
