import { useState, useEffect } from 'react';
import { getPositions } from '../services/api';
import { IPosition, IFormDataType } from '../types/types';
const usePositions = (initialFormData: IFormDataType) => {
  const [positions, setPositions] = useState<IPosition[]>([]);
  const [formData, setFormData] = useState<IFormDataType>(initialFormData);

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

  return { positions, formData, setFormData };
};

export default usePositions;
