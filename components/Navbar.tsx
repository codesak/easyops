"use client"
import React, { useState } from 'react';
import '../styles/Navbar.scss';
import { useRouter } from 'next/navigation'

const Navbar: React.FC = () => {
    const router = useRouter()

    return (
        <nav className='navbar'>
            <li onClick={()=>router.push("/")}>Home</li>
            <li onClick={()=>router.push("/add_customer")}>Add Customer</li>
        </nav>
    );
};

export default Navbar;
