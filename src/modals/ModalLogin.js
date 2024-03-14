import React, { Fragment, useState, useContext } from 'react';
import { Dialog, Transition } from '@headlessui/react'
import { GetDebugLvl } from "../config/Entorno";
import { useTranslation } from 'react-i18next';
import { Login } from '../components/Api';
import UserContext from '../contexts/UserContext';
import { useNavigate } from "react-router-dom";

const ModalLogin = (props) => {
  // eslint-disable-next-line
  const DebugLvl = GetDebugLvl();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [Password, setPassword] = useState('');
  const { loginCtx } = useContext(UserContext)

  const manejarKeyPress = (event) => {
    if (event.key === 'Enter') {
      LoginUser();
    }
  };

  function CloseButtonImg (props) {
    return (
      <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    )
  }

  async function LoginUser () {
    const response = await Login(props.jugador.dorsal, Password)
    if (DebugLvl >= 2) console.log("LoginUser:", response)
    if (response == null) {
      setPassword('')
      alert(t("Incorrect password"))
    } else {
      if (DebugLvl >= 2) console.log("Token:", response.token)
      const UserData = {
        _id: props.jugador._id,
        dorsal: props.jugador.dorsal,
        nombre: props.jugador.nombre,
        posicion: props.jugador.posicion,
        token: response.token
      }
      if (await loginCtx(UserData)) navigate('/UserPanel')
      props.closeModal()
    }
  }

  return (
    <Transition appear show={props.isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={props.closeModal}>
        <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
              <Dialog.Panel className="transform overflow-hidden rounded-xl bg-black text-left align-middle shadow-[#7209B7] shadow-xl transition-all">
                <Dialog.Title as="div" className="p-1 flex flex-row text-lg font-bold text-black rounded-t-lg bg-[#7209B7]">
                  <div className="flex-col flex-1 px-1">{t('Enter your password')}</div>
                  <div className="flex-col mr-1">
                    <button onClick={() => { props.closeModal() }} className="text-black hover:text-[#F72585] ">
                      <CloseButtonImg className="inline-flex h-5 w-5" />
                    </button>
                  </div>
                </Dialog.Title>
                <div className=" justify-center flex space-x-2 p-1 px-2 bg-gray-900 text-white rounded-b-lg lg:text-base text-sm">
                  {props.jugador.dorsal} - {props.jugador.nombre}
                </div>
                <div className=" justify-center flex space-x-2 p-1 px-2 bg-gray-900 text-white rounded-b-lg lg:text-base text-sm">
                  <input type="password" id="password" maxLength={8} value={Password} onChange={(e) => setPassword(e.target.value)} onKeyDown={manejarKeyPress} className="flex-1 bg-gray-700 rounded-md text-white px-2 py-1 text-sm font-medium w-8" placeholder={t('Password')} />
                  {
                    Password.length < 1
                      ? <button disabled className="justify-center rounded-md bg-purple-700 px-2 py-1 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-25">{t('Login')}</button>
                      : <button onClick={() => LoginUser()} className="justify-center rounded-md bg-purple-700 px-2 py-1 text-sm font-medium text-white disabled:cursor-not-allowed hover:bg-opacity-50 disabled:opacity-25">{t('Login')}</button>
                  }
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
export default ModalLogin;