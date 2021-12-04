import React, { useState } from 'react';
import { Typography, Box, TextField, Button } from '@mui/material';
import useAuth from '../hooks/useAuth';
import { useCreatePostMutation } from '../app/services/auth';

const CreatePost = () => {
	const user = useAuth();
	const [form, setForm] = useState({ title: '', description: '', level: '', availability: '', author: user?.email });
	const [createPost] = useCreatePostMutation();

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		try {
			const response = await createPost(form).unwrap();

			console.log(response);
		} catch (error:any) {
			alert(error.data.name);
		}
	};

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
		setForm({ ...form, [event.target.name]: event.target.value });
	};

	return (
		<>
			<Typography variant="h5">Crete a new job offer</Typography>
			<Box
				component="form"
				sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', '& > :not(style)': { m: 1, width: '50%' } }}
				noValidate
				autoComplete="off"
				onSubmit={handleSubmit}
			>
				<TextField label="Title" variant="standard" name="title" value={form.title} onChange={handleChange} />
				<TextField label="Description" variant="standard" multiline rows={4} name="description" value={form.description} onChange={handleChange} />
				<TextField label="Level" variant="standard" name="level" value={form.level} onChange={handleChange} />
				<TextField label="Availability" variant="standard" name="availability" value={form.availability} onChange={handleChange} />
				<Button variant="contained" type="submit">Create Job Offer</Button>
			</Box>
		</>

	);
};

export default CreatePost;
