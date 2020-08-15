import React from "react";
import TitleWithTooltip from './TitleWithTooltip'
import Button from '@material-ui/core/Button';
import { createMuiTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';

const ColorButton = withStyles(() => ({
  root: {
    // color: theme.palette.getContrastText(purple[500]),
		backgroundColor: '#CDFFDB',
		border: '1px solid #797979',
		borderRadius:'20px',
		fontSize: '36px',
		padding: '0px',
		'&:hover': {
      backgroundColor: "#FFD5D5",
    },
  },
}))(Button);

const BlogGenerator: React.FC = () => {
  return (
		<div style={{padding: '0 5vw 0 5vw'}}>
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <div>
					<TitleWithTooltip titleText='New Blog Title' tooltipText='Help'/>
          <input></input>
					<TitleWithTooltip titleText='Blog Example' tooltipText='Help'/>
          <div>Blog Example Title</div>
          <input></input>
          <div>Blog Example Text</div>
					<div className='pro-tip' style={{background: "#9ED1A9", borderRadius: '3px', width: "35vw"}}>
						<b>PRO TIP</b>
						: For best results, include raw text only. Clean up alt text from pasted images, those huge blocks of whitespace, and any weird residual text from links. Leave the title out.
					</div>
          <textarea style={{width: '40vw', height: '40vh'}}></textarea>
        </div>
        <div>
					<TitleWithTooltip titleText='Blog Output' tooltipText='Help'/>
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
        <div style={{display: 'flex'}}>
          <div>Will you use this draft?</div>
					<ColorButton variant="contained" color="primary">
						👍
					</ColorButton>
					<button className="unselected-draft-btn" id="male" name="gender" value="male">
						👍
					</button>
					<button className='unselected-draft-btn' id="female" name="gender" value="female">
						👎
					</button>
        </div>
      </div>
    </div>
  );
};

export default BlogGenerator;