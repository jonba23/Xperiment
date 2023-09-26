


var vertexShaderText=
[
'precision mediump float;',
'',

'attribute vec3 vertPosition;',
'attribute vec2 vertTextCoord;',
'varying vec2 fragTextCoord;',
'uniform mat4 mWorld;',
'uniform mat4 mProj;',
'uniform mat4 mView;',
'',
'void main()',
'{',
'fragTextCoord = vertTextCoord;',
'gl_Position = mProj* mView* mWorld* vec4(vertPosition, 1.0);',
'}'
].join('\n');

var fragmentShaderText =
[
'precision mediump float;',
'',
'varying vec2 fragTextCoord;',
'uniform sampler2D sampler;',
'',
'void main()',
'{',
'gl_FragColor= texture2D(sampler,fragTextCoord);',
'}'
].join('\n');




var rotateCube = function (){
console.log('This is working');
const parent=document.getElementById('cube--container');
const parentWidth=parent.clientWidth;
const parentHeight=parent.clientHeight;
var canvas= document.getElementById('3dcube');
canvas.width=parentWidth;
canvas.height=parentHeight;

var gl= canvas.getContext('webgl',{preserveDrawingBuffer:true,premultipliedAlpha: true});
if(!gl){
    gl=canvas.getContext('experimental-webgl',{preserveDrawingBuffer:true,premultipliedAlpha: true});
}

if(!gl){
    alert('your browser does not support webGL')
}




gl.clearColor(0,0,0,0);
gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
gl.enable(gl.DEPTH_TEST);
gl.frontFace(gl.CCW);

var vertexShader=gl.createShader(gl.VERTEX_SHADER);
var fragmentShader= gl.createShader(gl.FRAGMENT_SHADER);
// set shader sources
gl.shaderSource(vertexShader, vertexShaderText);
gl.shaderSource(fragmentShader, fragmentShaderText);
//compile shaders and error checking for both shaders
gl.compileShader(vertexShader);
if(!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)){
    console.error('Error compiling vertex shader', gl.getShaderInfoLog(vertexShader));
    return;
}
gl.compileShader(fragmentShader);
if(!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)){
    console.error('Error compiling fragment shader', gl.getShaderInfoLog(fragmentShader));
    return;
}
//create program, linking and error checking
var program=gl.createProgram();
gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);
gl.linkProgram(program);
if(!gl.getProgramParameter(program,gl.LINK_STATUS)){
    console.error('Error linking program', gl.getProgramInfoLog(program));
    return;
}

gl.validateProgram(program);
if(!gl.getProgramParameter(program,gl.VALIDATE_STATUS)){
    console.error('Error validating program', gl.getProgramInfoLog(program));
    return;

}
//creating buffer
var cubeVertices=
[//XYZ                       UV
 // X, Y, Z           
		// Top
		-1.0, 1.0, -1.0,   0.0, 0.0,
		-1.0, 1.0, 1.0,    0.0, 1.0,
		1.0, 1.0, 1.0,     1.0, 1.0,
		1.0, 1.0, -1.0,    1.0, 0.0,

		// Left
		-1.0, 1.0, 1.0,    0.0, 0.0,
		-1.0, -1.0, 1.0,   1.0, 0.0,
		-1.0, -1.0, -1.0,  1.0, 1.0,
		-1.0, 1.0, -1.0,   0.0, 1.0,

		// Right
		1.0, 1.0, 1.0,    1.0, 1.0,
		1.0, -1.0, 1.0,   0.0, 1.0,
		1.0, -1.0, -1.0,  0.0, 0.0,
		1.0, 1.0, -1.0,   1.0, 0.0,

		// Front
		1.0, 1.0, 1.0,    1.0, 1.0,
		1.0, -1.0, 1.0,    1.0, 0.0,
		-1.0, -1.0, 1.0,    0.0, 0.0,
		-1.0, 1.0, 1.0,    0.0, 1.0,

		// Back
		1.0, 1.0, -1.0,    0.0,0.0,
		1.0, -1.0, -1.0,    0.0, 1.0,
		-1.0, -1.0, -1.0,    1.0, 1.0,
		-1.0, 1.0, -1.0,    1.0, 0.0,

		// Bottom
		-1.0, -1.0, -1.0,   1.0, 1.0,
		-1.0, -1.0, 1.0,    1.0, 0.0,
		1.0, -1.0, 1.0,     0.0, 0.0,
		1.0, -1.0, -1.0,    0.0, 1.0,
	     
];
var cubeIndices =
	[
		// Top
		0, 1, 2,
		0, 2, 3,

		// Left
		5, 4, 6,
		6, 4, 7,

		// Right
		8, 9, 10,
		8, 10, 11,

		// Front
		13, 12, 14,
		15, 14, 12,

		// Back
		16, 17, 18,
		16, 18, 19,

		// Bottom
		21, 20, 22,
		22, 20, 23
	];

