import { useEffect, useState } from 'react'
import './css/App.css'
import axios from 'axios'

export function App() {
  const baseUrl = 'https://api-gate-geotec.onrender.com/funcionamento'
  const [statusOfGate, setStatusOfGate] = useState<any[]>([])
  const [showStatus, setShowStatus] = useState(1)
  useEffect(() =>{
      axios.get(baseUrl).then(res=>{
        setStatusOfGate(res.data.reverse().slice(0,10))
      }).then(()=>{
        setShowStatus(0)
        console.log("Tudo certo com o get!!!")
      }).catch((err)=>{
        console.error("Ops!! Um erro aconteceu ao consumir axios!"+err)
        window.location.reload()
      })
    },[showStatus])
    const dataAtual = new Date();
    let sendHour = dataAtual.getHours().toString()
    let sendMinutes = dataAtual.getMinutes().toString()
    let sendDay = dataAtual.getDay()
    let sendDayString
    if(sendHour.length==1){
      sendHour = "0" + sendHour
    }
    if(sendMinutes.length==1){
      sendMinutes = "0" + sendMinutes
    }
    if(sendDay == 0){
      sendDayString = 'Domingo'
    } else if(sendDay == 1){
      sendDayString = 'Segunda'
    } else if(sendDay == 2){
      sendDayString = 'Terça'
    } else if(sendDay == 3){
      sendDayString = 'Quarta'
    } else if(sendDay == 4){
      sendDayString = 'Quinta'
    } else if(sendDay == 5){
      sendDayString = 'Sexta'
    } else if(sendDay == 6){
      sendDayString = 'Sábado'
    }
    const hourStatus = sendHour + ":" + sendMinutes + " " + sendDayString
    function closed(){
      axios.post(baseUrl, {
        funcionando: 0,
        horario: hourStatus
      }).then(()=>{
        setShowStatus(2)
      }).catch(()=>{
        console.log("Não ta indo o post amigao")
        setShowStatus(2)
      })
    }
    function open(){
      axios.post(baseUrl, {
        funcionando: 1,
        horario: hourStatus
      }).then(()=>{
        setShowStatus(2)
      }).catch(()=>{
        console.log("Não ta indo o post amigao")
        setShowStatus(2)
      })
    }
  return (
    <main className='px-12 py-32 gap-4 flex flex-col items-center justify-center md:w-[800px] mx-auto'>
      <h1 className="text-white font-main font-semibold text-2xl flex gap-3 flex-wrap items-center justify-center">Portão da Geotec 
      <img className='object-cover' src="https://scs.usp.br/identidadevisual/wp-content/uploads/2022/08/logo_usp_branco.png" alt="Logo da USP contendo 3 letras escrito: USP" width={80}/>
      </h1>
      <p className='font-main text-md text-emerald-50 text-center'>Este site tem como objetivo manter atualizadas as informações sobre o portão da Geotec (matadouro). Contamos sempre com o senso de comunidade para manter as informações atualizadas.</p>
      <div className="flex flex-col gap-4">
        <p id="title" className="font-main text-emerald-50">O portão está funcionando?</p>
        <div className="flex items-center justify-center gap-3">
          <button onClick={open} className="py-2 px-3 rounded-md w-20 bg-green-500 text-white font-main font-medium hover:bg-opacity-80 transition-colors duration-700 text-center text-shadow-md shadow-black [text-shadow:_1px_1px_0_rgb(0_0_0_/_50%)]">Sim</button>
          <button onClick={closed} className="py-2 px-3 rounded-md w-20 bg-red-600 text-white font-main font-medium hover:bg-opacity-80 transition-colors duration-700 text-center text-shadow-md shadow-black [text-shadow:_1px_1px_0_rgb(0_0_0_/_50%)]">Não</button>
        </div>
        <div className='m-auto flex flex-col items-center justify-center gap-4'>
          <h2 className='font-main text-white font-semibold text-2xl'>Status</h2>
          {statusOfGate.map(status=>{
              if(status.funcionando == 0)
                return <div className='flex gap-2 w-full m-auto justify-between items-center'>
                  <p className='font-main text-white [text-shadow:_1px_1px_0_rgb(0_0_0_/_70%)] text-center py-1 w-12 bg-red-600 rounded-md'>Não </p>
                  <p className='font-main text-white'>{status.horario}</p>
                </div>
                return <div className='flex gap-2 w-full m-auto justify-between items-center'>
                  <p className='font-main text-white [text-shadow:_1px_1px_0_rgb(0_0_0_/_70%)] text-center py-1 w-12 bg-green-600 rounded-md'>Sim </p>
                  <p className='font-main text-white'>{status.horario}</p>
                </div>
          })}
        </div>
      </div>
    </main>
  )
}