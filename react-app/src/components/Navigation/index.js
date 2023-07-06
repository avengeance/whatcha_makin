import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import logo from '../../images/logo.png';
import './Navigation.css';

function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session.user);

	return (
		<div className='navigation-header'>
			<div className='header'>
				<ul>
					<div className='home-button'>
						<li>
							<NavLink exact to="/"
								className='logo-link'
							>
								<span className='logo-image'
									style={{
										backgroundImage: `url(${logo})`
									}}
								></span>
							</NavLink>
						</li>
						{/* <div className='header-text'>
							<h1>Whatcha Makin</h1>
						</div> */}
					</div>
					{isLoaded && (
						<div className='profile-button'>
							<li>
								<ProfileButton user={sessionUser} />
							</li>
						</div>
					)}
				</ul>
			</div>
		</div >
	);
}

export default Navigation;
