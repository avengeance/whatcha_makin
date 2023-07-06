import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();

	const MIN_FIRSTNAME_LENGTH = 3;
	const MIN_LASTNAME_LENGTH = 2;
	const MIN_EMAIL_LENGTH = 3;
	const MIN_PASSWORD_LENGTH = 6;
	const MIN_CONFIRM_PASSWORD_LENGTH = 6;

	const validFirstName = firstName.length >= MIN_FIRSTNAME_LENGTH;
	const validLastName = lastName.length >= MIN_LASTNAME_LENGTH;
	const validEmail = email.length >= MIN_EMAIL_LENGTH;
	const validPassword = password.length >= MIN_PASSWORD_LENGTH;
	const validConfirmPassword = confirmPassword.length >= MIN_CONFIRM_PASSWORD_LENGTH;

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (password === confirmPassword) {
			setErrors([])
			return dispatch(signUp(firstName, lastName, email, password))
				.then(closeModal)
				.catch(async (res) => {
					const data = await res.json();
					if (data && data.errors) setErrors(data.errors);
				})
		} else {
			setErrors(['Confirm Password field must be the same as the Password field']);
		}
	};

	return (
		<div className="signup-modal">
			<h1 id="signup-text">Sign Up</h1>
			<form onSubmit={handleSubmit} className="signup-form">
				<ul>
					{errors.map((error, idx) => <li className='signup-errors' key={idx}>{error}</li>)}
				</ul>
				<label className="form-input">
					<input
						type="text"
						value={firstName}
						onChange={(e) => setFirstName(e.target.value)}
						required
						placeholder="First Name"
						style={{ width: '90%' }}
					/>
				</label>
				<label className="form-input">
					<input
						type="text"
						value={lastName}
						onChange={(e) => setLastName(e.target.value)}
						required
						placeholder="Last Name"
						style={{ width: '90%' }}
					/>
				</label>
				<label className="form-input">
					<input
						type="text"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
						placeholder="Email"
						style={{ width: '90%' }}
					/>
				</label>
				<label className="form-input">
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
						placeholder="Password"
						style={{ width: '90%' }}
					/>
				</label>
				<label className="form-input">
					<input
						type="password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
						placeholder="Confirm Password"
						style={{ width: '90%' }}
					/>
				</label>
				<div id="div-signup-submit">
					<button type="submit"
						id="signup-submit"
						style={{
							width: "92%",
							backgroundColor: "#C6E08D",
							border: "2px solid #4D7E3E",
							boxShadow: "5px 9px 17px 4px #8ABE53"
						}}
						disabled={!validFirstName || !validLastName || !validEmail || !validPassword || !validConfirmPassword}
					><p id="sign-up-text" style={{ color: "white" }}>Sign Up</p></button>
				</div>
			</form>
		</div>
	);
}

export default SignupFormModal;
