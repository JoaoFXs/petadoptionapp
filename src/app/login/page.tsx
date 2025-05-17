'use client';

import { useState } from 'react';
import { RenderIf, Template, InputText, Button, EyeButton} from '@/components';


export default function Login() {
  const [isOpen, setIsOpen] = useState(true); // Mostra o popup por padrão
  const [newUserState, setNewUserState] = useState(false); // Estado para controlar se é um novo usuário
  const closeModal = () => setIsOpen(false);

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
              
                  <form className="space-y-4"> 
                    <RenderIf condition={newUserState}>    
                        <InputText
                            type="text"
                            id="name_temp"
                            onChange={() => {}}
                            placeholder="Name"
                            style="w-full"
                        />    
                       
                    </RenderIf>

                    <InputText
                          type="text"
                          id="email_temp"
                          onChange={() => {}}
                          placeholder="Email"
                          style="w-full"
                    />    
                     <InputText
                          type="password"
                          id="password_temp"
                          onChange={() => {}}
                          placeholder="Password"
                          style="w-full"
                          onlyPassword={true}
                      />            
                 
                    <RenderIf condition={newUserState}>    
                      <InputText
                          type="password"
                          id="passwordMatch_temp"
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
