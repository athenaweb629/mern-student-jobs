import React, { useState } from 'react';
import { Typography, Box, TextField, Button, Accordion, AccordionSummary, InputLabel, Select, MenuItem, AccordionDetails, SelectChangeEvent, FormControl } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { useCreatePostMutation } from '../app/services/auth';
import useAuth from '../hooks/useAuth';

const CreatePost = () => {
	const user = useAuth();
	const [form, setForm] = useState({ title: '', description: '', level: ['Junior', 'Mid', 'Senior'], availability: ['Full-time', 'Part-time', 'Contract', 'Temporary', 'Volunteer', 'Internship'], skills: '', employeeLocation: ['On-site', 'Remote', 'Hybrid'], author: user?.email });
	const [createPost] = useCreatePostMutation();

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		try {
			const response = await createPost(form).unwrap();

			console.log(response);
		} catch (error:any) {
			console.log(error);
		}
	};

	const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | SelectChangeEvent<string>): void => {
		setForm({ ...form, [event.target.name]: event.target.value });
		console.log(event.target.value, event.target.name);
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
						<TextField label="Skills" variant="standard" name="skills" value={form.skills} onChange={handleChange} />
						<FormControl>
							<InputLabel id="availability">Availability</InputLabel>
							<Select
								labelId="employee-Location"
								id="employeeLocation"
								// value={form.availability}
								label="Employee Location"
								onChange={handleChange}
								variant='standard'
								name='availability'
							>
								{
									form.availability.map((item) => (
										<MenuItem value={item} key={item}>{item}</MenuItem>
									))
								}
							</Select>
						</FormControl>
						<FormControl>
							<InputLabel id="demo-simple-select-disabled-label">Employee Location</InputLabel>
							<Select
								labelId="employee-Location"
								id="employeeLocation"
								// value={form.employeeLocation}
								label="Employee Location"
								onChange={handleChange}
								variant='standard'
								name='employeeLocation'
							>
								{
									form.employeeLocation.map((loc) => (
										<MenuItem value={loc} key={loc}>{loc}</MenuItem>
									))
								}
							</Select>
						</FormControl>
						<FormControl>
							<InputLabel id="qualification-level">Level</InputLabel>
							<Select
								labelId="employee-Location"
								id="employeeLocation"
								// value={form.level}
								label="Employee Location"
								onChange={handleChange}
								variant='standard'
								// name='level'
							>
								{
									form.level.map((item) => (
										<MenuItem value={item} key={item}>{item}</MenuItem>
									))
								}
							</Select>
						</FormControl>

						<Button variant="contained" type="submit">Create Job Offer</Button>
					</Box>
				</AccordionDetails>
			</Accordion>
		</>
	);
};

export default CreatePost;