var cubeVertexBufferObject= gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexBufferObject);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(cubeVertices), gl.STATIC_DRAW);

var cubeIndexBufferObject=gl.createBuffer();
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cubeIndexBufferObject);
gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new  Uint16Array(cubeIndices), gl.STATIC_DRAW);

var positionAttribLocation=gl.getAttribLocation(program, 'vertPosition');
var vertTextAttribLocation=gl.getAttribLocation(program,'vertTextCoord');
gl.vertexAttribPointer(
positionAttribLocation, //attribute location
3, //number of elements per attribute
gl.FLOAT, //type of elements
gl.FALSE, //checks if data is normalised
5 * Float32Array.BYTES_PER_ELEMENT,//size of an individual vertex
0//offset of a single vertex to this attribute

);
gl.vertexAttribPointer(
vertTextAttribLocation,
2,
gl.FLOAT,
gl.FALSE,
5* Float32Array.BYTES_PER_ELEMENT,
3* Float32Array.BYTES_PER_ELEMENT

);
 gl.enableVertexAttribArray(positionAttribLocation);
gl.enableVertexAttribArray(vertTextAttribLocation);


var boxTexture = gl.createTexture();
gl.bindTexture(gl.TEXTURE_2D, boxTexture); 
gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER, gl.LINEAR);
gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER, gl.LINEAR);
gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA, gl.UNSIGNED_BYTE, document.getElementById('Logo'));
gl.bindTexture(gl.TEXTURE_2D, null);


gl.useProgram(program);
var matWorldUniformLocation= gl.getUniformLocation(program, 'mWorld');
var matViewUniformLocation= gl.getUniformLocation(program, 'mView');
var matProjUniformLocation= gl.getUniformLocation(program, 'mProj');

var projMatrix =new Float32Array(16);
var viewMatrix =new Float32Array(16);
var worldMatrix =new Float32Array(16);
glMatrix.mat4.identity(worldMatrix);
glMatrix.mat4.lookAt(viewMatrix,[0,0,-6.6],[0,0,0],[0,1,0]);
glMatrix.mat4.perspective(projMatrix, glMatrix.glMatrix.toRadian(45),canvas.width/canvas.clientHeight,0.1,1000.0);


gl.uniformMatrix4fv(matWorldUniformLocation,gl.FALSE, worldMatrix);
gl.uniformMatrix4fv(matViewUniformLocation,gl.FALSE, viewMatrix);
gl.uniformMatrix4fv(matProjUniformLocation,gl.FALSE, projMatrix);


var xRotationMatrix= new Float32Array(16);
var yRotationMatrix= new Float32Array(16);

 //main render loop
 var identityMatrix= new Float32Array(16);
 glMatrix.mat4.identity(identityMatrix);
 var angle=0;
 
 var loop= function(){
	
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    angle = performance.now()/1000/6 *2*Math.PI;
   glMatrix.mat4.rotate(yRotationMatrix, identityMatrix, angle ,[0,1,0]);
   glMatrix.mat4.rotate(xRotationMatrix,identityMatrix,angle/4,[1,0,0]);
   glMatrix.mat4.mul(worldMatrix,xRotationMatrix,yRotationMatrix);
	gl.uniformMatrix4fv(matWorldUniformLocation, gl.FALSE, worldMatrix);
   
	
	

    gl.bindTexture(gl.TEXTURE_2D, boxTexture);
    gl.activeTexture(gl.TEXTURE0);
    gl.drawElements(gl.TRIANGLES,cubeIndices.length, gl.UNSIGNED_SHORT,0);
    requestAnimationFrame(loop);
 }
 
requestAnimationFrame(loop);
};