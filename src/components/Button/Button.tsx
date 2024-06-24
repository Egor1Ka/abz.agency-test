import React from 'react';
import classNames from 'classnames';
import styles from './styles.module.scss';
import { IButtonProps } from '../../types/types';
export const Button: React.FC<IButtonProps> = ({
  children,
  className,
  onClick,
  ...props
}) => {
  return (
    <button
      className={classNames(styles.button, className)}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};
