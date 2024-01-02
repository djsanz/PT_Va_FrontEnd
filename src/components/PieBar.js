import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ES_icon from '../images/idioma/ES.png'
import ENG_icon from '../images/idioma/ENG.png'
import ModalSelectIdioma from '../modals/ModalSelectIdioma'
import LinkedinLogo from '../images/Icons/Linkedin.ico'

export default function PieBar() {
  const { i18n } = useTranslation();
  const [ShowModalSelectIdioma, setShowModalSelectIdioma] = useState(false);

  return (
    <div className='sticky bottom-0 bg-gray-900 flex p-1.5'>
        {ShowModalSelectIdioma ? (<ModalSelectIdioma isOpen={ShowModalSelectIdioma} closeModal={() => setShowModalSelectIdioma(false)}/>) : null}
        <div className='flex'>
          <small className="text-xs md:text-sm">© 2024 DjSanz.</small>
        </div>
        <div className='flex flex-1 justify-end text-xs md:text-sm'>
          {
            i18n.language === 'es'
            ? <button onClick={() => {setShowModalSelectIdioma(true)}}><img alt="ES-Flag" className="mr-1 inline" src={ES_icon} style={{resizeMode: "cover",height:20}}/> Español</button>
            : <button onClick={() => {setShowModalSelectIdioma(true)}}><img alt="ENG-Flag" className="mr-1 inline" src={ENG_icon} style={{resizeMode: "cover",height:20}}/> English</button>
          }
        </div>
        <div className="flex flex-1 justify-end space-x-1">
            <a href='https://www.linkedin.com/in/djsanz' target="_blank" rel="noreferrer"><img alt="LinkedinLogo" className="inline mr-1" src={LinkedinLogo} style={{resizeMode: "cover",height:20}}/></a>
        </div>
    </div>
  );
}