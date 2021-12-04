import React from 'react';
import { styled, alpha } from '@mui/material/styles';
import { AppBar, Box, Toolbar, IconButton, Typography, InputBase, Badge, MenuItem, Menu, Avatar } from '@mui/material';
import { Search as SearchIcon, AccountCircle, Mail, Notifications, Menu as MenuIcon, Logout } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { avatar } from '../assets/images';
import { logout } from '../features/auth/authSlice';
import useAuth from '../hooks/useAuth';

const Search = styled('div')(({ theme }) => ({
	position: 'relative',
	borderRadius: theme.shape.borderRadius,
	backgroundColor: alpha(theme.palette.common.white, 0.15),
	'&:hover': {
		backgroundColor: alpha(theme.palette.common.white, 0.25),
	},
	marginRight: theme.spacing(2),
	marginLeft: 0,
	width: '100%',
	[theme.breakpoints.up('sm')]: {
		marginLeft: theme.spacing(3),
		width: 'auto',
	},
}));

const SearchWrapper = styled('div')(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: '100%',
	position: 'absolute',
	pointerEvents: 'none',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: 'inherit',
	'& .MuiInputBase-input': {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from Search
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('md')]: {
			width: '20ch',
		},
	},
}));

const Navbar = () => {
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState<null | HTMLElement>(null);

	const user = useAuth();

	const isMenuOpen = Boolean(anchorEl);
	const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

	const dispatch = useDispatch();
	const history = useHistory();

	const handleMobileMenuClose = () => {
		setMobileMoreAnchorEl(null);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
		handleMobileMenuClose();
	};

	const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
		setMobileMoreAnchorEl(event.currentTarget);
	};

	const menuId = 'primary-search-account-menu';
	const renderMenu = (
		<Menu anchorEl={anchorEl} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} id={menuId} keepMounted transformOrigin={{ vertical: 'top', horizontal: 'right' }} open={isMenuOpen} onClose={handleMenuClose}>
			<MenuItem onClick={handleMenuClose}>Profile</MenuItem>
			<MenuItem onClick={handleMenuClose}>My account</MenuItem>
		</Menu>
	);

	const mobileMenuId = 'primary-search-account-menu-mobile';
	const renderMobileMenu = (
		<Menu anchorEl={mobileMoreAnchorEl} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} id={mobileMenuId} keepMounted transformOrigin={{ vertical: 'top', horizontal: 'right' }} open={isMobileMenuOpen} onClose={handleMobileMenuClose}>
			<MenuItem>
				<IconButton size="large" aria-label="show 4 new mails" color="inherit">
					<Badge badgeContent={4} color="error">
						<Mail color="primary" />
					</Badge>
				</IconButton>
				<p>Messages</p>
			</MenuItem>
			<MenuItem>
				<IconButton size="large" aria-label="show 17 new notifications" color="inherit">
					<Badge badgeContent={17} color="error">
						<Notifications color="primary" />
					</Badge>
				</IconButton>
				<p>Notifications</p>
			</MenuItem>
			<MenuItem>
				<IconButton size="large" aria-label="account of current user" aria-controls="primary-search-account-menu" aria-haspopup="true" color="inherit">
					<AccountCircle color="primary" />
				</IconButton>
				<p>Profile</p>
			</MenuItem>
		</Menu>
	);

	return (
		<Box sx={{ flexGrow: 1, margin: '30px' }}>
			<AppBar position="static" sx={{ background: '#FFFFFF', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.05)', borderRadius: '20px' }}>
				<Toolbar>
					<Box sx={{ display: 'flex', alignItems: 'center' }}>
						<Avatar sx={{ mr: 1 }} alt="Avatar" src={avatar} />
						<Typography variant="h6" noWrap component="div" color="text.primary" sx={{ display: { xs: 'none', sm: 'block' } }}>
							{user?.name}
						</Typography>
					</Box>
					<Search>
						<SearchWrapper>
							<SearchIcon />
						</SearchWrapper>
						<StyledInputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} />
					</Search>
					<Box sx={{ flexGrow: 1 }} />
					<Box sx={{ display: { xs: 'none', md: 'flex' } }}>
						<IconButton size="large" aria-label="show 4 new mails" color="inherit">
							<Badge badgeContent={4} color="error">
								<Mail color="primary" />
							</Badge>
						</IconButton>
						<IconButton size="large" aria-label="show 17 new notifications" color="inherit">
							<Badge badgeContent={17} color="error">
								<Notifications color="primary" />
							</Badge>
						</IconButton>
						<IconButton size="large" edge="end" aria-label="account of current user" aria-controls={menuId} aria-haspopup="true" color="inherit">
							<AccountCircle color="primary" />
						</IconButton>
						<IconButton size="large" aria-label="logout" color="inherit" onClick={() => { dispatch(logout()); history.push('/login'); }}>
							<Logout color="primary" />
						</IconButton>
					</Box>
					<Box sx={{ display: { xs: 'flex', md: 'none' } }}>
						<IconButton size="large" aria-label="show more" aria-controls={mobileMenuId} aria-haspopup="true" onClick={handleMobileMenuOpen} color="inherit">
							<MenuIcon color="primary" />
						</IconButton>
					</Box>
					<Box sx={{ display: { xs: 'flex', md: 'none' } }}>
						<IconButton size="large" aria-label="logout" color="inherit" onClick={() => { dispatch(logout()); history.push('/login'); }}>
							<Logout color="primary" />
						</IconButton>
					</Box>
				</Toolbar>
			</AppBar>
			{renderMobileMenu}
			{renderMenu}
		</Box>
	);
};

export default Navbar;
