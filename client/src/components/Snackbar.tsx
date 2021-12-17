import { Snackbar, Alert } from '@mui/material';

const CustomizedSnackbars = ({ open, setOpen, alertMessage }: { open: boolean, setOpen: Function, alertMessage: string }) => (
	<Snackbar
		anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
		open={open}
		autoHideDuration={4000}
		onClose={() => setOpen(false)}
	>
		<Alert variant="filled" severity={alertMessage === 'Success' ? 'success' : 'error'}>{alertMessage}</Alert>
	</Snackbar>
);

export default CustomizedSnackbars;
