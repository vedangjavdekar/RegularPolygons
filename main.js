var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var sides = 3;
var inputs=[];

function getPoints(inputs)
{
	angle =(180 - (360/sides));
	console.log(angle);
	for(var i=1;i<sides-1;i++)
	{
		// console.log('curr_x: ' + inputs[i].x);
		// console.log('curr_y: ' + inputs[i].y);
		// console.log('prev_x: ' + inputs[i-1].x);
		// console.log('prev_y: ' + inputs[i-1].y);
		x = inputs[i].x + ((inputs[i-1].x - inputs[i].x)*Math.cos(angle*Math.PI/180) - (inputs[i-1].y - inputs[i].y)*Math.sin(angle*Math.PI/180));
		y = inputs[i].y + ((inputs[i-1].x - inputs[i].x)*Math.sin(angle*Math.PI/180) + (inputs[i-1].y - inputs[i].y)*Math.cos(angle*Math.PI/180));
		inputs.push({x,y});
		// console.log(inputs);
	}
}

function getPoints2(inputs)
{
	angle =(360/sides);
	console.log(angle);
	for(var i=1;i<sides-1;i++)
	{
		// console.log('curr_x: ' + inputs[i].x);
		// console.log('curr_y: ' + inputs[i].y);
		// console.log('prev_x: ' + inputs[i-1].x);
		// console.log('prev_y: ' + inputs[i-1].y);
		x = inputs[i].x + ((inputs[i].x - inputs[i-1].x)*Math.cos(angle*Math.PI/180) - (inputs[i].y - inputs[i-1].y)*Math.sin(angle*Math.PI/180));
		y = inputs[i].y + ((inputs[i].x - inputs[i-1].x)*Math.sin(angle*Math.PI/180) + (inputs[i].y - inputs[i-1].y)*Math.cos(angle*Math.PI/180));
		inputs.push({x,y});
		// console.log(inputs);
	}
}

$(document).ready(function(){

	$('input[type="number"]').on('input',function(){
		
		inputs = [];
		$('input[type="number"]').each(function(){
			if($(this).val()!=0)
			{	
				inputs.push($(this).val());
			}
			else
			{
				inputs.push("0");	
			}
		});
		sides = parseInt(inputs[0]);
		ctx.clearRect(0,0,canvas.width,canvas.height);
		ctx.beginPath();
		ctx.strokeStyle = "#000000";
		ctx.lineWidth = 1;
		var points =[{x:parseInt(inputs[1]),y:parseInt(inputs[2])},
					 {x:parseInt(inputs[3]),y:parseInt(inputs[4])}];
		var points2 =[{x:parseInt(inputs[1]),y:parseInt(inputs[2])},
					 {x:parseInt(inputs[3]),y:parseInt(inputs[4])}];
		getPoints(points);
		getPoints2(points2);
		ctx.moveTo (points[0].x,points[0].y);          
		ctx.lineTo (points[1].x,points[1].y);
		ctx.stroke();
		ctx.beginPath();
		ctx.strokeStyle = '#ff0000'; 
		for (var i = 1; i/points.length != 0; i=(i+1)%points.length) {
			ctx.moveTo(points[i].x,points[i].y);
			ctx.lineTo(points[(i+1)%points.length].x,points[(i+1)%points.length].y)
		}
		ctx.stroke();
		ctx.beginPath();
		ctx.strokeStyle = '#00ff00'; 
		for (var i = 1; i/points2.length != 0; i=(i+1)%points2.length) {
			ctx.moveTo(points2[i].x,points2[i].y);
			ctx.lineTo(points2[(i+1)%points2.length].x,points2[(i+1)%points2.length].y)
		}
		ctx.stroke();
	});

});