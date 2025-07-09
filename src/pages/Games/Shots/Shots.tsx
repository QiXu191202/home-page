import { useState, useEffect, useRef } from 'react';
import { message, Button } from 'antd';
import './Shots.scss';

export default function BreakoutGame() {
  const canvasRef = useRef(null);
  const [isRunning, setIsRunning] = useState(false);
  const [score, setScore] = useState(0);
  const [messageApi, contextHolder] = message.useMessage();

  const canvasWidth = 480;
  const canvasHeight = 320;
  const paddleWidth = 75;
  const paddleHeight = 10;
  const ballRadius = 8;
  const brickRowCount = 3;
  const brickColumnCount = 5;
  const brickWidth = 75;
  const brickHeight = 20;
  const brickPadding = 10;
  const brickOffsetTop = 30;
  const brickOffsetLeft = 30;

  const paddleRef = useRef(canvasWidth / 2 - paddleWidth / 2);
  const ballRef = useRef({ x: canvasWidth / 2, y: canvasHeight - 30, dx: 2, dy: -2 });
  const bricksRef = useRef([]);
  const scoreRef = useRef(0);
  const totalBricks = brickRowCount * brickColumnCount;

  const initializeBricks = () => {
    const bricks = [];
    for (let c = 0; c < brickColumnCount; c++) {
      bricks[c] = [];
      for (let r = 0; r < brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
      }
    }
    bricksRef.current = bricks;
  };

  useEffect(() => {
    initializeBricks();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const drawBricks = () => {
      for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
          if (bricksRef.current[c][r].status === 1) {
            const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
            const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
            bricksRef.current[c][r].x = brickX;
            bricksRef.current[c][r].y = brickY;
            ctx.fillStyle = '#fff';
            ctx.fillRect(brickX, brickY, brickWidth, brickHeight);
          }
        }
      }
    };

    const drawBall = () => {
      ctx.beginPath();
      ctx.arc(ballRef.current.x, ballRef.current.y, ballRadius, 0, Math.PI * 2);
      ctx.fillStyle = '#fff';
      ctx.fill();
      ctx.closePath();
    };

    const drawPaddle = () => {
      ctx.fillStyle = '#fff';
      ctx.fillRect(paddleRef.current, canvasHeight - paddleHeight, paddleWidth, paddleHeight);
    };

    const drawScore = () => {
      ctx.font = '16px Arial';
      ctx.fillStyle = '#fff';
      ctx.fillText(`Score: ${scoreRef.current}`, 8, 20);
    };

    const collisionDetection = () => {
      for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
          const b = bricksRef.current[c][r];
          if (b.status === 1) {
            if (
              ballRef.current.x > b.x &&
              ballRef.current.x < b.x + brickWidth &&
              ballRef.current.y > b.y &&
              ballRef.current.y < b.y + brickHeight
            ) {
              ballRef.current.dy = -ballRef.current.dy;
              b.status = 0;
              scoreRef.current += 1;
              setScore(scoreRef.current);
              if (scoreRef.current === totalBricks) {
                messageApi.open({
                  type: 'success',
                  content: 'Congratulations!!!!!!!!!',
                });
                setIsRunning(false);
              }
            }
          }
        }
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      drawBricks();
      drawBall();
      drawPaddle();
      drawScore();
      collisionDetection();

      if (
        ballRef.current.x + ballRef.current.dx > canvasWidth - ballRadius ||
        ballRef.current.x + ballRef.current.dx < ballRadius
      ) {
        ballRef.current.dx = -ballRef.current.dx;
      }
      if (ballRef.current.y + ballRef.current.dy < ballRadius) {
        ballRef.current.dy = -ballRef.current.dy;
      } else if (ballRef.current.y + ballRef.current.dy > canvasHeight - ballRadius) {
        if (
          ballRef.current.x > paddleRef.current &&
          ballRef.current.x < paddleRef.current + paddleWidth
        ) {
          ballRef.current.dy = -ballRef.current.dy;
        } else {
          messageApi.open({
            type: 'error',
            content: 'Game Over!!!!!!!!!!',
          });
          setIsRunning(false);
        }
      }

      ballRef.current.x += ballRef.current.dx;
      ballRef.current.y += ballRef.current.dy;
    };

    const loop = () => {
      if (isRunning) {
        draw();
        animationFrameId = requestAnimationFrame(loop);
      }
    };

    loop();

    return () => cancelAnimationFrame(animationFrameId);
  }, [isRunning]);

  const handleMouseMove = (e) => {
    const relativeX = e.nativeEvent.offsetX;
    if (relativeX > 0 && relativeX < canvasWidth) {
      paddleRef.current = relativeX - paddleWidth / 2;
    }
  };

  const handleStartGame = () => {
    setScore(0);
    scoreRef.current = 0;
    ballRef.current = { x: canvasWidth / 2, y: canvasHeight - 30, dx: 2, dy: -2 };
    initializeBricks();
    setIsRunning(true);
  };

	return (
		<div className='shots-page flex flex-col items-center mt-10'>
			{contextHolder}
			<canvas
				ref={canvasRef}
				width={canvasWidth}
				height={canvasHeight}
				className='border border-gray-400 rounded-2xl shadow-lg'
				onMouseMove={handleMouseMove}
			/>
			{!isRunning && <Button onClick={handleStartGame}>点击开始</Button>}
		</div>
	);
}
