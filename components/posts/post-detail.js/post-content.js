import Markdown from "react-markdown";
import PostHeader from "./post-header"
import classes from "./post-content.module.css"
import Image from "next/image";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {dracula} from 'react-syntax-highlighter/dist/cjs/styles/prism';
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
      style={dracula} // Pass the 'atomDark' theme explicitly
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