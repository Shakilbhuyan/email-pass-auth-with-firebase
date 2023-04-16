import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {createUserWithEmailAndPassword, getAuth, sendEmailVerification, updateProfile} from 'firebase/auth';
import app from '../../firebase/firebase.config';
import { Link } from 'react-router-dom';

const Regiser = () => {
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    
    const auth = getAuth(app);
    const handleSubmit = (event) => {
        event.preventDefault();
        setSuccess('');
        setError('');
        const email = event.target.email.value;
        const password = event.target.password.value;
        const name = event.target.name.value
        console.log(name, email, password)

        if(!/(?=.*[A-Z])/.test(password)){
            setError('Please add Atlest One uppercase')
            return;
        }
        else if(!/(?=.*[0-9].*[0-9])/.test(password)){
            setError('please add Two number');
            return;
        }
        else if(password.length<6){
            setError('Please Enter atlest 6 letter')
        }
        else if(!/(?=.*[!@#$%^&*])/.test(password)){
            setError('Please add Atlest One of the Character from "!@#$%^&*"');
            return;
        }
        createUserWithEmailAndPassword(auth, email, password)
        .then(result =>{
            const loggedUser = result.user;
            console.log(loggedUser)
            setError('');
            event.target.reset();
            setSuccess('User has created Successfully');
            VerificationEmail(loggedUser)
            updateUserData(result.user, name);
        })
        .catch(error=>{
            console.log(error.message);
            setError(error.message);
        })
    }
     
     const VerificationEmail = (user) =>{
        sendEmailVerification(user)
        .then(result =>{
            console.log(result)
            alert('please verify tour E-mail')
        })
     }

     const updateUserData =(user, name) =>{
         updateProfile(user, {
            displayName : name
         })
         .then(()=>{
            console.log('user name Updated')
         })
         .catch(error=>{
            setError(error.message)
         })
     }
    // const handleEmailChange = (event) => {
    //     console.log(event.target.value)
    // }

    // const handlePasswordBlur = (event) => {
    //     console.log(event.target.value)
    // }
    return (
        <div>
            <h4 className='text-primary text-center'>Please Register!!</h4>
            <Form onSubmit={handleSubmit} className='w-50 mx-auto mt-2'>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" name='name' placeholder="Enter Your name" required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" name='email' placeholder="Enter email" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name='password' placeholder="Password" required/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Accept Terms & Condition" />
                </Form.Group>
                <p className='text-danger'>{error}</p>
                <p className='text-primary'>{success}</p>
                <Button variant="primary" type="submit">
                    Register
                </Button>
            </Form>
            <p className='text-center'><small>Allready Registered? <Link to="/login">Login</Link></small></p>
        </div>
    );
};

export default Regiser;