var gameArea = document.getElementById("gameArea");
var ctx = gameArea.getContext("2d");
//for position of mouse
var border = gameArea.getBoundingClientRect();
var pos = {x: 100, y:100};
var i = 0;

var run = setInterval(update, 10)

function update(){
  ctx.clearRect(0, 0, 640, 480);
  follow(player, pos, 15, 5);

  player.update();
  enemy.update();
  if (i > 100) {
    follow(enemy, player, 0, 3);

    //losing
    if (enemy.x < player.x + 30 && player.x < enemy.x + 30 &&
      enemy.y < player.y + 30 && player.y < enemy.y + 30)
      {
      window.alert("your score:" + i);
      i = 0;
      player.x = 100;
      player.y = 100;
      enemy.x = 100;
      enemy.y = 100;
      pos = {x: 100, y:100};

    }
  }
  i += 1;



}

function component(width, height, color,x,y,type){
  this.type=type;
  if(type=="image")
  {
    this.image=new Image;
    this.image.src=color;

  }
  this.width = width;
  this.height = height;
  this.x = 100;
  this.y = 100;
  this.update = function () {
    
    if (type == "image") {
        ctx.drawImage(this.image, 
            this.x, 
            this.y,
            this.width, this.height);
    } else {
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}
}
var player = new component(50, 50, "img/frank.png", 10, 120, "image");
var enemy = new component(50, 50, "img/unholy.png", 10, 120, "image");

function showCoords(evt){
  return{
    x: evt.clientX - border.left,
    y: evt.clientY - border.top
  }
}
function follow(object, target, dpos, spd) {
  if (object.x > target.x - dpos) {
    object.x -= spd;
  }else {
    object.x += spd;
  }
  if (object.y > target.y - dpos) {
    object.y -= spd;
  }else {
    object.y += spd;
  }

}
