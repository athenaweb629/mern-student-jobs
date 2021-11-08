import { Navigate } from 'react-router-dom';
import { Navbar } from './components';
import { Main } from './pages';

const App = () => {
	const isLoggedIn = false;

	if (!isLoggedIn) return <Navigate to="/auth" />;

	return (
		<div>
			<Navbar />
			<Main />
		</div>
	);
};

export default App;
