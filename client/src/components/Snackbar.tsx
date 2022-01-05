import { Snackbar, Alert } from '@mui/material';

const CustomizedSnackbars = ({ open, setOpen, alertMessage, type }: { open: boolean, setOpen: Function, alertMessage: string, type: string }) => (
	<Snackbar
		anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
		open={open}
		autoHideDuration={4000}
		onClose={() => setOpen(false)}
	>
		<Alert variant="filled" severity={type === 'success' ? 'success' : 'error'}>{alertMessage}</Alert>
	</Snackbar>
);

export default CustomizedSnackbars;
