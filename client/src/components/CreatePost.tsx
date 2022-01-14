import React, { useEffect, useState } from 'react';
import { Typography, Box, TextField, Button, Accordion, AccordionSummary, InputLabel, Select, MenuItem, AccordionDetails, SelectChangeEvent, FormControl } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import BackspaceIcon from '@mui/icons-material/Backspace';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { logout } from '../features/auth/authSlice';
import { useCreatePostMutation } from '../app/services/auth';
import useAuth from '../hooks/useAuth';
import RichEditor from './Editor/RichEditor';

const CreatePost = () => {
	const user = useAuth();
	const [input, setInput] = useState('');
	const [tags, setTags] = useState<string[]>([]);
	const initialState = { title: '',
		description: [{
			type: 'paragraph',
			children: [
	  { text: 'Write your job description!' },
			]
		}],
		qualificationLevel: '',
		availability: '',
		skills: tags,
		employeeLocation: '',
		author: user?.email };
	const [form, setForm] = useState(initialState);
	const [createPost] = useCreatePostMutation();

	const history = useHistory();
	const dispatch = useDispatch();

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		try {
			const response = await createPost(form).unwrap();

			setForm(initialState);
			setTags([]);
			window.location.reload();
			console.log(response);
		} catch (error:any) {
			console.log(error);

			if (error.name === 'TokenExpiredError') {
				dispatch(logout());

				history.push('/login');
			}
		}
	};
	useEffect(() => {
		setForm({ ...form, skills: tags });
	}, [tags]);

	const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | SelectChangeEvent<string>): void => {
		setForm({ ...form, [event.target.name]: event.target.value });
	};

	const onKeyDown = (e: { preventDefault?: any; key?: any; }) => {
		const { key } = e;
		const trimmedInput = input.trim();
		if (key === ',' && trimmedInput.length && !tags.includes(trimmedInput)) {
		  e.preventDefault();
		  setTags((prevState) => [...prevState, trimmedInput]);
		  setInput('');
		}
	  };

	  const deleteTag = (index: number) => {
		setTags((prevState) => prevState.filter((tag, i) => i !== index));
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
						<RichEditor form={form} setForm={setForm} />
						<Box sx={{ display: 'flex', gap: '5px' }}>
							{tags.map((tag, index) => <Button key={tag}>{tag} <span style={{ marginLeft: '6px', marginTop: '2px' }} onClick={() => deleteTag(index)}><BackspaceIcon sx={{ fontSize: '14px' }} /></span></Button>)}
						</Box>
						<TextField label="Add Skills by seperated commas" variant="standard" name="skills" value={input} onKeyDown={onKeyDown} onChange={(e) => setInput(e.target.value)} />

						<FormControl>
							<InputLabel id="availability" sx={{ marginLeft: '-12px' }}>Availability</InputLabel>
							<Select
								labelId="employee-Location"
								id="employeeLocation"
								value={form.availability}
								label="Employee Location"
								onChange={handleChange}
								variant='standard'
								name='availability'
							>
								<MenuItem value='Full-time'>Full-time</MenuItem>
								<MenuItem value='Part-time'>Part-time</MenuItem>
								<MenuItem value='Contract'>Contract</MenuItem>
								<MenuItem value='Internship'>Intership</MenuItem>
								<MenuItem value='Volunteer'>Volunteer</MenuItem>
								<MenuItem value='Temporary'>Temporary</MenuItem>

							</Select>
						</FormControl>
						<FormControl>
							<InputLabel id="demo-simple-select-disabled-label" sx={{ marginLeft: '-12px' }}>Employee Location</InputLabel>
							<Select
								labelId="employee-Location"
								id="employeeLocation"
								value={form.employeeLocation}
								label="Employee Location"
								onChange={handleChange}
								variant='standard'
								name='employeeLocation'
							>
								<MenuItem value='On-site'>On-site</MenuItem>
								<MenuItem value='Remote'>Remote</MenuItem>
								<MenuItem value='Hybrid'>Hybrid</MenuItem>
							</Select>
						</FormControl>
						<FormControl>
							<InputLabel id="qualification-level" sx={{ marginLeft: '-12px' }}>Level</InputLabel>
							<Select
								labelId="employee-Location"
								id="employeeLocation"
								value={form.qualificationLevel}
								label="Employee Location"
								onChange={handleChange}
								variant='standard'
								name='qualificationLevel'
							>
								<MenuItem value='Junior'>Junior</MenuItem>
								<MenuItem value='Mid'>Mid</MenuItem>
								<MenuItem value='Senior'>Senior</MenuItem>
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
