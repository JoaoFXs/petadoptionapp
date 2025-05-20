'use client';

import { useState } from 'react';
import { RenderIf, Template, InputText, Button, EyeButton, useNotification} from '@/components';
import { LoginForm, signupValidationScheme, loginValidationScheme, formScheme} from './formScheme'
import { Credentials, AccessToken, User } from '@/resources/user/user.resource'
import { useAuth} from '@/resources'
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
export default function Login() {
  const [isOpen, setIsOpen] = useState(true); // Mostra o popup por padrão
  const [newUserState, setNewUserState] = useState(false); // Estado para controlar se é um novo usuário
  const closeModal = () => setIsOpen(false);

  const auth = useAuth();
  const router = useRouter();
  const notification = useNotification();
  async function onSubmit(values: LoginForm){
    if (!newUserState) {
        const credentials: Credentials = { email: values.email, password: values.password};
        try{
            const response: AccessToken = await auth.authenticate(credentials);
            auth.initSession(response);
            console.log("Session is valid? ", auth.isSessionValid());
            notification.notify('Login success','success');
            router.push('/');
        } catch (error: any) {
            notification.notify(error?.message, 'error');
      }
    }
    else{
      const user: User = { username: values.username, email: values.email, password: values.password};
      try{
        await auth.save(user);
        notification.notify('User created successfully', 'success');
        resetForm();
        setNewUserState(false);
      }
      catch (error: any) {
        notification.notify(error?.message, 'error');
      }
    }
  }

  const {values, handleChange, handleSubmit, errors, resetForm} = useFormik<LoginForm>({
    initialValues: formScheme,
    validationSchema: newUserState ? signupValidationScheme : loginValidationScheme,
    onSubmit: onSubmit
  });
  
  return (
    <div>
      <Template>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm bg-white p-6 rounded-2xl shadow-lg w-full max-w-sm relative">

                <button
                  onClick={closeModal}
                  className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-xl"
                >
                  ×
                </button>      

          
                <h2 className="text-center text-xl font-bold leading-9 tracking-tight text-gray-900 mb-4">
                    {newUserState ? 'Create New User' : 'Login to Your Account'}
                </h2>
              
                  <form onSubmit={handleSubmit} className="space-y-4"> 
                    <RenderIf condition={newUserState}>    
                        <InputText
                            type="text"
                            id="username"
                            value={values.username}
                            onChange={handleChange}
                            placeholder="Name"
                            style="w-full"
                        />    
                       
                    </RenderIf>

                    <InputText
                          type="text"
                          id="email"
                          value={values.email}
                          onChange={handleChange}
                          placeholder="Email"
                          style="w-full"
                    />    
                     <InputText
                          type="password"
                          id="password"
                          value={values.password}
                          onChange={handleChange}
                          placeholder="Password"
                          style="w-full"
                          onlyPassword={true}
                      />            
                 
                    <RenderIf condition={newUserState}>    
                      <InputText
                          type="password"
                          id="passwordMatch"
                          value={values.passwordMatch}
                          onChange={handleChange}
                          placeholder="Confirm Your Password"
                          style="w-full"
                      />   
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
        )}
      </Template>
    </div>
  );
}
