// import { useState } from 'react';
import { Button, ConfigProvider, Modal, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import './Home.scss';

const App: React.FC = () => {
	const navigate = useNavigate();

	const onListClick = (event: React.MouseEvent) => {
		console.log(event);
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
			<div className='home-container'>
				<Space>
					<Button onClick={onListClick}>点击跳转List</Button>
					<Button onClick={() => navigate('/info')}>点击跳转Info</Button>
				</Space>
			</div>
		</ConfigProvider>
	);
};

export default App;
