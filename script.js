let savedElement;

let fullscreen = false;

function makeCanvasFullscreen()
{
	console.log("clicked!");

	let canvasElement = document.getElementById("canvas-container").firstElementChild;
	let vpWidth = document.documentElement.clientWidth;
	let vpHeight = document.documentElement.clientHeight;
	let dimensions = (vpWidth < vpHeight) ? vpWidth : vpHeight;

	document.body.append(canvasElement);

	savedElement = document.body.getElementsByClassName("window-exterior")[0];
	document.body.getElementsByClassName("window-exterior")[0].remove();
	
	resizeCanvas(dimensions, dimensions);
	fullscreen = true;
}

document.addEventListener('keydown', (event) =>
{
	if(fullscreen === true && event.keyCode == 27)
	{
		document.body.append(savedElement);

		let canvasElement = document.getElementsByTagName("canvas")[0];
		let container = document.getElementById("canvas-container");
		let dimensions = (container.clientWidth < container.clientHeight) ? container.clientWidth : container.clientHeight;
		
		resizeCanvas(dimensions, dimensions);
		container.appendChild(canvasElement);
		
		fullscreen = false;
	}
});