import ContactForm from "../components/contact/contact-form";
import Head from "next/head";

function ContactPage() {
  return (
    <>
    <Head>
      <title>Contact Me</title>
      <meta  name="description" content=""/>
    </Head>
    <ContactForm />
    </>
    
  )
}

export default ContactPage;