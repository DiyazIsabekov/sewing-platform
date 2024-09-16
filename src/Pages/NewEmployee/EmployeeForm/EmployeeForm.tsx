import React, { FC, useState } from 'react';
import { Box, FormControl, InputLabel, TextField, Button, FormLabel, Checkbox, FormControlLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import styles from './EmployeeForm.module.scss';
import PhotoUpload from './../PhotoUpload/PhotoUpload';
import { Staff, RoleDetails } from '../EmployeeManagement/EmployeeManagement';

interface EmployeeFormProps {
    updateStaffList: React.Dispatch<React.SetStateAction<RoleDetails[]>>;
    staffList: RoleDetails[];
    setSelectedRole: React.Dispatch<React.SetStateAction<string>>;
    selectedRole: string;
}

const EmployeeForm: FC<EmployeeFormProps> = ({ updateStaffList, staffList, setSelectedRole, selectedRole }) => {
    const [team, setTeam] = useState<string>('');
    const [formData, setFormData] = useState<Staff>({
        id: 0,
        firstName: '',
        lastName: '',
        phoneNumber: '',
        role: '',
        photo: ''
    });

    const handleTeamChange = (event: SelectChangeEvent<string>) => {
        setTeam(event.target.value);
        if (event.target.value === '') {
            setSelectedRole(formData.role);
        } else {
            setSelectedRole('');
        }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleRoleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newRole = event.target.value;
        setSelectedRole(newRole);
        setTeam('');
        setFormData(prev => ({
            ...prev,
            role: newRole,
        }));
    };

    const handleFormSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const { firstName, lastName, phoneNumber, role, photo } = formData;
        const selectedTeamId = team ? Number(team) : null;

        if (firstName && lastName && phoneNumber && role && photo) {
            const newStaff: Staff = {
                id: Date.now(),
                firstName,
                lastName,
                phoneNumber,
                role,
                photo
            };

            if (selectedTeamId) {
                const updatedList = staffList.map(item => {
                    if (item.id === selectedTeamId) {
                        return {
                            ...item,
                            staff: [...item.staff, newStaff],
                            team: [...item.team, firstName],
                        };
                    }
                    return item;
                });
                updateStaffList(updatedList);
            } else {
                const activeTeams = staffList.filter(item => item.isActive && item.role === "Швея");
                if (activeTeams.length > 0) {
                    const updatedList = staffList.map(item => {
                        if (item.isActive && item.role === "Швея") {
                            return {
                                ...item,
                                team: [...item.team, firstName],
                                staff: [...item.staff, newStaff]
                            };
                        }
                        return item;
                    });
                    updateStaffList(updatedList);
                } else {
                    const newRoleDetails: RoleDetails = {
                        id: Date.now(),
                        role,
                        team: [firstName],
                        isActive: false,
                        staff: [newStaff]
                    };
                    updateStaffList(prev => [...prev, newRoleDetails]);
                }
            }
        } else {
            alert('Please fill out all fields.');
        }
    };

    return (
        <Box className={styles.form} component="form" onSubmit={handleFormSubmit}>
            <PhotoUpload updateFormValues={setFormData} formValues={formData} />
            <div className={styles.container}>
                <FormControl className={styles.input} variant="outlined" fullWidth>
                    <InputLabel className={styles.label} htmlFor="firstName">Имя</InputLabel>
                    <TextField
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        fullWidth
                        placeholder="Иван"
                        required
                    />
                </FormControl>
                <FormControl className={styles.input} variant="outlined" fullWidth>
                    <InputLabel className={styles.label} htmlFor="lastName">Фамилия</InputLabel>
                    <TextField
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        fullWidth
                        placeholder="Иванов"
                        required
                    />
                </FormControl>
                <FormControl className={styles.input} variant="outlined" fullWidth>
                    <InputLabel className={styles.label} htmlFor="phoneNumber">Телефон</InputLabel>
                    <TextField
                        id="phoneNumber"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        fullWidth
                        placeholder="+7"
                        required
                    />
                </FormControl>
                <FormControl>
                    <FormLabel id="role">Роль</FormLabel>
                    <div className={styles.roleGroup}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={formData.role === "Раскройщик"}
                                    onChange={handleRoleChange}
                                    value="Раскройщик"
                                />
                            }
                            label="Раскройщик"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={formData.role === "Технолог"}
                                    onChange={handleRoleChange}
                                    value="Технолог"
                                />
                            }
                            label="Технолог"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={formData.role === "Швея"}
                                    onChange={handleRoleChange}
                                    value="Швея"
                                />
                            }
                            label="Швея"
                        />
                    </div>
                </FormControl>
                <FormControl fullWidth>
                    <FormLabel id="team">Объединить в бригаду</FormLabel>
                    <Select
                        labelId="team"
                        id="team"
                        value={team}
                        onChange={handleTeamChange}
                    >
                        <MenuItem value=''>Отменить</MenuItem>
                        {
                            formData.role === 'Швея' ?
                                staffList.filter(item => item.role === 'Швея')
                                    .map(item => (
                                        <MenuItem key={item.id} value={item.id.toString()}>
                                            {item.team.length <= 1 ? `${item.team.join(', ')} - Швея` : `${item.team.join(', ')} - Team`}
                                        </MenuItem>
                                    ))
                                :
                                <MenuItem value='' disabled>Нет результатов</MenuItem>
                        }
                    </Select>
                </FormControl>
                <Button type="submit" variant="contained" color="primary" className={styles.submitButton}>
                    Добавить
                </Button>
            </div>
        </Box>
    );
};

export default EmployeeForm;
