import React from 'react';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const List = () => {
	const navigate = useNavigate();

	const naviBackClick = () => {
		navigate(-1);
	};

	return (
		<div className=''>
			<div>ListPage</div>
			<Button onClick={naviBackClick}>返回</Button>
		</div>
	);
};

export default List;
