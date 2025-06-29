import React, {
	useState,
	useRef,
	useEffect,
	useImperativeHandle,
	forwardRef,
	CSSProperties,
} from 'react';

export interface TimerHandle {
	start: () => void;
	stop: () => void;
	reset: () => void;
	getTime: () => number;
}

interface TimerProps {
	onEnd?: (duration: number) => void;
	style?: CSSProperties;
}

const formatTime = (ms: number): string => {
	const totalSeconds = Math.floor(ms / 1000);
	const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
	const seconds = String(totalSeconds % 60).padStart(2, '0');
	const milliseconds = String(ms % 1000).padStart(3, '0');
	return `${minutes}:${seconds}.${milliseconds}`;
};

const Timer = forwardRef<TimerHandle, TimerProps>(({ onEnd, style }, ref) => {
	const [time, setTime] = useState(0);
	const timerRef = useRef<number | null>(null);
	const startTimeRef = useRef<number>(0);

	const tick = () => {
		const now = Date.now();
		setTime(now - startTimeRef.current);
		timerRef.current = requestAnimationFrame(tick);
	};

	const start = () => {
		if (timerRef.current !== null) return;
		startTimeRef.current = Date.now() - time;
		timerRef.current = requestAnimationFrame(tick);
	};

	const stop = () => {
		if (timerRef.current !== null) {
			cancelAnimationFrame(timerRef.current);
			timerRef.current = null;
			if (onEnd) onEnd(time);
		}
	};

	const reset = () => {
		stop();
		setTime(0);
	};

	useImperativeHandle(ref, () => ({
		start,
		stop,
		reset,
		getTime: () => time,
	}));

	useEffect(() => {
		return () => {
			if (timerRef.current !== null) {
				cancelAnimationFrame(timerRef.current);
			}
		};
	}, []);

	return <div style={{ fontSize: '20px', color: '#333', ...style }}>{formatTime(time)}</div>;
});

export default Timer;
