import React, { useEffect } from 'react';
import FormElements from './FormElements';
import { registerUser } from '../../helper/helper';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const motionText = ['email', 'firstName', 'lastName', 'password', 'confirmPassword'];
  const token = localStorage.getItem("token");
  useEffect(()=>{
    if (token){
      navigate('/usermanagement')
    }
  },[token])
  const handleSubmit = async (e, formValues) => {
    e.preventDefault();

    const loadingToastId = toast.loading(<b>Creating...</b>);

    try {
      const response = await registerUser(formValues);
      const successMessage = response.msg ? response.msg : 'Registered successfully!';

      const delay = new Promise((resolve) => setTimeout(resolve, 1000));

      await Promise.all([response, delay]);

      toast.dismiss(loadingToastId);

      toast.success(<b>{successMessage}</b>, {
        duration: 2000,
      });


      setTimeout(() => {
        navigate('/');
      },1000);
    } catch (error) {
      console.error('Error during registration:', error);

      toast.dismiss(loadingToastId);

      toast.error(<b>{error.error || 'Could not register..!!'}</b>);
    }
  };

  return (
    <>
      <Toaster />
      <FormElements
        motionText={motionText}
        buttonText='Register'
        additionalText='Already have an account ?'
        linkText='Login'
        urlLogin='/'
        handleSubmit={(e, formValues) => handleSubmit(e, formValues)}
      />
    </>
  );
};

export default Register;
