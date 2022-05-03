import React,{useState} from 'react'

const SendMessage = ({handleSubmit}) => {
   const [message , setMessage] = useState(""); 
  return (
    <form action="" onSubmit={(e) => handleSubmit(e,message,setMessage)}>
    <input
      type="text"
      placeholder="message"
      onChange={(e) => {
        setMessage(e.target.value);
      }}
      value={message}
      className="input w-full"
    />
  </form>
  )
}

export default SendMessage