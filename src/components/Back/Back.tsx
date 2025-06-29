import { useNavigate } from 'react-router-dom';

import IconBack from '@/static/icons/icon-fanhui.png';
import './Back.css';

const Back = () => {
	const navigate = useNavigate();

	return (
		<div
			className='back-container'
			onClick={() => navigate(-1)}
		>
			<img
				src={IconBack}
				alt=''
			/>
		</div>
	);
};

export default Back;
