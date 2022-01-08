import { useState, useEffect } from 'react';
import { ListItem, ListItemIcon, ListItemText, Box, Badge } from '@mui/material';
import { useHistory, useLocation } from 'react-router-dom';

import { home, messaging, network, jobs, work, notifications } from '../assets/icons';

const menu = [
	{ text: 'Home', icon: home, link: '/' },
	{ text: 'Network', icon: network, link: '/' },
	{ text: 'Jobs', icon: jobs, link: '/' },
	{ text: 'Messaging', icon: messaging, link: '/chat' },
	{ text: 'Notifications', icon: notifications, link: '/' },
	{ text: 'Work', icon: work, link: '/' },
];

const Sidebar = () => {
	const [selectedIndex, setSelectedIndex] = useState(0);
	const history = useHistory();
	const location = useLocation();

	useEffect(() => {
		if (location.pathname.includes('chat')) setSelectedIndex(3);
	}, [location.pathname]);

	console.log(selectedIndex);

	return (
		<Box sx={{ padding: 2 }}>
			{menu.map(({ text, icon, link }, index) => (
				<ListItem
					button
					key={text}
					selected={selectedIndex === index}
					onClick={() => {
						setSelectedIndex(index);

						history.push(link);
					}}
				>
					<ListItemIcon>
						{index === 3 ? (
							<Badge badgeContent={5} color="primary" overlap="circular">
								<img src={icon} width="40" height="40" />
							</Badge>
						) : <img src={icon} width="40" height="40" />}
					</ListItemIcon>
					<ListItemText primary={text} />
				</ListItem>
			))}
		</Box>
	);
};

export default Sidebar;
