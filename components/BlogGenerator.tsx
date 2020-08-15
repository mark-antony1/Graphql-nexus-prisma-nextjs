import React, { useState} from "react";
import TitleWithTooltip from './TitleWithTooltip'
import Button from '@material-ui/core/Button';
import BlogLikeButtons from './BlogLikeButtons'

const BlogGenerator: React.FC = () => {
  return (
		<div style={{padding: '0 5vw 0 5vw'}}>
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <div>
					<TitleWithTooltip titleText='New Blog Title' tooltipText='Input the title for the blog post you want to create'/>
          <input></input>
					<TitleWithTooltip titleText='Blog Example' tooltipText='Input the title for the sample blog post'/>
          <div>Blog Example Title</div>
          <input></input>
          <div>Blog Example Text</div>
					<div className='pro-tip' style={{background: "#9ED1A9", borderRadius: '3px', width: "35vw"}}>
						<b style={{fontWeight: 'bold', color: 'blue'}}>PRO TIP</b>
						: For best results, include raw text only. Clean up alt text from pasted images, those huge blocks of whitespace, and any weird residual text from links. Leave the title out.
					</div>
          <textarea style={{width: '40vw', height: '40vh'}}></textarea>
        </div>
        <div>
					<TitleWithTooltip titleText='Blog Output' tooltipText='this is the generated text for the blog you are creating'/>
          <textarea style={{width: '45vw', height: '60vh'}}></textarea>
        </div>
      </div>
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <div>
          <div>712/900</div>
					<Button disableElevation variant="contained" color="primary">
						Generate
					</Button>
        </div>
				<BlogLikeButtons/>
      </div>
    </div>
  );
};

const unselectedDraftStyles = {
	backgroundColor: '#CDFFDB',
	border: '1px solid #797979',
	borderRadius:'20px',
	fontSize: '36px',
	padding: '0px',
	marginLeft: '10px',
	boxShadow: 'none',
}

const selectedDraftStyles = {
	backgroundColor: '#FFD5D5',
}

export default BlogGenerator;