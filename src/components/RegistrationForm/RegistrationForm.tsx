import React, { useState, useEffect } from 'react';
import { getPositions, registerUser } from '../../services/api';
import { Input } from '../Input';
import { validateEmail, validatePhone } from '../../utils/validation';
import styles from './styles.module.scss';
import { Button } from '../Button';
import {
  IPosition,
  IFormDataType,
  IErrorResponse,
  IRegistrationFormProps,
} from '../../types/types';

export const RegistrationForm: React.FC<IRegistrationFormProps> = ({
  onUpdateUsers,
}) => {
  const [positions, setPositions] = useState<IPosition[]>([]);
  const [formData, setFormData] = useState<IFormDataType>({
    name: '',
    email: '',
    phone: '',
    position_id: 0,
    photo: null,
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
    position_id: '',
    photo: '',
    server: '',
  });

  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    async function fetchPositions() {
      const response = await getPositions();
      setPositions(response.data.positions);

      if (response.data.positions.length > 0) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          position_id: response.data.positions[0].id,
        }));
      }
    }
    fetchPositions();
  }, []);

  useEffect(() => {
    const isNameValid = formData.name.trim() !== '';
    const isEmailValid = validateEmail(formData.email) === '';
    const isPhoneValid = validatePhone(formData.phone) === '';
    const isPositionValid = formData.position_id !== 0;
    const isPhotoValid = formData.photo !== null;

    setIsFormValid(
      isNameValid &&
        isEmailValid &&
        isPhoneValid &&
        isPositionValid &&
        isPhotoValid
    );
  }, [formData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'email') {
      setErrors({ ...errors, email: validateEmail(value) });
    } else if (name === 'phone') {
      setErrors({ ...errors, phone: validatePhone(value) });
    }

    setFormData({
      ...formData,
      [name]: name === 'position_id' ? parseInt(value) : value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData({ ...formData, photo: e.target.files[0] });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('phone', formData.phone);
    data.append('position_id', formData.position_id.toString());
    if (formData.photo) {
      data.append('photo', formData.photo);
    }

    try {
      const response = await registerUser(data);
      if (response.status === 201) {
        onUpdateUsers();
        setErrors({
          name: '',
          email: '',
          phone: '',
          position_id: '',
          photo: '',
          server: '',
        });

        setFormData({
          name: '',
          email: '',
          phone: '',
          position_id: 0,
          photo: null,
        });
      }
    } catch (error) {
      const err = error as IErrorResponse;
      console.log(err);
      setErrors((prevErrors) => ({
        ...prevErrors,
        server: err.response.data.message,
      }));
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1 className={styles.title}>Working with POST request</h1>
        <Input
          placeholder='Your name'
          value={formData.name}
          onChange={handleInputChange}
          name='name'
          errorText={errors.name}
        />
        <Input
          placeholder='Email'
          type='email'
          value={formData.email}
          onChange={handleInputChange}
          name='email'
          errorText={errors.email}
        />
        <Input
          placeholder='Phone'
          type='tel'
          value={formData.phone}
          onChange={handleInputChange}
          name='phone'
          errorText={errors.phone}
          helperText='+38 (XXX) XXX - XX - XX'
          format='^\+380\d{9}$'
        />
        <Input
          label='Position'
          type='radio'
          value={formData.position_id.toString()}
          onChange={handleInputChange}
          name='position_id'
          options={positions.map((position) => ({
            label: position.name,
            value: position.id.toString(),
          }))}
        />
        <Input
          label='Photo'
          type='file'
          onChange={handleFileChange}
          name='photo'
          fileName={formData.photo ? formData.photo.name : 'Upload your photo'}
        />
        {errors.server && (
          <span className={styles.errorMessage}>{errors.server}</span>
        )}
        <div className={styles.buttonContainer}>
          <Button
            className={styles.submitButton}
            type='submit'
            disabled={!isFormValid}
          >
            Sign up
          </Button>
        </div>
      </form>
    </div>
  );
};
