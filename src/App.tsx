import { useState } from 'react';
import { Button, ConfigProvider } from 'antd';
import './App.css';

const App: React.FC = () => {
	const [count, setCount] = useState(0);

	return (
		<ConfigProvider
			theme={{
				token: {
					colorPrimary: '#409EFF',
					borderRadius: 4,
				},
			}}
		>
			<div className='card'>
				<Button
					type='primary'
					onClick={() => setCount((count) => count + 1)}
				>
					Count is {count}
				</Button>
			</div>
		</ConfigProvider>
	);
};

export default App;
