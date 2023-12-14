console.log("Hello from JavaScript!");

let exampleShader;

// load in the shader
function preload()
{
	exampleShader = loadShader('example.vert', 'example.frag');
}

function setup()
{
	let canvas = createCanvas(600, 600, WEBGL);
	canvas.parent('canvas-container');

	//tell p5 to use the shader
	shader(exampleShader);

	//turns of shape outlines
	noStroke();
}

function draw()
{
	//wipes the screen in each frame
	clear();

	//draws something in order to run the shader
	rect(0, 0, width, height);

	// ellipse(0, 0, width, height, 150);
}