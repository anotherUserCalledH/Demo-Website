precision mediump float;

uniform float millis;

varying vec2 pos;

void main()
{
	float red = sin((pos.y * 16.0) - (millis/1000.0));
	red = (red * step(0.0, red)) + (36.0/255.0);

	gl_FragColor = vec4(red, (36.0/255.0), (36.0/255.0), 1.0);
}