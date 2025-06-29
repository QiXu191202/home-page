import { useRef, useState } from 'react';
import Timer, { TimerHandle } from '@/components/Timer/Timer';
import { Button, Space } from 'antd';
import CardsContent from './components/CardsContent';
import './Cards.scss';

const Cards = () => {
	const timerRef = useRef<TimerHandle>(null);
	const [start, setIsStart] = useState(false);

	const handleStart = () => {
		if (start) return;
		setIsStart(true);
		timerRef.current?.start();
	};

	const handleStop = () => {
		setIsStart(false);
		timerRef.current?.stop();
	};

	const handleReset = () => {
		setIsStart(false);
		timerRef.current?.reset();
	};

	const handleEnd = (duration: number) => {
		console.log('计时结束，总耗时(ms)：', duration);
	};

	return (
		<div className='cards-page'>
			<div className='top-info'>
				<div className='title'>卡牌</div>
				<Timer
					ref={timerRef}
					onEnd={handleEnd}
					style={{ fontSize: '28px', color: '#fff' }}
				/>
			</div>
			<CardsContent start={start} />
			<div className='cards-options'>
				<Space>
					<Button onClick={handleStart} disabled={start} type="primary">开始</Button>
					<Button onClick={handleStop} disabled={!start}>停止</Button>
					<Button onClick={handleReset}>重置</Button>
				</Space>
			</div>
		</div>
	);
};

export default Cards;
