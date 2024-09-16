import React, { FC } from 'react';
import { Avatar, Switch, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import styles from './StaffRow.module.scss';
import { RoleDetails } from '../EmployeeManagement/EmployeeManagement';


interface StaffRowProps {
    data: RoleDetails;
    onToggleActive: () => void;
    selectedRole: string;
}

const StaffRow: FC<StaffRowProps> = ({ data, onToggleActive, selectedRole }) => {
    return (
        <li className={`${styles.row} ${selectedRole === 'Швея' && selectedRole === data.role ? styles.rowActive : ''}`}>
            <div className={styles.avatarContainer}>
                {data.staff.map(member => (
                    <Avatar
                        key={member.id}
                        className={styles.avatar}
                        src={member.photo}
                    >
                        {!member.photo && `${member.firstName[0]}${member.lastName[0]}`}
                    </Avatar>
                ))}
                <span className={styles.name}>
                    {data.staff.map(member => `${member.firstName} `).join(', ')}
                </span>
            </div>
            <div className={styles.role}>{data.team.length > 1 ? 'Швея' : data.role}</div>
            <div className={styles.actions}>
                {data.role === 'Швея' && (
                    <Switch
                        checked={data.isActive}
                        onChange={onToggleActive}
                        color="success"
                        className={styles.switch}
                    />
                )}
                <IconButton className={styles.editButton}>
                    <EditIcon />
                </IconButton>
            </div>
        </li>
    );
};

export default StaffRow;
