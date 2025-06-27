import { useState } from 'react';
import { Button, ConfigProvider, Modal } from 'antd';
import Com1 from '@/components/Com1';
import Com2 from '@/components/Com2';
import { useNavigate } from 'react-router-dom';

const App: React.FC = () => {
	const [str, setStr] = useState('');
	const navigate = useNavigate();

	const onListClick = () => {
		Modal.confirm({
			title: '确认跳转吗？',
			onOk: () => {
				navigate('/list')
			}
		})
	}

	return (
		<ConfigProvider
			theme={{
				token: {
					colorPrimary: '#409EFF',
					borderRadius: 4,
				},
			}}
		>
			<div className=''>
				<Com1 setStr={setStr} />
				<Com2 str={str} />

				<Button onClick={onListClick}>点击跳转List</Button>
			</div>
		</ConfigProvider>
	);
};

export default App;
