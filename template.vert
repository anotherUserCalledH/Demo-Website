attribute vec3 aPosition;
attribute vec2 aTexCoord;

varying vec2 pos;

void main()
{
	pos = aTexCoord;

	vec4 position = vec4(aPosition, 1.0);

	//The normalised vertex positions from aPosition are being remapped into the -1 to 1 range
	position.xy = position.xy * 2.0 - 1.0;

	gl_Position = position;
}