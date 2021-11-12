import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Navbar } from './components';
import { Main } from './pages';
import { selectCurrentUser } from './features/auth/authSlice';

const App = () => {
	const user = useSelector(selectCurrentUser);

	if (user?.success) return <Navigate to='/' />;

	return (
		<div>
			<Navbar />
			<Main />
		</div>
	);
};

export default App;
