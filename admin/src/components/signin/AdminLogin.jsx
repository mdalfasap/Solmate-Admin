
import React ,{useEffect} from 'react';
import FormElements from './FormElements';
import toast, { Toaster } from 'react-hot-toast';
import { loginUser } from '../../helper/helper';
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const motionText = ['email', 'password'];
  const buttonText = 'Login';
const navigate=useNavigate()
const token = localStorage.getItem("token");
useEffect(()=>{
  if (token){
    navigate('/usermanagement')
  }
},[token])
  const linkText = 'Register';
  const handleSubmit = async (e, formValues) => {
    e.preventDefault();

    const loadingToastId = toast.loading(<b>Logging in...</b>);

    try {
      // Send login details to the backend
      const response = await loginUser(formValues);

      const successMessage = response.msg ? response.msg : 'Logged in successfully!';

      const delay = new Promise((resolve) => setTimeout(resolve, 1000));

      await Promise.all([response, delay]);

      toast.dismiss(loadingToastId);

      // Show the success toast
      toast.success(<b>{successMessage}</b>, {
        duration: 2000,
      });

      // Navigate to the desired page after successful login
      setTimeout(() => {
        // Redirect to the dashboard or home page
        navigate('/administration'); // Update with your desired route
      }, 1000);
    } catch (error) {
      console.error('Error during login:', error);

      toast.dismiss(loadingToastId);

      toast.error(<b>{error.error || 'Could not log in..!!'}</b>);
    }
  };

  return (
    <>
    <Toaster />
    <FormElements
      motionText={motionText}
      buttonText={buttonText}
      additionalText='Don’t have an account ?'
      linkText={linkText}
      urlRegister='/adminregister'
      handleSubmit={(e, formValues) => handleSubmit(e, formValues)}
    />
    </>
  );
};

export default Login;
