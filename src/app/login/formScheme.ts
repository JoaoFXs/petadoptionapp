import * as Yup from 'yup';

export interface LoginForm {
    photo: string | Blob;
    username: string;
    email: string;
    password: string;
    passwordMatch?: string;
}


export const formScheme: LoginForm = {email: '', password: '', username: '', passwordMatch: '', photo: ''};

export const loginValidationScheme = Yup.object().shape({
    email: Yup.string().trim().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required').min(8, 'Password must be at least 8 characters long!'),
  });

  export const signupValidationScheme = Yup.object().shape({
     photo: Yup.mixed<Blob>()
    .required('Select an Image to Upload!')
    .test('size', 'File size cannot be higher than 20 MB', (file) => {
        return file.size < 20000000
    })
    .test('type', 'Accpeted formats: JPEG,GIF or PNG', (file) => {
        return file.type == 'image/jpeg' || file.type == 'image/png' || file.type == 'image/gif'
    }),
    username: Yup.string().required('Name is required'),
    email: Yup.string().trim().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required').min(8, 'Password must be at least 8 characters long!'),
    passwordMatch: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords must match!')
      .required('Please confirm your password'),
  });
  