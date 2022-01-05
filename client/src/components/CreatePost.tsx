import React, { useState } from 'react';
import { Typography, Box, TextField, Button, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { useCreatePostMutation } from '../app/services/auth';
import useAuth from '../hooks/useAuth';

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
			<Accordion sx={{ borderRadius: '20px !important', outline: 'none', boxShadow: '0px 0px 10px rgb(0 0 0 / 5%) ', }}>
				<AccordionSummary sx={{ display: 'flex', alignItems: 'center', borderRadius: '20px', background: '#FFFFFF' }} expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
					<Typography variant="h5" sx={{ color: 'text.secondary' }}>Create a new job offer</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Box onSubmit={handleSubmit} component="form" sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', '& > :not(style)': { m: 1, width: '50%' } }} noValidate autoComplete="off">
						<TextField label="Title" variant="standard" name="title" value={form.title} onChange={handleChange} />
						<TextField label="Description" variant="standard" multiline rows={4} name="description" value={form.description} onChange={handleChange} />
						<TextField label="Level" variant="standard" name="level" value={form.level} onChange={handleChange} />
						<TextField label="Availability" variant="standard" name="availability" value={form.availability} onChange={handleChange} />
						<Button variant="contained" type="submit">Create Job Offer</Button>
					</Box>
				</AccordionDetails>
			</Accordion>
		</>
	);
};

export default CreatePost;
