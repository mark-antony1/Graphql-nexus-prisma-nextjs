import Layout from '../components/Layout'
import Button from '@material-ui/core/Button';
import React, { useState} from "react";
import FormInputField from '../components/FormInputField'
import { useMutation } from "urql";
import gql from "graphql-tag";

const SignUp = gql`
  mutation ($firstName: String!, $lastName: String!, $email: String!, $password: String!, $inviteCode: String!)  {
    signup(firstName: $firstName, lastName: $lastName, email: $email, password: $password, inviteCode: $inviteCode ) {
      id
    }
	}`;
	
const AboutPage = () => {
	const [signUpResult, signUp] = useMutation(SignUp);
	const [formFields, setFormFields] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		inviteCode: ""
	})
	const [errorText, setErrorText] = useState("")

	const updateFormFields = (value, field) => {
		let newFormFields = Object.assign({}, formFields)
		newFormFields[field] = value
		setFormFields(newFormFields)
	}

	const handleSubmit = () => {
		signUp(formFields)
		.then(res => {
			if (res.error && res.error.message){
				const message = res.error.message
				if (message.includes("Invalid invite code")){
					setErrorText("Invalid Invite Code Please Try Another Code")
				} else if (message.includes("ique constraint failed on the fields: (`email")){
					setErrorText("That email has already been used")
				}
			}
		})
	}

  return(
		<Layout title="About | Next.js + TypeScript Example">
			<div className='card-container'>
				<div className='card'>
					<h1>Sign Up</h1>
					<FormInputField label={'First Name*'} value={formFields.firstName} 
						onChange={(e) => updateFormFields(e.target.value, 'firstName')}/>
					<FormInputField label={'Last Name*'} value={formFields.lastName} 
						onChange={(e) => updateFormFields(e.target.value, 'lastName')}/>
					<FormInputField label={'Email*'} value={formFields.email} 
						onChange={(e) => updateFormFields(e.target.value, 'email')}/>
					<FormInputField label={'Password*'} value={formFields.password} 
						onChange={(e) => updateFormFields(e.target.value, 'password')}/>
					<FormInputField label={'Invite Code*'} value={formFields.inviteCode} 
						onChange={(e) => updateFormFields(e.target.value, 'inviteCode')}/>
					<Button style={{minWidth: '120px', minHeight: "39px"}} onClick={handleSubmit} disableElevation variant="contained" color="primary">
						Generate
					</Button>
					<p style={{color: 'red', fontWeight: 'bold'}}>{errorText}</p>
				</div>
			</div>
  	</Layout>
	)
}

export default AboutPage
