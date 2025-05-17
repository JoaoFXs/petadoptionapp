'use client';

import { useState } from 'react';
import { Template } from '@/components';
import { InputText } from '@/components/tools/InputText';

export default function Login() {
  const [isOpen, setIsOpen] = useState(true); // Mostra o popup por padrão
  const [newUserState, setNewUserState] = useState(true); // Estado para controlar se é um novo usuário
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
                      <InputText
                          type="text"
                          id="name_temp"
                          placeHolder="Name"
                          style="w-full"
                      />    
                      <InputText
                          type="text"
                          placeHolder="Email"
                          style="w-full"
                      />    
                     <InputText
                          type="text"
                          placeHolder="Password"
                          style="w-full"
                      />    
                      <input
                        type="text"
                        placeholder="Email"
                        className="w-full px-4 py-2 border rounded-md"
                      />
                      <input
                        type="password"
                        placeholder="Password"
                        className="w-full px-4 py-2 border rounded-md"
                      />
                      <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
                      >
                        Entrar
                      </button>
                  </form>
            </div>
          </div>
        )}
      </Template>
    </div>
  );
}
