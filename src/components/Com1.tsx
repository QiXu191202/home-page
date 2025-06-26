import React, { useState } from 'react';
import { Button, Input } from 'antd';

type Com1Props = {
	setStr: (str: string) => void;
};

const Com1 = (props: Com1Props) => {
	const onClick = () => {
		props.setStr(value);
	};

  const [value, setValue] = useState('');
  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

	return (
		<div>
      <Input value={value} onChange={onChange} placeholder='请输入...' />
			<Button
				type='primary'
				onClick={onClick}
			>Click Me</Button>
		</div>
	);
};

export default Com1;
