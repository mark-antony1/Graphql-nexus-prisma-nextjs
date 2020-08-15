import React, { useState} from "react";
import TitleWithTooltip from './TitleWithTooltip'
import Button from '@material-ui/core/Button';
import BlogLikeButtons from './BlogLikeButtons'
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios'

const BlogGenerator: React.FC = () => {
	const [blogTitleText, setBlogTitleText] = useState("")
	const [exampleBlogTitleText, setExampleBlogTitleText] = useState("")
	const [exampleBlogText, setExampleBlogText] = useState("")
	const [generatedBlogText, setGeneratedBlogText] = useState("")
	const [isLoadingBlog, setIsLoadingBlog] = useState(false)
	

	const generateBlog = () => {
		setIsLoadingBlog(true)
		setTimeout(() => {
			setGeneratedBlogText("Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum")
			setIsLoadingBlog(false)
		}, 3000)
	}
  return (
		<div style={{padding: '0 5vw 0 5vw'}}>
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <div>
					<TitleWithTooltip titleText='New Blog Title' tooltipText='Input the title for the blog post you want to create'/>
					<input 
						value={blogTitleText} 
						onChange={(e) => setBlogTitleText(e.target.value)}
					/>
					<TitleWithTooltip titleText='Blog Example' tooltipText='Input the title for the sample blog post'/>
          <div>Blog Example Title</div>
					<input 
						value={exampleBlogTitleText} 
						onChange={(e) => setExampleBlogTitleText(e.target.value)}
					/>
          <div>Blog Example Text</div>
					<div className='pro-tip' style={{background: "#9ED1A9", borderRadius: '3px', width: "35vw"}}>
						<b style={{fontWeight: 'bold', color: 'blue'}}>PRO TIP</b>
						: For best results, include raw text only. Clean up alt text from pasted images, those huge blocks of whitespace, and any weird residual text from links. Leave the title out.
					</div>
					<textarea 
						value={exampleBlogText} 
						onChange={(e) => setExampleBlogText(e.target.value)}
						style={{width: '40vw', height: '40vh'}}
					/>
        </div>
        <div>
					<TitleWithTooltip titleText='Blog Output' tooltipText='this is the generated text for the blog you are creating'/>
					<textarea 
						disabled
						value={generatedBlogText} 
						onChange={(e) => setGeneratedBlogText(e.target.value)} 
						style={{width: '45vw', height: '60vh'}}
					/>
        </div>
      </div>
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <div>
          <div>{Number(exampleBlogText.length) + Number(exampleBlogTitleText.length)}/900</div>
					<Button style={{minWidth: '120px', minHeight: "39px"}} onClick={generateBlog} disableElevation variant="contained" color="primary">
						{isLoadingBlog ? <CircularProgress color="white" size='26px'/> :"Generate"}
					</Button>
        </div>
				<BlogLikeButtons/>
      </div>
    </div>
  );
};

export default BlogGenerator;