
	import { render } from 'react-dom'
	import Board from './Board';

	const ITEMS = [
		{
			id: 1,
			text: 'Write a cool JS library',
		},
		{
			id: 2,
			text: 'Make it generic enough',
		},
		{
			id: 3,
			text: 'Write README',
		},
		{
			id: 4,
			text: 'Create some examples',
		},
		{
			id: 5,
			text: 'Spam in Twitter and IRC to promote it (note that this element is taller than the others). Spam in Twitter and IRC to promote it (note that this element is taller than the others)',
		},
		{
			id: 6,
			text: '??? Spam in Twitter and IRC to promote it (note that this element is taller than the others)',
		},
		{
			id: 7,
			text: 'PROFIT',
		},
		{
			id: 8,
			text: 'Write a cool JS library. Spam in Twitter and IRC to promote it (note that this element is taller than the others). Spam in Twitter and IRC to promote it (note that this element is taller than the others)',
		},
		{
			id: 9,
			text: 'Make it generic enough',
		},
		{
			id: 10,
			text: 'Write README',
		},
		{
			id: 11,
			text: 'Create some examples',
		},
		{
			id: 12,
			text: 'Spam in Twitter and IRC to promote it (note that this element is taller than the others)',
		},
		{
			id: 13,
			text: '???',
		},
	];
	
	function App() {
		return (
			<Board items={ITEMS}></Board>
		)
	}

	const rootElement = document.getElementById('root')
	render(<App />, rootElement)
