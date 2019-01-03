var zbImg = new Image();
zbImg.src = './image/zuobian.jpg';

var bgImg = new Image();
bgImg.src = './image/beijing.jpg';

var smImg = new Image();
smImg.src = './image/shangmian.png';

var stImg = new Image();
stImg.src = './image/shenti.png';

var xmImg = new Image();
xmImg.src = './image/xiamian.png';

var ybImg = new Image();
ybImg.src = './image/youbian.png';

function Snake(){

	this.cav = document.getElementById("cav");
	this.canvas = this.cav.getContext('2d');
	this.step = 25;
	this.width = 500;
	this.height = 500;

	this.stepW = this.width/this.step;
	this.stepH = this.height/this.step;

	this.snakeArr = [];//snake body
	this.foodArr = [];//store food
	this.timer = null;
	var foodx = null;
	var foody = null;
    var count = 5; 

	this.init = function()
	{
		    this.draw();
		     this.move();
		     this.hit();
		
	}
	



	//1, draw the game elements
	this.draw = function(){
		// paint background
		this.canvas.drawImage(bgImg,0,0,this.width,this.height);
		// paint snake
    
		// draw it
		this.drawFood = function(){
				if(this.foodArr.length != 0){
						this.canvas.drawImage(stImg,this.foodArr[0].x*this.step,this.foodArr[0].y*this.step,this.step,this.step);
						return;
				}

		    	foodx = Math.floor(Math.random()*this.stepW);
		    	foody = Math.floor(Math.random()*this.stepH);
		    	

		    for(var i = 0; i<this.snakeArr.length;i++)
		    	{
		    		if (this.snakeArr[i].x == foodx && this.snakeArr[i].y == foody) {
		    				this.drawFood();
		    				break;
		    		}
		    	}	


		    	// not cover
		    	this.foodArr[0]={
		    		x:foodx,
		    		y:foody,
		    		Image:stImg
		    	}
		    	this.canvas.drawImage(stImg,this.foodArr[0].x*this.step,this.foodArr[0].y*this.step,this.step,this.step);

		    }





		this.drawSnake = function(){
			
			// initial snake body
			if(this.snakeArr.length == 0){
				for (var i = 0; i < count; i++) {
					this.snakeArr[i]={
						x: this.stepW/2+i-2,
						y: this.stepH/2,
						img:stImg,
						d:'l'
					}		
				}
				this.snakeArr[0].img = zbImg;//change to snake head pic 

			}
				for (var i = 0; i< count; i++){
					this.canvas.drawImage(this.snakeArr[i].img,
						this.snakeArr[i].x*this.step,
						this.snakeArr[i].y*this.step,
						this.step,
						this.step);			
			}
	
		}
			this.drawFood();
		    this.drawSnake();





   
	}
	//2, make snake move
	this.move = function(){
		 var This = this;
         document.onkeydown =function(event){
         	var event = event || window.event;
         	var code = event.keyCode;
         	
 

        
         	switch(code){
         		case 37:
         			This.snakeArr[0].d = 'l';
         			This.snakeArr[0].img = zbImg;
         			break;
         		case 38:
         			This.snakeArr[0].d = 't';
         			This.snakeArr[0].img = smImg;
         			break;
         		case 39:
         			This.snakeArr[0].d = 'r';
         			This.snakeArr[0].img = ybImg;
         			break;
         		case 40:
         			This.snakeArr[0].d = 'b';
         			This.snakeArr[0].img = xmImg;
         			break;
         		
         	}
         	
         }
         this.timer = setInterval(function(){
         	for(var i = This.snakeArr.length-1; i>0; i--){
         		This.snakeArr[i].x = This.snakeArr[i-1].x;
         		This.snakeArr[i].y = This.snakeArr[i-1].y;
         	}
         	// snake head
         	switch(This.snakeArr[0].d){
         		case 'l':
         		This.snakeArr[0].x--;
         		break;
         		case 'r':
         		This.snakeArr[0].x++;
         		break;
         		case 't':
         		This.snakeArr[0].y--;
         		break;
         		case 'b':
         		This.snakeArr[0].y++;
         		break;

         	}
         	This.hit();
         	This.draw();
	
	

         },200);

	}
	//3, make snake to die
	this.hit = function(){

	  	if(this.snakeArr[0].x == -1 || this.snakeArr[0].y == -1 || this.snakeArr[0].x == 20 || this.snakeArr[0].y == 20){
	  		alert("Game Over");
	  		clearInterval(this.timer);	
	  	}

	  	/*
	  	for(var i = 0; i< this.snakeArr.length-1; i++){
	  		if(this.snakeArr[0].x == this.snakeArr[i].x && this.snakeArr[0].y == this.snakeArr[i].y){
	  			
	  		    alert("Game Over");
	  		   
	  		}
	  	}*/

     if(this.snakeArr[0].x == foodx && this.snakeArr[0].y == foody)
     {
	 			
	  						count++;
	  			
	 			
	 		}
	 	
	}

	

}