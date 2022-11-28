/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react';
import { apiRequest } from '../../api';
import { useAppSelector } from '../../state/hooks';

import { AxiosError } from 'axios';
import InputElement from '../../components/InputElement';
import { ToastContainer, toast } from 'react-toastify';

type EmployeesFormProps = {
	name: string;
	email: string;
	department: string;
	designation: string;
};
const AddAdminEmployees: React.FC<{ closeModal: () => void }> = ({
	closeModal
}) => {
	// Fullscreen modal with form
	const [employeesForm, setEmployeesForm] =
		React.useState<EmployeesFormProps>({} as EmployeesFormProps);
	const { departments } = useAppSelector((state) => state.departments);
	const { designations } = useAppSelector((state) => state.designations);
	const handleEmployeesFormChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
		>
	) => {
		const { name, value } = e.target;
		console.log(name, value);
		setEmployeesForm((prev) => ({ ...prev, [name]: value }));
	};
	const { token } = useAppSelector((state) => state.root.user);
	const handleEmployeesFormSubmit = async (
		e: React.FormEvent<HTMLFormElement>
	) => {
		console.log('Submitting form');

		e.preventDefault();

		try {
			const res = await apiRequest.post(
				'/employees/create',
				employeesForm,
				{
					headers: {
						authorization: `Bearer ${token}`
					}
				}
			);

			if (res.status === 201) {
				toast.success('Employee added successfully');
				setTimeout(() => {
					closeModal();
				}, 2000);
			}
		} catch (error) {
			if (error instanceof AxiosError)
				toast.error(error.response!.data.message);
		}
	};
	const wrapperRef = React.useRef<HTMLDivElement>(null);

	const handleClickOutside = (event: MouseEvent) => {
		if (
			wrapperRef.current &&
			!wrapperRef.current.contains(event.target as Node)
		)
			closeModal();
	};
	const handleEscapeClose = (event: KeyboardEvent) => {
		if (event.key === 'Escape') closeModal();
	};
	window.addEventListener('keydown', handleEscapeClose);
	// window.addEventListener('click', handleClickOutside);
	wrapperRef.current &&
		wrapperRef.current.addEventListener('mousedown', handleClickOutside);

	React.useEffect(() => {
		return () => {
			wrapperRef.current &&
				wrapperRef.current.removeEventListener(
					'mousedown',
					handleClickOutside
				);
			window.removeEventListener('keydown', handleEscapeClose);
			window.removeEventListener('click', handleClickOutside);
		};
	}, []);

	return (
		// Add fullscreen modal with form
		<div
			className="flex flex-col space-y-2 h-screen fixed justify-center items-center bg-gray-600 z-[2000] w-full top-0 bg-opacity-60"
			ref={wrapperRef}
		>
			<ToastContainer />
			<form
				action=""
				onSubmit={handleEmployeesFormSubmit}
				className="min-w-[30rem] p-10 bg-white flex flex-col gap-4"
				onClick={(e) => e.stopPropagation()}
			>
				<h1 className="text-3xl font-bold text-center">
					Add new employee
				</h1>
				<InputElement
					name="name"
					onChange={handleEmployeesFormChange}
					type="text"
					value={employeesForm.name}
					labelText="Name"
					placeholder="Enter Employee Name"
				/>
				<InputElement
					name="email"
					onChange={handleEmployeesFormChange}
					type="text"
					value={employeesForm.name}
					labelText="Email"
					placeholder="Enter Designation Name"
				/>
				<div>
					<select
						name="department"
						value={employeesForm.department}
						onChange={handleEmployeesFormChange}
					>
						<option value="" disabled>
							Select Department
						</option>
						{departments.length &&
							departments.map((department) => (
								<option
									key={department._id}
									value={department._id}
								>
									{department.name}
								</option>
							))}
					</select>
				</div>
				<div>
					<select
						name="designation"
						value={employeesForm.designation}
						onChange={handleEmployeesFormChange}
					>
						<option value="" disabled>
							Select Designation
						</option>
						{designations.length &&
							designations.map((designation) => (
								<option
									key={designation._id}
									value={designation._id}
								>
									{designation.name}
								</option>
							))}
					</select>
				</div>
				<button
					className="w-full py-4 bg-blue-700 text-white rounded-md"
					type="submit"
				>
					Add Employee
				</button>
			</form>
		</div>
	);
};

export default AddAdminEmployees;
