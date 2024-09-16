import React, { FC } from 'react';
import styles from './NewEmployeePage.module.scss'
import NewEmployeeCard from './EmployeeManagement/EmployeeManagement';

const NewEmployeePage: FC = () => {
    return (
        <section className={styles.container}>
            <div className={styles.wrapper}>
                <NewEmployeeCard />
            </div>
        </section>
    );
};

export default NewEmployeePage;