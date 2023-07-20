'use client'

import { PasswordGenerator } from '@/libs/PasswordModule';
import { Copy } from 'lucide-react';
import { useState } from 'react';
import copy from 'copy-to-clipboard'

const Password = () => {

  const [passwordCopy, setPasswordCopy] = useState(false)
  const [rangeValue, setRangeValue] = useState(10);
  const [password, setPassword] = useState<string>('')

  const [isChecked1, setIsChecked1] = useState<boolean>(false);
  const [isChecked2, setIsChecked2] = useState<boolean>(false);
  const [isChecked3, setIsChecked3] = useState<boolean>(false);
  const [isChecked4, setIsChecked4] = useState<boolean>(false);

  const passwordClass = new PasswordGenerator({
    hasUppercase: isChecked1,
    hasLowercase: isChecked2,
    hasNumbers: isChecked3,
    hasSymbols: isChecked4,
    length: rangeValue
  })


  function handleCheckboxChange(event: any) {
    const { name, checked } = event.target;
    switch (name) {
      case 'checkbox1':
        setIsChecked1(checked);
        break;
      case 'checkbox2':
        setIsChecked2(checked);
        break;
      case 'checkbox3':
        setIsChecked3(checked);
        break;
      case 'checkbox4':
        setIsChecked4(checked);
        break;
      default:
        break;
    }
  };

  function handleChangeRange(event: any) {
    setRangeValue(event.target.value);
  };


  function copyToClipboard() {
    if (!password) {
      alert('Gere sua senha antes de copiar...')
      return;
    }
    setPasswordCopy(true)
    copy(password)
  }

  function isAnyCheckboxSelected() {
    const includeUppercase = isChecked1
    const includeLowercase = isChecked2
    const includeNumbers = isChecked3
    const includeSymbols = isChecked4

    return includeUppercase || includeLowercase || includeNumbers || includeSymbols;
  }

  function createNewPassword() {
    if (!isAnyCheckboxSelected()) {
      alert('Selecione ao menos um checkbox para gerar sua senha!')
    }
    const newPassword = passwordClass.generatePassword();
    setPassword(newPassword);
    setPasswordCopy(false)
  }

  function definePasswordStrength() {
    let strength = 0;

    const checkedCount = (isChecked1 ? 1 : 0) + (isChecked2 ? 1 : 0) + (isChecked3 ? 1 : 0) + (isChecked4 ? 1 : 0);

    if (checkedCount > 0) {
      strength++;
    }
    if (checkedCount > 1) {
      strength++;
    }
    if (checkedCount > 2) {
      strength++;
    }
    if (checkedCount > 3) {
      strength++;
    }

    if (rangeValue > 18) {
      strength += 2;
    }

    return strength;
  }

  const passwordStrength = definePasswordStrength();

  return (
    <div className='shadow-lg shadow-cyan-500/60 p-2 rounded-lg h-custom-vh w-custom-vh flex gap-10 justify-center'>
      <div className='flex flex-col justify-evenly h-full w-2/4'>
        <h1 className='text-5xl text-center'>Gerador de Senha</h1>
        <div className='flex justify-center gap-5 items-center'>
          <input
            type="text"
            value={password}
            placeholder='Sua nova senha'
            disabled
            className='text-center rounded w-2/3 h-10 flex items-center shadow-lg shadow-cyan-700/20 border-y border-2'
          />
          {passwordCopy ?
            <p>Senha copiada</p>
            :
            <Copy onClick={copyToClipboard} className='cursor-pointer' />
          }
        </div>
        <div className='h-6 flex justify-center items-center w-full'>
          <div
            className={
              passwordStrength === 1 ? 'w-full h-3 bg-yellow-400 appearance-none slider-thumb outline-none rounded' :
                passwordStrength === 2 ? 'w-full h-3 bg-yellow-400 appearance-none slider-thumb outline-none rounded' :
                  passwordStrength === 3 ? 'w-full h-3 bg-yellow-400 appearance-none slider-thumb outline-none rounded' :
                    passwordStrength >= 4 ? 'w-full h-3 bg-red-400 appearance-none slider-thumb outline-none rounded' :
                      'w-full h-3 bg-green-400 appearance-none slider-thumb outline-none rounded'
            }
          />
        </div>
        <div className='w-full'>
          <span>Tamanho da senha: {rangeValue}</span>
          <input
            type="range"
            className='w-full h-2 bg-gray-200 rounded-lg appearance-none dark:bg-gray-700'
            id='rangeInput'
            min={0}
            max={20}
            step={1}
            value={rangeValue}
            onChange={handleChangeRange}
          />
        </div>
        <div className='w-full flex justify-center items-center flex-col gap-9'>
          <div className='grid grid-cols-2 grid-rows-2 gap-8'>
            <div className='gap-2 flex flex-row'>
              <input
                type="checkbox"
                name='checkbox1'
                checked={isChecked1}
                onChange={handleCheckboxChange}
                className='w-5 h-5'
              />
              <label htmlFor='checkbox1' className=''>Letras maiúsculas</label>
            </div>
            <div className='gap-2 flex flex-row'>
              <input
                type="checkbox"
                name='checkbox2'
                checked={isChecked2}
                onChange={handleCheckboxChange}
                className='w-5 h-5'
              />
              <label htmlFor='checkbox2'>Letras minúsculas</label>
            </div>
            <div className='gap-2 flex flex-row'>
              <input
                type="checkbox"
                name='checkbox3'
                checked={isChecked3}
                onChange={handleCheckboxChange}
                className='w-5 h-5'
              />
              <label htmlFor='checkbox3'>Números</label>
            </div>
            <div className='gap-2 flex flex-row'>
              <input
                type="checkbox"
                name='checkbox4'
                checked={isChecked4}
                onChange={handleCheckboxChange}
                className='w-5 h-5'
              />
              <label htmlFor='checkbox4'>Caracteres especiais</label>
            </div>
          </div>
          <button
            className='w-[400px] bg-white text-slate-950 text-lg rounded hover:bg-slate-300 transition-all'
            onClick={createNewPassword}
          >
            Gerar
          </button>
        </div>
      </div>
    </div>
  )
}

export default Password