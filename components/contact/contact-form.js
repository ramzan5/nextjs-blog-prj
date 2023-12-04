
import classes from "./contact-form.module.css"
import { useState, useEffect } from "react"
import Notification from "../ui/notification"

async function sendContactData(contactDetails){
    const response = await fetch('/api/contact',{
            method: 'POST',
            body: JSON.stringify(contactDetails),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'SomeThing Went Wrong')
    }
}

function ContactForm() {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [message, setMessage] = useState("")
    const [requestStatus, setRequestStatus] = useState();
    const [requestError, setRequestError] = useState();

    useEffect(()=>{
        if(requestStatus === 'success' || requestStatus === 'error'){
        const timer = setTimeout(() => {
            setRequestStatus(null)
            setRequestError(null)
        }, 3000);
        return () => clearTimeout(timer); //cleanup on unmount
    }
    },[requestStatus])
   async function sendMessageHandler(event){
        event.preventDefault()
        setRequestStatus('pending')

        try{
            await sendContactData({
                email:email,
                name:name,
                message:message
            })
            setRequestStatus('success')
            setEmail('')
            setMessage('')
            setName('')
        } catch(error){
            setRequestError(error.message)
            setRequestStatus('error')
        }   
       
}
    let notification;
    if(requestStatus === 'pending'){
        notification={
            status:'pending',
            title:"Sending Message",
            message:"Please wait while we process your request..."
        }
    }
    if(requestStatus === 'success'){
        notification={
            status:'success',
            title:"Success!",
            message:"Your message has been sent successfully!"
        }
    }
    if(requestStatus === 'error'){
        notification={
            status:'error',
            title:"Error Occured!",
            message:requestError
        }
    }

  return (
   <section className={classes.contact}>
    <h1>
        Get in touch with me!
    </h1>
    <form className={classes.form} onSubmit={sendMessageHandler}>
        <div className={classes.controls}>
            <div className={classes.control}>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" required value={email} onChange={(event)=>{setEmail(event.target.value)}}/>
            </div>
            <div className={classes.control}>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" required value={name} onChange={(event)=>{setName(event.target.value)}}/>
            </div>
        </div>
        <div className={classes.control}>
            <label htmlFor="message">Your Message</label>
            <textarea rows="5" id="message" required value={message} onChange={(event) => {setMessage(event.target.value)}}></textarea>
        </div>
        <div className={classes.actions}>
            <button>Send Message</button>
        </div>
    </form>
    {notification && <Notification status={notification.status} title={notification.title} message={notification.message} />}
   </section>
  )
}

export default ContactForm;