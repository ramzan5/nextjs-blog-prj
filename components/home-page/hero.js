import classes from './hero.module.css'
import Image from 'next/image'
function Hero() {
  return (
    <section className={classes.hero}>
        <div className={classes.image}>
            <Image 
                src='/images/sites/ramzan.jpg'
                alt="I am Ramzan"
                width={300}
                height={300}
            />
        </div>
        <h1>Hi, I'm Muhammad</h1>
        <p>I am a full stack developer with experience in building web applications using React.js and Node.js.</p>
    </section>
  )
}

export default Hero