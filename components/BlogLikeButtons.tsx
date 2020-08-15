import React, { useState} from "react";
import Button from '@material-ui/core/Button';

const BlogLikeButtons: React.FC = () => {
	const [likeButtonsState, setLikeButtonsState] = useState({
		like: {
			selected: false,
			hovered: false
		},
		dislike: {
			selected: false,
			hovered: false
		}
	})
	const { like, dislike } = likeButtonsState
	const likeButtonStyles = like.selected || like.hovered ? {...unselectedDraftStyles, ...selectedDraftStyles} : {...unselectedDraftStyles}
	const dislikeButtonStyles = dislike.selected || dislike.hovered ? {...unselectedDraftStyles, ...selectedDraftStyles} : {...unselectedDraftStyles}

	const handleLikeButtonClick = (type) => {
		const typeMap = { like: 'dislike', dislike: 'like'}
		let newState = {...likeButtonsState}
		newState[type].selected = true
		newState[typeMap[type]].selected = false
		setLikeButtonsState(newState)
	}

	const handleLikeButtonMouseIn = (type) => {
		let newState = {...likeButtonsState}
		newState[type].hovered = true
		setLikeButtonsState(newState)
	}

	const handleLikeButtonMouseOut = (type) => {
		let newState = {...likeButtonsState}
		newState[type].hovered = false
		setLikeButtonsState(newState)
	}

  return (
		<div style={{display: 'flex', alignItems: 'center'}}>
			<div>Will you use this draft?</div>
			<Button 
				onClick={() => handleLikeButtonClick('like')}
				onMouseEnter={() => handleLikeButtonMouseIn('like')}
				onMouseLeave={() => handleLikeButtonMouseOut('like')}
				style={likeButtonStyles} 
				disableElevation variant="contained" color="primary"
			>
				👍
			</Button>
			<Button 
				onClick={() => handleLikeButtonClick('dislike')}
				onMouseEnter={() => handleLikeButtonMouseIn('dislike')}
				onMouseLeave={() => handleLikeButtonMouseOut('dislike')}
				style={dislikeButtonStyles} 
				disableElevation variant="contained" color="primary"
			>
				👎
			</Button>
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

export default BlogLikeButtons;