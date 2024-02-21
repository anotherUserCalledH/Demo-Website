function makeCanvasFullscreen()
{
	console.log("clicked!");

	let canvas = document.getElementById("canvas-container").firstElementChild;
	let vpWidth = document.documentElement.clientWidth;
	let vpHeight = document.documentElement.clientHeight;
	let dimensions = (vpWidth < vpHeight) ? vpWidth : vpHeight;

	document.body.append(canvas);
	document.body.getElementsByClassName("window-exterior")[0].remove();
	
	resizeCanvas(dimensions, dimensions);
}