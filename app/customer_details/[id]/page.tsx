"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios'
import '../../../styles/AddCustomer.scss';
import '../../../styles/Homepage.scss';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation'
import {AiOutlineDelete} from 'react-icons/ai'

const Form: React.FC = () => {
    const router = useRouter()
    const params = useParams()
    const [user, setUser] = useState<any>()
    console.log(user);
    
    

    useEffect(() => {
        const getUser = async () => {
          try {
            await axios.get(`http://localhost:4000/api/users/${params.id}`).then((res) => {
              setUser(res.data.result)
              
            })
          } catch (error) {
            console.log(error)
          }
        }
        getUser()
      }, [])
    

    const handleClick = async (id:any)=>{
        try {
          const userId = id
          await axios.delete(`http://localhost:4000/api/users/${userId}`).then((res) => {
            router.push('/')
          })
        } catch (error) {
          console.log(error)
        }
      }

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        gender: 'male', // Default value
    });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        console.log('Form data submitted:', formData);
        
            try {
              await axios.post('http://localhost:4000/api/users', formData).then((res) => {
                 console.log(res.data.users)
                 router.push("/")
              })
            } catch (error) {
              console.log(error)
            }
          
    };

    return (
<>
        <div className="card">
        <div className="details">
          <h2>Name: {`${user?.firstName}  ${user?.lastName}`}</h2>
          <p>Email: {user?.email}</p>
          <p>Phone: {user?.phone}</p>
          <p>Gender: {user?.gender}</p>
        </div>
      </div>
        <div className="form-container">
            <h2>Update Details</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group"> 
                    <label htmlFor="firstName">First Name:</label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="lastName">Last Name:</label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Phone:</label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="gender">Gender:</label>
                    <select
                        id="gender"
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <button type="submit">Submit</button>
                <div className='icon' onClick={()=>handleClick(params.id)}>Click Icon To Delete User :<AiOutlineDelete/></div>
            </form>
        </div>
        </>
    );
};

export default Form;
