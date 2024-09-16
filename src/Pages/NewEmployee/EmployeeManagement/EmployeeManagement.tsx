import React, { FC, useState, useEffect } from 'react';
import styles from './EmployeeManagement.module.scss';
import { Input, InputAdornment, ListItemButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import EmployeeForm from '../EmployeeForm/EmployeeForm';
import StaffRow from '../EmployeeRow/StaffRow';

export interface Staff {
    id: number;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    role: string;
    photo?: string;
}

export interface RoleDetails {
    id: number;
    role: string;
    team: string[];
    isActive: boolean;
    staff: Staff[];
}

const EmployeeManagement: FC = () => {
    const loadStaffFromLocalStorage = () => {
        const storedStaffList = localStorage.getItem('staffList');
        return storedStaffList ? JSON.parse(storedStaffList) : [];
    };

    const [staffList, setStaffList] = useState<RoleDetails[]>(loadStaffFromLocalStorage);
    const [selectedRole, setSelectedRole] = useState<string>('');
    const [searchText, setSearchText] = useState<string>('');

    useEffect(() => {
        const staffListWithoutPhotos = staffList.map(role => ({
            ...role,
            staff: role.staff.map(person => ({
                id: person.id,
                firstName: person.firstName,
                lastName: person.lastName,
                phoneNumber: person.phoneNumber,
                role: person.role,
            })),
        }));

        localStorage.setItem('staffList', JSON.stringify(staffListWithoutPhotos));
    }, [staffList]);


    const updateSelectedRole: React.Dispatch<React.SetStateAction<string>> = (role) => {
        const newRole = typeof role === 'function' ? role(selectedRole) : role;
        setSelectedRole(newRole);
        setStaffList(prevList =>
            prevList.map(item => ({
                ...item,
                isActive: false,
            }))
        );
    };

    const toggleRoleActive = (index: number) => {
        const updatedList = [...staffList];
        updatedList[index].isActive = !updatedList[index].isActive;
        setStaffList(updatedList);
    };

    const filteredStaff = staffList.filter(item =>
        item.staff.some(person =>
            `${person.firstName} ${person.lastName}`.toLowerCase().includes(searchText.toLowerCase())
        )
    );

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.wrapper}>
                    <div className={styles.box}>
                        <h2 className={styles.title}>Новый сотрудник</h2>
                        <EmployeeForm
                            updateStaffList={setStaffList}
                            staffList={staffList}
                            setSelectedRole={updateSelectedRole}
                            selectedRole={selectedRole}
                        />
                    </div>
                    <div className={styles.box}>
                        <Input
                            placeholder="Поиск сотрудника"
                            className={styles.search_employee}
                            disableUnderline
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            startAdornment={
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            }
                            endAdornment={
                                <ListItemButton>
                                    <InputAdornment position="end">
                                        <FilterListIcon />
                                    </InputAdornment>
                                </ListItemButton>
                            }
                        />
                        <h2 className={styles.title}>Все сотрудники</h2>
                        <ul className={styles.list}>
                            {filteredStaff.map((item, index) => (
                                <StaffRow
                                    key={index}
                                    data={item}
                                    onToggleActive={() => toggleRoleActive(index)}
                                    selectedRole={selectedRole}
                                />
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default EmployeeManagement;
