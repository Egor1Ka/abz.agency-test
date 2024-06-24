import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import styles from './styles.module.scss';
import { IInputProps } from '../../types/types';

export const Input: React.FC<IInputProps> = ({
  label,
  helperText,
  errorText,
  value,
  onChange,
  name,
  type = 'text',
  options,
  fileName,
  placeholder,
  format,
}) => {
  const [localErrorText, setLocalErrorText] = useState<string | undefined>(
    errorText
  );

  useEffect(() => {
    if (type === 'tel' && format && value) {
      const regex = new RegExp(format.replace(/X/g, '\\d'));
      if (!regex.test(value.toString())) {
        setLocalErrorText('Invalid phone number format');
      } else {
        setLocalErrorText(undefined);
      }
    } else {
      setLocalErrorText(errorText);
    }
  }, [value, format, errorText, type]);

  return (
    <div
      className={classNames(styles['input-container'], {
        [styles.error]: !!localErrorText,
      })}
    >
      <label className={styles.label}>{label}</label>
      {type === 'radio' && options ? (
        options.map((option) => (
          <label key={option.value} className={styles.radioLabel}>
            <input
              type='radio'
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={onChange}
              className={styles.radioInput}
            />
            <span
              className={classNames(styles.radioCustom, {
                [styles.checked]: value === option.value,
              })}
            ></span>
            {option.label}
          </label>
        ))
      ) : type === 'file' ? (
        <div className={styles.fileInputContainer}>
          <input
            type='file'
            id={name}
            name={name}
            onChange={onChange}
            className={styles.fileInput}
          />
          <label htmlFor={name} className={styles.fileInputLabel}>
            Upload
          </label>
          <span className={styles.fileName}>{fileName}</span>
        </div>
      ) : (
        <input
          type={type}
          className={styles.input}
          value={value}
          onChange={onChange}
          name={name}
          placeholder={placeholder}
        />
      )}
      <div className={styles['helper-text']}>
        {localErrorText ? localErrorText : helperText}
      </div>
    </div>
  );
};
