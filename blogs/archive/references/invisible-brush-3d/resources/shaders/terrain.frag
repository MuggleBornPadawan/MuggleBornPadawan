#ifdef GL_ES
precision mediump float;
precision mediump int;
#endif

uniform float u_time;
uniform vec3 fog_color;
uniform float fog_near;
uniform float fog_far;

varying vec4 vertColor;
varying vec3 vertNormal;
varying vec4 vertPosition;

void main() {
    // Distance-based depth fog (perspective depth)
    float depth = gl_FragCoord.z / gl_FragCoord.w;
    float fog_factor = smoothstep(fog_near, fog_far, depth);

    // Directional sunlight diffuse shading
    vec3 light_dir = normalize(vec3(0.5, 0.8, 0.4));
    float diff = max(dot(vertNormal, light_dir), 0.0);
    vec3 lit_color = vertColor.rgb * (0.35 + 0.65 * diff);

    // Blend lit surface color into atmospheric horizon fog
    vec3 final_color = mix(lit_color, fog_color, clamp(fog_factor, 0.0, 1.0));
    gl_FragColor = vec4(final_color, vertColor.a);
}
