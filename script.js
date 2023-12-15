console.log("Hello from JavaScript!");

let exampleShader;

let isInitalised;
let audioPlayer;
let beatArray;
let beatIndex;
let circleIndex;
let noCircles;
let circles = [];


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
			//the decodeAudioData accepts two arguments - the data to decode and a success callback
			//the callback function is called when the decoding is complete
			let buffer = await audioContext.decodeAudioData(fileEvent.target.result);
			
			beatArray = calcTempo(buffer);
			audioPlayer = createAudio(URL.createObjectURL(songFile));
			initialiseSketch();
			console.log("Success!");
		}

		reader.readAsArrayBuffer(songFile);
	}
}

function drawBeat(audioTime)
{
	for(let creationTime of circles)
	{
		let diameter = 125 + Math.pow((audioTime - creationTime), 1.5) * 250;
		ellipse(width/2.0, height/2.0, diameter);
	}
}

function updateBeat(audioTime)
{
	if(audioTime > beatArray[beatIndex])
	{
		circles[circleIndex] = audioTime;
		
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

	clear();
	drawBeat(audioTime);
}

function initialiseSketch()
{
	audioPlayer.play();

	beatIndex = 0;
	circleIndex = 0;
	noCircles = 8;

	isInitialised = true;
}

// load in the shader
function preload()
{
	// exampleShader = loadShader('example.vert', 'example.frag');
}

function setup()
{
	let canvas = createCanvas(600, 600);
	canvas.parent('canvas-container');
	noFill();
	// fill("red");

	isInitialised = false;

	//tell p5 to use the shader
	// shader(exampleShader);
}

function draw()
{
	if(isInitialised === true)
	{
		updateBeat(audioPlayer.time());

		
		// exampleShader.setUniform("millis", millis());
	}
}