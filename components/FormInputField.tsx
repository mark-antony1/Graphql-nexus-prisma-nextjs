import React from "react";
import Tooltip from "@material-ui/core/Tooltip";
import HelpIcon from "@material-ui/icons/Help";
import { colors } from "@material-ui/core";

type Props = {
  value?: string;
  label?: string;
  onChange: (event: React.ChangeEvent) => void;
};

const FormInputField = ({ value, label, onChange }: Props) => {
  return (
    <div className="input-container">
      <label>{label}</label>
      <input value={value} onChange={onChange} />
    </div>
  );
};

export default FormInputField;
