import FeaturedPosts from "../components/home-page/featured-posts"
import Hero from "../components/home-page/hero"
import { getFeaturedPost } from "../lib/posts-util";
import Head from "next/head";
function HomePage(props) {
  return (
    <>
    <Head>
      <title>Muhammad's Blog</title>
      <meta name="description" content="I post about programming and webdevlopment"/>
    </Head>
        <Hero />
        <FeaturedPosts posts={props.posts}/>
    </>
  )
}

export function getStaticProps(){
    const featuredPosts = getFeaturedPost();
    return{
        props:{
            posts:featuredPosts
        }
    }
}

export default HomePage