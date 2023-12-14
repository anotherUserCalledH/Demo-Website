precision mediump float;

//matches the varying variable in the vertex shader
varying vec2 pos;

void main()
{
	//pos contains x and y, so serves as both the first and second co-ordinates
	gl_FragColor = vec4(pos, 1.0, 1.0);
}