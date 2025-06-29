import React from 'react';
import { useNavigate } from 'react-router-dom';
import Back from '@/components/Back/Back';
import { gameList } from '@/common/data';
import './List.css';

const List = () => {
	const navigate = useNavigate();

	return (
		<div className='list-page'>
			<Back />

			<div className='list-container'>
				{gameList.map((item) => (
					<div
						key={item.id}
						className='list-item'
						onClick={() => navigate(item.path)}
					>
						<div className='list-item-wrap'>
							<div className='list-item-name'>{item.name}</div>
							<div className='list-item-desc'>{item.desc}</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default List;
