
	import { render } from 'react-dom'
	import Board from './Board';
	
	function App() {
		return (
			<Board></Board>
		)
	}

	const rootElement = document.getElementById('root')
	render(<App />, rootElement)
