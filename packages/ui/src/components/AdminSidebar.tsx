/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import React from 'react';
import { logoutUser } from '../state/slices/userSlice';
import { navlinks } from '../data/nav';
import { useAppDispatch } from '../state/hooks';

const AdminSidebar = () => {
	const dispatch=useAppDispatch();
	const handleLogout = () => {
		alert('You have been logged out');
		setTimeout(() => {
			dispatch(logoutUser());
		}, 1000);
	};

	return (
		<div className="flex flex-col h-screen w-64 bg-black py-4 text-white sticky top-0">
			<div className='h-full'>
				<h2 className="text-2xl font-bold uppercase text-center">
					Admin
				</h2>
				<hr className="my-3" />
				<div>
					{navlinks.admin.map((n) => (
						<Link
							key={n.pathName}
							to={n.urlPath}
							className="flex px-6 py-3 text-xl font-bold items-center gap-4 hover:bg-slate-200 hover:text-black"
						>
							<FontAwesomeIcon icon={n.icon!} />
							<span>{n.pathName}</span>
						</Link>
					))}
				</div>
			</div>
			<div className='px-4 py-2'>
				<button onClick={handleLogout} className='rounded-lg border-white border w-full py-2 bg-red-400 uppercase'>Logout</button>
			</div>
		</div>
	);
};

export default AdminSidebar;
