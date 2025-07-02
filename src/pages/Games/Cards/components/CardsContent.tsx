import { useState, useEffect, useRef } from 'react';
import { shuffleArray } from '@/utils/utils';
import { cardsList, CardItem } from '@/common/data';
import { Modal } from 'antd';
import './CardsContent.scss';

type CardsContentProps = {
	start: boolean;
};

const CardsContent = (props: CardsContentProps) => {
	const { start } = props;
	useEffect(() => {
		if (!start) {
			selectedList.current = [];
			setList(
				list.map((item) => ({
					...item,
					selected: false,
					matched: false,
				}))
			);
		}
	}, [start]);

	const [list, setList] = useState<Array<CardItem>>([]);
	useEffect(() => {
		const resList = shuffleArray(cardsList);
		setList(resList);
	}, []);

	const selectedList = useRef<number[]>([]);
	const onCardClick = (index: number) => {
		if (!start) {
			Modal.info({
				title: '请先开始计时',
			});
			return;
		};
		if (selectedList.current.length < 2) {
			selectedList.current.push(index);
			console.log('selectedList', selectedList.current);
			setList(
				list.map((item, i) => ({
					...item,
					selected: i === selectedList.current[0] || i === selectedList.current[1],
				}))
			);

      setTimeout(() => {
        if (selectedList.current.length === 2) {
          const [first, second] = selectedList.current;
          if (list[first].id === list[second].id) {
						const matchedId = list[first].id;
            setList(
							list.map((item) => ({
								...item,
                matched: item.id === matchedId || item.matched,
              }))
            );
						selectedList.current = [];
          } else {
						selectedList.current = [];
            setList(
              list.map((item) => ({
                ...item,
                selected: false,
              }))
            );
          }
        }
      }, 800)
		}
	};

	return (
		<div className='card-content'>
			{list.map((item, index) => (
				<div
					className={`card-item ${item.selected ? 'selected' : ''} ${item.matched ? 'matched' : ''}`}
					key={index}
					onClick={() => onCardClick(index)}
				>
					{item.selected || item.matched ? item.name : '点'}
				</div>
			))}
		</div>
	);
};

export default CardsContent;
