import AdminLayout from '../../layouts/AdminLayout';
import React from 'react';
import { apiRequest } from '../../api';
import { loadAdminSuccess } from '../../state/slices/adminUserSlice';
import { loadDepartmentSuccess } from '../../state/slices/departmentsSlice';
import { loadDesignationSuccess } from '../../state/slices/designationsSlice';
import { loadEmployeeSuccess } from '../../state/slices/employeesSlice';
import { loadEvaluatorSuccess } from '../../state/slices/evaluatorsSlice';
import { loadNormalUserSuccess } from '../../state/slices/normalUsersSlice';
import { loadRoleSuccess } from '../../state/slices/rolesSlice';

import { Outlet, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../state/hooks';

const Admin = () => {
	const { token } = useAppSelector((state) => state.root.user);
	const dispatch = useAppDispatch();
	const path = useLocation().pathname;
	const fetchDepartments = async () => {
		const res = await apiRequest.get('/departments/all', {
			headers: {
				Authorization: `Bearer ${token}`
			}
		});

		const data = res.data.data;
		console.log('Departments', data);

		dispatch(loadDepartmentSuccess(data));
	};

	const fetchEmployees = async () => {
		const res = await apiRequest.get('/users/all', {
			headers: {
				Authorization: `Bearer ${token}`
			}
		});
		const data = res.data.data;
		console.log('Employees', data);
		dispatch(loadEmployeeSuccess(data));
	};

	const fetchRoles = async () => {
		const res = await apiRequest.get('/roles/all', {
			headers: {
				Authorization: `Bearer ${token}`
			}
		});
		const data = res.data.data;
		console.log('Roles', data);
		
		dispatch(loadRoleSuccess(data));
	};

	const fetchDesignations = async () => {
		const res = await apiRequest.get('/designations/all', {
			headers: {
				Authorization: `Bearer ${token}`
			}
		});
		const data = res.data.data;
		dispatch(loadDesignationSuccess(data));
	};

	const fetchEvaluators = async () => {
		const res = await apiRequest.get('/users/all/evaluators', {
			headers: {
				Authorization: `Bearer ${token}`
			}
		});
		const data = res.data.data;
		console.log('Evaluators', data);

		dispatch(loadEvaluatorSuccess(data));
	};
	const fetchAdmins = async () => {
		const res = await apiRequest.get('/users/all/admins', {
			headers: {
				Authorization: `Bearer ${token}`
			}
		});
		const data = res.data.data;
		dispatch(loadAdminSuccess(data));
	};

	const fetchNormalUsers = async () => {
		const res = await apiRequest.get('/users/all/normal-users', {
			headers: {
				Authorization: `Bearer ${token}`
			}
		});
		const data = res.data.data;
		dispatch(loadNormalUserSuccess(data));
	};

	React.useEffect(() => {
		Promise.all([
			fetchDepartments(),
			fetchEmployees(),
			fetchRoles(),
			fetchDesignations(),
			fetchEvaluators(),
			fetchAdmins(),
			fetchNormalUsers()
		]);
	}, []);

	return (
		<AdminLayout>
			<Outlet />
		</AdminLayout>
	);
};

export default Admin;
