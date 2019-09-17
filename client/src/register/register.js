import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Field, withFormik } from 'formik';
import * as Yup from 'yup';

import '../register/register.css';

function RegistrationForm ({ errors, touched, status, isSubmitting }) {
	const [ users, setUsers ] = useState([  ]);

	useEffect(() => {
		if (status) {
			setUsers([ ...users, status ]);
		}
	}, [ users, status ]);

	return (
		<div className='reg-form'>
			<h3>Join Us!</h3>
			<Form>
				<p className='username-entry'>Enter a username</p>
				<Field
					className='username'
					name='username'
					type='text'
					placeholder='Username'
				/>

				<p className='password-entry'>Create a password</p>
				<Field
					className='password'
					name='password'
					type='password'
					placeholder='Password'
				/>
				{ touched.username && errors.username && (
					<p className='error'>{ errors.username }</p>
				)}

				<div>
					<button className='reg-button' type='submit'>Register</button>
				</div>
			</Form>
		</div>
	)
}

const FormikRegistrationForm = withFormik({
	mapPropsToValues({ username, password }) {
		return {
			username: username || '',
			password: password || ''
		}
	},

	validationSchema: Yup.object().shape({
		username: Yup.string()
			.required('Please enter your username'),
		password: Yup.string()
			.required('Please enter your password')
	}),

	handleSubmit(values, { resetForm, setSubmitting, setStatus }) {
		axios
			.post('', values)
			.then(response => {
				console.log(response)
				setStatus(response.data)
				resetForm()
				setSubmitting(false)
				window.location = '/login'
			})
			.catch(error => {
				console.log(error.response);
				setSubmitting(false);
			});
	}
})(RegistrationForm);

export default FormikRegistrationForm;