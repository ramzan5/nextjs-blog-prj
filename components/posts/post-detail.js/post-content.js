import Markdown from "react-markdown";
import PostHeader from "./post-header"
import classes from "./post-content.module.css"
import Image from "next/image";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import atomDark from 'react-syntax-highlighter/dist/cjs/styles/prism/atom-dark';
import js from 'react-syntax-highlighter/dist/cjs/languages/prism/javascript';
SyntaxHighlighter.registerLanguage('js', js)
function PostContent(props) {
    const {post} = props;
    const imagePath = `/images/posts/${post.slug}/${post.image}`;
    const customRenderers = {
      p(paragraph){
        const {node} = paragraph;
        if(node.children[0].type ==='img'){
          const image = node.children[0];
          // console.log(image)
          return(
            <div>
              <Image 
              src={imagePath} 
              alt={image.alt}
              width={600}
              height={300}
              />
            </div>
          );
        }
        return <p>{paragraph.children}</p>
      },
  code(code) {
  const { language, children } = code;
  return (
    <SyntaxHighlighter
      style={atomDark} // Pass the 'atomDark' theme explicitly
      language={language}
      children={children}

    />
  );
}
    }
  return (
   <article className={classes.content}>
    <PostHeader title={post.title} image={imagePath} />
    <Markdown components={customRenderers}>{post.content}</Markdown>
   </article>
  )
}

export default PostContent;