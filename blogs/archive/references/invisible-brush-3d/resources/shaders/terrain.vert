uniform mat4 transform;
uniform mat4 modelview;
uniform mat4 projection;
uniform mat3 normalMatrix;

attribute vec4 position;
attribute vec4 color;
attribute vec3 normal;

varying vec4 vertColor;
varying vec3 vertNormal;
varying vec4 vertPosition;

void main() {
    gl_Position = transform * position;
    vertColor = color;
    vertNormal = normalize(normalMatrix * normal);
    vertPosition = position;
}
