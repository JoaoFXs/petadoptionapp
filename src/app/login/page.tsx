'use client';

import { useState } from 'react';
import { RenderIf, Template } from '@/components';
import { InputText } from '@/components/tools/InputText';

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
                            placeHolder="Name"
                            style="w-full"
                        />    
                    </RenderIf>

                    <InputText
                          type="text"
                          id="email_temp"
                          onChange={() => {}}
                          placeHolder="Email"
                          style="w-full"
                    />    
                     <InputText
                          type="password"
                          id="password_temp"
                          onChange={() => {}}
                          placeHolder="Password"
                          style="w-full"
                      />    
                    <RenderIf condition={newUserState}>    
                      <InputText
                          type="password"
                          id="passwordMatch_temp"
                          placeHolder="Confirm Your Password"
                          style="w-full"
                      />   
                    </RenderIf>   

                    <div className="flex items-center justify-between">  
                      
                    <RenderIf condition={!newUserState}>
                      <button
                        type="submit"
                        className="w-full mr-3 bg-green-600 text-white py-2 rounded-md hover:bg-green-700"
                      >
                        Login
                      </button>
                        <button
                        type="submit"
                        onClick={() => setNewUserState(true)}
                        className="w-full bg-yellow-600 text-white py-2 rounded-md hover:bg-yellow-700"
                         >
                        Register
                      </button>
                    </RenderIf>

                    <RenderIf condition={newUserState}>
                      <button
                        type="submit"
                        className="w-full bg-green-600 mr-3 text-white py-2 rounded-md hover:bg-green-700"
                      >
                        Save
                      </button>

                      <button
                        type="submit"
                        className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700"
                        onClick={() => setNewUserState(false)}
                      >
                        Cancel
                      </button>
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
