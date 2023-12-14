precision mediump float;

uniform float millis;

varying vec2 pos;

void main()
{
	float red = sin((pos.x * 16.0) + (millis/1000.0));
	gl_FragColor = vec4(red, (24.0/255.0), (24.0/255.0), 1.0);
}