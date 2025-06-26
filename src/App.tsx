import { useState } from 'react';
import { Button, ConfigProvider } from 'antd';
import Com1 from '@/components/Com1';
import Com2 from '@/components/Com2';
import './App.css';

const App: React.FC = () => {
	const [count, setCount] = useState(0);
	const [str, setStr] = useState('');

	return (
		<ConfigProvider
			theme={{
				token: {
					colorPrimary: '#409EFF',
					borderRadius: 4,
				},
			}}
		>
			<div className='container'>
				<Com1 setStr={setStr} />
				<Com2 str={str} />
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
