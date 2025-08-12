import Options from './components/Options';
import './WebRTC.scss';

const WebRTC = () => {
	const { controls, imgList } = Options();

	return (
		<div className='rtc-page'>
			{controls}
			<video
				id='localVideo'
				autoPlay
				playsInline
				muted
			></video>
			<div className='img-list'>
				{imgList.map((item, index) => (
					<img
						className='photo'
						key={index}
						src={item}
						alt={`photo-${index}`}
					/>
				))}
			</div>
		</div>
	);
};

export default WebRTC;
