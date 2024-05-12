import { useEffect, useState } from 'react'
import './css/App.css'
import api from './api.tsx'

export function App() {
  const [statusOfGate, setStatusOfGate] = useState<any[]>([])
  useEffect(() =>{
      api.get('https://api-gate-geotec.onrender.com/funcionamento').then(res=>{
        setStatusOfGate(res.data.reverse().slice(0,10))
        console.log(res.data)
      }).catch((err)=>{
        console.error("Ops!! Um erro aconteceu ao consumir api!!!"+err)
      })
  }, [])
  const dataAtual = new Date();
  const options = { timeZone: 'America/Sao_Paulo' };
  const dataHoraBrasil = dataAtual.toLocaleString('pt-BR', options);
  let hourStatus = dataHoraBrasil.charAt(12) + dataHoraBrasil.charAt(13) + dataHoraBrasil.charAt(14) + dataHoraBrasil.charAt(15) + dataHoraBrasil.charAt(16)
  console.log(hourStatus)
  function notOpen(){
    api.post('https://api-gate-geotec.onrender.com/funcionamento', {
      funcionando: 0,
      horario: hourStatus
    })
    .then(function () {
      location.reload()
    })
  }
  function open(){
    api.post('https://api-gate-geotec.onrender.com/funcionamento', {
      funcionando: 1,
      horario: hourStatus
    })
    .then(function () {
      location.reload()
    })
  }
  return (
    <main className='px-12 py-32 gap-4 flex flex-col items-center justify-center md:w-[800px] mx-auto'>
      <h1 className="text-white font-main font-semibold text-2xl flex gap-3 flex-wrap">Portão da Geotec 
      <img className='object-cover' src="https://scs.usp.br/identidadevisual/wp-content/uploads/2022/08/logo_usp_branco.png" alt="Logo da USP contendo 3 letras escrito: USP" width={80}/>
      </h1>
      <p className='font-main text-md text-emerald-50 text-center'>Este site tem como objetivo manter atualizadas as informações sobre o portão da Geotec (matadouro). Contamos sempre com o senso de comunidade para manter as informações atualizadas.</p>
      <div className="flex flex-col gap-4">
        <p id="title" className="font-main text-emerald-50">O portão está funcionando?</p>
        <div className="flex items-center justify-center gap-3">
          <button onClick={open} className="py-2 px-3 rounded-md w-20 bg-green-500 text-white font-main font-medium hover:bg-opacity-80 transition-colors duration-700 text-center text-shadow-md shadow-black [text-shadow:_1px_1px_0_rgb(0_0_0_/_50%)]">Sim</button>
          <button onClick={notOpen} className="py-2 px-3 rounded-md w-20 bg-red-600 text-white font-main font-medium hover:bg-opacity-80 transition-colors duration-700 text-center text-shadow-md shadow-black [text-shadow:_1px_1px_0_rgb(0_0_0_/_50%)]">Não</button>
        </div>
        <div className='m-auto flex flex-col items-center justify-center gap-4'>
          <h2 className='font-main text-white font-semibold text-2xl'>Status</h2>
          {statusOfGate.map(status=>{
              if(status.funcionando == 0)
                return <div className='flex w-28 justify-between items-center'>
                  <p className='font-main text-white [text-shadow:_1px_1px_0_rgb(0_0_0_/_70%)] text-center py-1 w-12 bg-red-600 rounded-md'>Não </p>
                  <p className='font-main text-white'>{status.horario}</p>
                </div>
                return <div className='flex w-28 justify-between items-center'>
                  <p className='font-main text-white [text-shadow:_1px_1px_0_rgb(0_0_0_/_70%)] text-center py-1 w-12 bg-green-600 rounded-md'>Sim </p>
                  <p className='font-main text-white'>{status.horario}</p>
                </div>
          })}
        </div>
      </div>
    </main>
  )
}