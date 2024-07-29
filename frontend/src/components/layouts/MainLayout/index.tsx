'use client';
import { FC, PropsWithChildren } from 'react';
import { ToastContainer } from 'react-toastify';

import MainProvider from '@/providers/MainProvider';

import Sidebar from './Sidebar';
import classes from './index.module.scss';
import 'react-toastify/dist/ReactToastify.css';

const MainLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <MainProvider>
      <main className={classes.layout}>
        <Sidebar />
        <section>{children}</section>
      </main>
      <ToastContainer />
    </MainProvider>
  );
};

export default MainLayout;
