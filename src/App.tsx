import { Outlet } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import './App.scss';

const App: React.FC = () => {

	return (
		<ConfigProvider
			theme={{
				token: {
					colorPrimary: '#409EFF',
					borderRadius: 2,
				},
			}}
		>
			<div className='container'>
				<Outlet />
			</div>
		</ConfigProvider>
	);
};

export default App;
