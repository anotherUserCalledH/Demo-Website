console.log("Hello from JavaScript!");

let ringShader;

let isInitalised;
let audioPlayer;
let beatArray;
let beatIndex;
let circleIndex;
let noCircles;
let circleTimes = [];
let circleColours = [];


function stereoToMono(samples)
{
	let audioData = [];

	let channel1Data = samples.getChannelData(0);
	let channel2Data = samples.getChannelData(1);
	let length = channel1Data.length;
	for(let i = 0; i < length; i++)
	{
		audioData[i] = (channel1Data[i] + channel2Data[i])/2;
	}

	return audioData;
}

function calcTempo(buffer)
{
	let audioData = [];

	if(buffer.numberOfChannels == 2)
	{
		audioData = stereoToMono(buffer);
	}
	else
	{
		audioData = buffer.getChanelData(0);
	}

	let musicTempo = new MusicTempo(audioData);
	return musicTempo.beats;
}

async function playVisualiser()
{
	let songFileInput = document.getElementById("songFileInput");
	let audioContext = new AudioContext({sampleRate: 44100});

	let files = songFileInput.files;
	if(files.length == 0)
	{
		console.log("No file found");
		//the function ends immediately if there is no file
		return;
	}
	else
	{
		let songFile = files[0];
		let reader = new FileReader();

		//FileReader is an async method, so the onload function will be called when it is ready
		reader.onload = async function(fileEvent)
		{
			let buffer = await audioContext.decodeAudioData(fileEvent.target.result);
			
			beatArray = calcTempo(buffer);
			audioPlayer = createAudio(URL.createObjectURL(songFile));
			initialiseSketch();
			console.log("Success!");
		}

		reader.readAsArrayBuffer(songFile);
	}
}

function getCircles(audioTime)
{
	let circleRadii = [];

	for(let currentCircle = 0; currentCircle < noCircles; currentCircle++)
	{
		let creationTime = circleTimes[currentCircle];
		let diameter = 125 + Math.pow((audioTime - creationTime), 1.5) * 250;
		circleRadii[currentCircle] = (diameter/2.0)/width;
	}

	return circleRadii;
}

function updateCircles(audioTime)
{
	if(audioTime > beatArray[beatIndex])
	{
		circleTimes[circleIndex] = audioTime;
		
		circleIndex ++;
		if(circleIndex >= noCircles)
		{
			circleIndex = 0;
		}

		while(audioTime > beatArray[beatIndex])
		{
			beatIndex ++;
			if(beatIndex >= beatArray.length)
			{
				break;
			}
		}
	}
}

function initialiseSketch()
{
	audioPlayer.play();

	beatIndex = 0;
	circleIndex = 0;
	noCircles = 8; //if this is changed, the shader must be updated

	for(let currentCircle = 0; currentCircle < noCircles; currentCircle++)
	{
		let newColour = [random() * 1.5, random() * 1.5, random() * 1.5];
		circleColours = circleColours.concat(newColour);
	}

	console.log(circleColours);

	isInitialised = true;
}

function preload()
{
	ringShader = loadShader('template.vert', 'ring.frag');
}

function setup()
{
	let canvas = createCanvas(600, 600, WEBGL);
	canvas.parent('canvas-container');
	noStroke();

	isInitialised = false;

	shader(ringShader);
}

function draw()
{
	if(isInitialised === true)
	{
		clear();

		let audioTime = audioPlayer.time();
		updateCircles(audioTime);
		circleRadii = getCircles(audioTime);
		ringShader.setUniform("colours", circleColours);
		ringShader.setUniform("circles", circleRadii);

	}
	rect(0, 0, width, height);
}

//http-server -c-1