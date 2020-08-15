import React from "react";
import Tooltip from '@material-ui/core/Tooltip';
import HelpIcon from '@material-ui/icons/Help';
import { colors } from "@material-ui/core";

type Props = {
	titleText?: string
	tooltipText?: string
}

const TitleWithTooltip = ({titleText, tooltipText}: Props) => {
  return (
		<div style={{display: 'flex', alignItems: 'center', marginBottom: '5px'}}>
			<h3 style={{paddingRight: "10px"}}>{titleText}</h3>
			<Tooltip style={{fontSize:"16px", color: '#EBEBEB', backgroundColor: "black", borderRadius: '10px'}} placement="top" title={tooltipText}>
				<HelpIcon />
			</Tooltip>
		</div>
  );
};

export default TitleWithTooltip;