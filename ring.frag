precision mediump float;

uniform vec3 colours[8];
uniform float circles[8];

varying vec2 pos;

void main()
{
	vec2 centre = vec2(0.5, 0.5);
	//the lower the inverse number, the lower the lowest possible output
	float inverseNumber = 0.01;
	vec3 pixelColour = vec3(0);

	for(int loopVar = 0; loopVar < 8; loopVar++)
	{
		vec3 importedColour = colours[loopVar];
		vec3 colour = vec3(0.3, 0.6, importedColour.x);

		float radius = circles[loopVar];
		float distance = length(pos - centre) - radius;
		distance = abs(distance);

		//if the distance is greater than the inverse number, the output will be lower (i.e. closer to black)
		//the greater the distance, the more sharply the output number falls, creating a sharp glow-like gradient
		float gradientDistance = inverseNumber/distance;

		//multiplying black (i.e. 0) with the colour does nothing
		//multiplying white (i.e. 1) with the colour will tint it 
		colour *= gradientDistance;
		pixelColour += colour;
	}

	gl_FragColor = vec4(pixelColour, 1);
}