import React, { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import Trending from '../../Pages/Trending/Trending';
import Clothes from '../../Pages/Clothes/Clothes';
import Wallet from '../../Pages/Wallet/Wallet';
import Home from './../Home/Home';
import NewEmployeePage from '../../Pages/NewEmployee/NewEmployeePage';

const Main: FC = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/trending' element={<Trending />} />
                <Route path='/balance' element={<Wallet />} />
                <Route path='/clothes' element={<Clothes />} />
                <Route path='/new-employee' element={<NewEmployeePage />} />
            </Routes>
        </>
    );
};

export default Main;