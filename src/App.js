import React from 'react';
import './App.css';

// Array for heater kit notes
const bankOne = [
	{
		keyCode: 81,
		keyTrigger: 'Q',
		id: 'Heater-1',
		url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
	},
	{
		keyCode: 87,
		keyTrigger: 'W',
		id: 'Heater-2',
		url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
	},
	{
		keyCode: 69,
		keyTrigger: 'E',
		id: 'Heater-3',
		url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
	},
	{
		keyCode: 65,
		keyTrigger: 'A',
		id: 'Heater-4',
		url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
	},
	{
		keyCode: 83,
		keyTrigger: 'S',
		id: 'Clap',
		url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
	},
	{
		keyCode: 68,
		keyTrigger: 'D',
		id: 'Open-HH',
		url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
	},
	{
		keyCode: 90,
		keyTrigger: 'Z',
		id: "Kick-n'-Hat",
		url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
	},
	{
		keyCode: 88,
		keyTrigger: 'X',
		id: 'Kick',
		url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
	},
	{
		keyCode: 67,
		keyTrigger: 'C',
		id: 'Closed-HH',
		url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
	}
];

// Array for piano kit notes
const bankTwo = [
	{
		keyCode: 81,
		keyTrigger: 'Q',
		id: 'Chord-1',
		url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3'
	},
	{
		keyCode: 87,
		keyTrigger: 'W',
		id: 'Chord-2',
		url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3'
	},
	{
		keyCode: 69,
		keyTrigger: 'E',
		id: 'Chord-3',
		url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3'
	},
	{
		keyCode: 65,
		keyTrigger: 'A',
		id: 'Shaker',
		url: 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3'
	},
	{
		keyCode: 83,
		keyTrigger: 'S',
		id: 'Open-HH',
		url: 'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3'
	},
	{
		keyCode: 68,
		keyTrigger: 'D',
		id: 'Closed-HH',
		url: 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3'
	},
	{
		keyCode: 90,
		keyTrigger: 'Z',
		id: 'Punchy-Kick',
		url: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3'
	},
	{
		keyCode: 88,
		keyTrigger: 'X',
		id: 'Side-Stick',
		url: 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3'
	},
	{
		keyCode: 67,
		keyTrigger: 'C',
		id: 'Snare',
		url: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3'
	}
];

// Plays sound
const playSound = (key, volume) => {
	const sound = document.getElementById(key);
	sound.volume = volume;
	sound.currentTime = 0;
	sound.play();
};

// Handle button clicks
const onClickHandler = (id, power, setDisplay, key, volume) => {
	const style = document.getElementById(id).style;
	style.margin = '2px';
	if (power) {
		setDisplay(id);
		playSound(key, volume);
		style.background = '#f514f5';
	}
	setTimeout(() => {
		style.background = 'pink';
		style.margin = '0';
	}, 100);
};

// Drum pad buttons
const DrumPad = ({ buttonText, setDisplay, power, id, url, volume }) => {
	return (
		<button
			id={id}
			className="drum-pad"
			onClick={() => {
				onClickHandler(id, power, setDisplay, buttonText, volume);
			}}
		>
			<audio className="clip" id={buttonText} src={url} />
			{buttonText}
		</button>
	);
};

// Power switch button
const PowerSwitch = ({ power, setPower }) => {
	return (
		<div className="power-switch">
			<h4>power</h4>
			<input type="checkbox" className="switch" checked={power} onChange={() => setPower(!power)} />
		</div>
	);
};

// Volume slider
const VolumeChanger = ({ volume, setVolume, setDisplay, power }) => {
	return (
		<div className="volume-slider">
			<input
				type="range"
				value={volume}
				id="slider"
				onChange={() => {
					if (power) {
						setVolume(document.getElementById('slider').value / 100);
						setDisplay(`Volume: ${Math.round(document.getElementById('slider').value)}`);
						setTimeout(() => setDisplay(''), 1500);
					}
				}}
			/>
		</div>
	);
};

// Instrument selector buttons
const KitSwitch = ({ kit, setKit, on, power }) => {
	return (
		<div className="kit-switch">
			<input type="checkbox" className="switch2" checked={on} onChange={() => power && setKit(kit)} />
			<label>{kit === '0' ? 'heater kit' : 'smooth piano kit'}</label>
		</div>
	);
};

// Drum pad
const Pad = ({ pad, setDisplay, power, volume }) => {
	React.useEffect(() => {
		const handleKeyPress = ({ keyCode }) => {
			power &&
				pad.filter(
					(tune) =>
						tune.keyCode === keyCode && onClickHandler(tune.id, power, setDisplay, tune.keyTrigger, volume)
				);
		};

		document.addEventListener('keydown', handleKeyPress);
		return () => {
			document.removeEventListener('keydown', handleKeyPress);
		};
	});

	return (
		<div className="drum-pad-container">
			{pad.map((tune) => (
				<DrumPad
					key={tune.id}
					id={tune.id}
					buttonText={tune.keyTrigger}
					volume={volume}
					url={tune.url}
					setDisplay={setDisplay}
					power={power}
				/>
			))}
		</div>
	);
};

function App() {
	// state variables
	const useState = React.useState;
	const [ power, setPower ] = useState(true);
	const [ kit, setKit ] = useState('0');
	const [ volume, setVolume ] = useState('0.3');
	const [ display, setDisplay ] = useState('');

	return (
		<div id="drum-machine">
			<Pad pad={kit === '0' ? bankOne : bankTwo} setDisplay={setDisplay} power={power} volume={volume} />
			<div className="controls-container">
				<PowerSwitch power={power} setPower={setPower} />
				<div id="display">{display}</div>
				<VolumeChanger volume={volume * 100} setVolume={setVolume} power={power} setDisplay={setDisplay} />
				<div className="kit-selector-wrapper">
					<h4>bank</h4>
					<div className="kit-selector">
						<KitSwitch key={'0'} kit={'0'} on={kit === '0' && true} power={power} setKit={setKit} />
						<KitSwitch key={'1'} kit={'1'} on={kit === '1' && true} power={power} setKit={setKit} />
					</div>
				</div>
			</div>
			<div className="background-text">drum machine</div>
		</div>
	);
}

export default App;
