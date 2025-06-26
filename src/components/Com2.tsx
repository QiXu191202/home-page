import React from 'react';

type Com2Props = {
	str: string;
};

const Com2 = (props: Com2Props) => {
	const str = props.str;
	return (
		<div>
			Com2
			<div>str is {str}</div>
		</div>
	);
};

export default Com2;
