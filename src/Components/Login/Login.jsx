import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import app from '../../firebase/firebase.config';
import { Link } from 'react-router-dom';

const auth  = getAuth(app);

const Login = () => {
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const emailRef = useRef();


    const handleLogin = event =>{
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        setError('');
        console.log(email, password);
        signInWithEmailAndPassword(auth, email, password)
        .then(result=>{
           const loggedUser = result.user;
           console.log(loggedUser)
           if(!loggedUser.emailVerified){
            alert('Please vefied your Email')
            return;
           }
           setSuccess('User login successfull');
           setError('');
        })
        .catch(error=>{
            setError(error.message)
        })
    };

    const handleResetpassword = event =>{
           const email = emailRef.current.value;
           if(!email){
            alert('please enter your email to reaet password')
            return;
           }
           sendPasswordResetEmail(auth, email)
           .then(()=>{
            alert('please Check your Email')
           })
           .catch(error=>{
            console.log(error)
            setError(error.message)
           })
    }
    return (
        <div>
            <h1 className='text-center text-primary'>Please Login</h1>
              <Form onSubmit={handleLogin} className='w-25 mx-auto mt-2'>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" name='email' ref={emailRef} placeholder="Enter email" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name='password' placeholder="Password" required/>
                </Form.Group>
                <p className='text-danger'>{error}</p>
                <p className='text-success'>{success}</p>
                <Button variant="primary" type="submit">
                    Login
                </Button>
            </Form> 
            <p className='text-center'><small>Forget Password ? <Button variant="warning" onClick={handleResetpassword} className='btn btn-link' >Reset</Button></small></p>
            <p className='text-center'><small>New To This website? Please Register <Link to="/register">Register</Link></small></p>
        </div>
    );
};
//  ASD123@skb
export default Login;