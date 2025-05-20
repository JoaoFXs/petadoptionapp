import * as Yup from 'yup';

export interface LoginForm {
    username: string;
    email: string;
    password: string;
    passwordMatch?: string;
}

export const formScheme: LoginForm = {email: '', password: '', username: '', passwordMatch: ''};

export const loginValidationScheme = Yup.object().shape({
    email: Yup.string().trim().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required').min(8, 'Password must be at least 8 characters long!'),
  });

  export const signupValidationScheme = Yup.object().shape({
    username: Yup.string().required('Name is required'),
    email: Yup.string().trim().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required').min(8, 'Password must be at least 8 characters long!'),
    passwordMatch: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords must match!')
      .required('Please confirm your password'),
  });
  