import React, { FC, useRef } from 'react';
import { Button } from '@mui/material';
import { ReactComponent as CameraIcon } from '../../../assets/img/addCamera.svg';
import styles from './PhotoUpload.module.scss';
import { Staff } from '../EmployeeManagement/EmployeeManagement';

interface PhotoUploadProps {
    updateFormValues: React.Dispatch<React.SetStateAction<Staff>>;
    formValues: Staff;
}

const PhotoUpload: FC<PhotoUploadProps> = ({ updateFormValues, formValues }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                const fileURL = reader.result as string;
                updateFormValues(prev => ({
                    ...prev,
                    photo: fileURL,
                }));
            };
            reader.readAsDataURL(file);
        }

        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <div className={styles.box}>
            <input
                accept="image/*"
                style={{ display: 'none' }}
                id="file-input"
                type="file"
                onChange={handleFileChange}
                ref={fileInputRef}
            />
            <label htmlFor="file-input">
                {formValues.photo ? (
                    <img className={styles.img} src={formValues.photo} alt="Profile" />
                ) : (
                    <Button
                        className={styles.btn}
                        component="span"
                        startIcon={<CameraIcon />}
                    />
                )}
            </label>
        </div>
    );
};

export default PhotoUpload;
