'use client';

import { useState } from 'react';
import { RenderIf, InputText, Button, useNotification, FieldError } from '@/components';
import { LoginForm, signupValidationScheme, loginValidationScheme, formScheme } from './formScheme';
import { Credentials, AccessToken, User } from '@/resources/user/user.resource';
import { useAuth } from '@/resources';
import { useFormik } from 'formik';

interface LoginProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Login({ isOpen, onClose }: LoginProps) {
  const [newUserState, setNewUserState] = useState(false);
  const auth = useAuth();
  const notification = useNotification();

  function closeModal() {
    onClose();
  }

  async function onSubmit(values: LoginForm) {
    if (!newUserState) {
      const credentials: Credentials = { email: values.email, password: values.password };
      try {
        const response: AccessToken = await auth.authenticate(credentials);
        auth.initSession(response);
        notification.notify('Login success', 'success');
        closeModal();
      } catch (error: any) {
        notification.notify(error?.message, 'error');
      }
    } else {
      const user: User = { 
        photo: values.photo, 
        username: values.username, 
        email: values.email, 
        password: values.password 
      };
      
      try {
        const formData = new FormData();
        formData.append("username", values.username);
        formData.append("email", values.email);
        formData.append("password", values.password);
        if (values.photo) {
          formData.append("photo", values.photo);
        }
        
        await auth.save(formData);
        notification.notify('User created successfully', 'success');
        resetForm();
        closeModal();
      } catch (error: any) {
        notification.notify(error?.message, 'error');
      }
    }
  }

  const { values, handleChange, handleSubmit, errors, resetForm } = useFormik<LoginForm>({
    initialValues: formScheme,
    validationSchema: newUserState ? signupValidationScheme : loginValidationScheme,
    onSubmit: onSubmit
  });

  return (
    isOpen && (
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
        onClick={(e) => e.target === e.currentTarget && closeModal()}
      >
        <div className="sm:mx-auto sm:w-full sm:max-w-sm bg-white p-6 rounded-2xl shadow-lg w-full max-w-sm relative">
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl"
          >
            ×
          </button>

          <h2 className="text-center text-xl font-bold leading-9 tracking-tight text-gray-900 mb-4">
            {newUserState ? 'Create New User' : 'Login to Your Account'}
          </h2>
              
                  <form onSubmit={handleSubmit} className="space-y-4"> 
                    
                    {/** Photo register and preview */}
                    <RenderIf condition={newUserState}>   
                      <div className="flex flex-col items-center gap-2">
                        <div className="flex justify-center mb-4">
                          <label htmlFor="photo" className="cursor-pointer relative">
                            <img
                              src={
                                values.photo && typeof values.photo !== 'string'
                                  ? URL.createObjectURL(values.photo)
                                  : 'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg' 
                              }
                              alt="Profile"
                              className="w-24 h-24 rounded-full object-cover border-2 border-gray-300 hover:opacity-80 transition"
                            />
                            <input
                              type="file"
                              id="photo"
                              accept="image/*"
                              onChange={(e) => {
                                if (e.currentTarget.files && e.currentTarget.files[0]) {
                                  handleChange({
                                    target: {
                                      id: "photo",
                                      value: e.currentTarget.files[0],
                                    },
                                  } as any);
                                }
                              }}
                              className="hidden"
                            />
                            <span className="absolute bottom-0 right-0 bg-gray-200 p-1 rounded-full shadow hover:bg-gray-300">
                              <svg className="w-4 h-4 text-gray-800" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M17.414 2.586a2 2 0 010 2.828l-9.192 9.192a1 1 0 01-.293.195l-4 2a1 1 0 01-1.316-1.316l2-4a1 1 0 01.195-.293l9.192-9.192a2 2 0 012.828 0z" />
                              </svg>
                            </span>
                        </label>
                      </div>
                      <FieldError error={errors.photo} />
                    </div>
                    </RenderIf> 
                    <RenderIf condition={newUserState}>    
                        <InputText
                            type="text"
                            id="username"
                            value={values.username}
                            onChange={handleChange}
                            placeholder="Name"
                            style="w-full"
                        />    
                       <FieldError error={errors.username}/>
                    </RenderIf>

                    <InputText
                          type="text"
                          id="email"
                          value={values.email}
                          onChange={handleChange}
                          placeholder="Email"
                          style="w-full"
                    />    
                    <FieldError error={errors.email}/>
                     <InputText
                          type="password"
                          id="password"
                          value={values.password}
                          onChange={handleChange}
                          placeholder="Password"
                          style="w-full"
                          onlyPassword={true}
                      />          
                      <FieldError error={errors.password}/>  
                 
                    <RenderIf condition={newUserState}>    
                      <InputText
                          type="password"
                          id="passwordMatch"
                          value={values.passwordMatch}
                          onChange={handleChange}
                          placeholder="Confirm Your Password"
                          style="w-full"
                      />   
                      <FieldError error={errors.passwordMatch}/> 
                    </RenderIf>   

                    <div className="flex items-center justify-between"> 

                      <RenderIf condition={!newUserState}>  
                        <Button
                          type='submit'
                          color='bg-green-600 text-white hover:bg-green-700 mr-3'
                          label='Login'
                        />   
                        <Button
                          type='button'
                          onClick={() => setNewUserState(true)}
                          color='bg-yellow-600 text-white hover:bg-yellow-700'
                          label='Register'
                        />   

                      
                      </RenderIf> 

                      <RenderIf condition={newUserState}>

                        <Button
                          type='submit'
                          color='bg-green-600  text-white hover:bg-green-700 mr-3'
                          label='Save'
                        />                    

                        <Button
                          type='button'
                          onClick={() => setNewUserState(false)}
                          color='bg-red-600 mr-3 text-white hover:bg-red-700'
                          label='Cancel'
                        />    
                      </RenderIf>
                    </div>
                  </form>
            </div>
    </div>      
  ));

}
