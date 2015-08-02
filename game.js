var is_playing = false;
var main_sprite = new Object();
var map_img = new Array();
init();

function init()
{
  background_canvas = document.getElementById('background_canvas');
  background_ctx = background_canvas.getContext('2d');
  main_canvas = document.getElementById('main_canvas');
  main_ctx = main_canvas.getContext('2d');
 
  document.addEventListener("keydown", key_down, false);
  document.addEventListener("keyup", key_up, false);
 
  requestaframe = (function() {
                return window.requestAnimationFrame     ||
                  window.webkitRequestAnimationFrame    ||
                  window.mozRequestAnimationFrame       ||
                  window.oRequestAnimationFrame         ||
                  window.msRequestAnimationFrame        ||
                  function (callback) {
                    window.setTimeout(callback, 1000 / 60)
                  };
  })();
 
  player = new Player();
  load_media();
}
function load_media()
{
  // bg_sprite = new Image();
  // bg_sprite.src = 'images/bg_sprite.png';
  // main_sprite = new Image();
  // main_sprite.src = 'images/main_sprite.png';
  
      // maps
      map_img[1] = new Image();
      map_img[1].src = 'data/maps/testmap.png';


      // standing facing right = 5
      main_sprite[5] = new Array();
      main_sprite[5]['standing'] = new Array();
      main_sprite[5]['standing'][1] = new Image();
      main_sprite[5]['standing'][1].src = 'data/sprites/FacingR_1.png';
      main_sprite[5]['standing'][2] = new Image();
      main_sprite[5]['standing'][2].src = 'data/sprites/FacingR_2.png';
      main_sprite[5]['standing'][3] = new Image();
      main_sprite[5]['standing'][3].src = 'data/sprites/FacingR_3.png';


      // standing facing left = 1
      main_sprite[1] = new Object();
      main_sprite[1]['standing'] = new Array();
      main_sprite[1]['standing'][1] = new Image();
      main_sprite[1]['standing'][1].src = 'data/sprites/FacingL_1.png';
      main_sprite[1]['standing'][2] = new Image();
      main_sprite[1]['standing'][2].src = 'data/sprites/FacingL_2.png';
      main_sprite[1]['standing'][3] = new Image();
      main_sprite[1]['standing'][3].src = 'data/sprites/FacingL_3.png';


      // running facing right = 5
      main_sprite[5]['running'] = new Array();
      main_sprite[5]['running'][1] = new Image();
      main_sprite[5]['running'][1].src = 'data/sprites/RunCycle5_1.png';  
      main_sprite[5]['running'][2] = new Image();
      main_sprite[5]['running'][2].src = 'data/sprites/RunCycle5_2.png';  
      main_sprite[5]['running'][3] = new Image();
      main_sprite[5]['running'][3].src = 'data/sprites/RunCycle5_3.png';  
      main_sprite[5]['running'][4] = new Image();
      main_sprite[5]['running'][4].src = 'data/sprites/RunCycle5_4.png'; 
      main_sprite[5]['running'][5] = new Image();
      main_sprite[5]['running'][5].src = 'data/sprites/RunCycle5_5.png';  
      main_sprite[5]['running'][6] = new Image();
      main_sprite[5]['running'][6].src = 'data/sprites/RunCycle5_6.png';  
      main_sprite[5]['running'][7] = new Image();
      main_sprite[5]['running'][7].src = 'data/sprites/RunCycle5_7.png';  
      main_sprite[5]['running'][8] = new Image();
      main_sprite[5]['running'][8].src = 'data/sprites/RunCycle5_8.png';  


      // running facing left = 1
      main_sprite[1]['running'] = new Array();
      main_sprite[1]['running'][1] = new Image();
      main_sprite[1]['running'][1].src = 'data/sprites/RunCycle1_1.png';  
      main_sprite[1]['running'][2] = new Image();
      main_sprite[1]['running'][2].src = 'data/sprites/RunCycle1_2.png';  
      main_sprite[1]['running'][3] = new Image();
      main_sprite[1]['running'][3].src = 'data/sprites/RunCycle1_3.png';  
      main_sprite[1]['running'][4] = new Image();
      main_sprite[1]['running'][4].src = 'data/sprites/RunCycle1_4.png'; 
      main_sprite[1]['running'][5] = new Image();
      main_sprite[1]['running'][5].src = 'data/sprites/RunCycle1_5.png';  
      main_sprite[1]['running'][6] = new Image();
      main_sprite[1]['running'][6].src = 'data/sprites/RunCycle1_6.png';  
      main_sprite[1]['running'][7] = new Image();
      main_sprite[1]['running'][7].src = 'data/sprites/RunCycle1_7.png';  
      main_sprite[1]['running'][8] = new Image();
      main_sprite[1]['running'][8].src = 'data/sprites/RunCycle1_8.png';  

}

 
function Player()
{
  this.x = 2500;
  this.y = 2500;
  this.drawX = 640-50;
  this.drawY = 400-200;
  this.speed = 4;
  this.m_down = false;
  this.m_up = false;
  this.m_left = false;
  this.m_right = false;
  this.facing = 5;
  this.AniState = 1;
  this.Animation = 'running';

}
Player.prototype.draw = function()
{
  // var aniKey=0;
  // switch(this.Animation){
  //   case 'standing':
  //     switch(this.facing){
  //       case 'right':
  //         aniKey=5;
  //         break;

  //       case 'left':
  //         aniKey=1;
  //         break;
  //     }
  //     break;

  // }

  var limit = 0;
  switch(this.Animation){
    case 'standing':
      limit = 3;
      break;

    case 'running':
      limit = 8;
      break;

  }

  if (this.AniState > (limit*5)) {
    this.AniState = 1;
  }

  main_ctx.drawImage(main_sprite[this.facing][this.Animation][1+Math.floor((this.AniState-1)/5)], this.drawX, this.drawY);
  this.AniState++;
  // background_ctx.drawImage(map_img[1],0,0);
  // background_ctx.drawImage(map_img[1],2500,2500,1280,800,0,0,1280,800);
  document.getElementById('x').innerHTML = this.x;
  document.getElementById('y').innerHTML = this.y;
  document.getElementById('animation').innerHTML = this.Animation;
  document.getElementById('facing').innerHTML = this.facing;
  document.getElementById('aframe').innerHTML = 1+Math.floor((this.AniState-1)/5);
  //debug
  document.getElementById('mleft').innerHTML = this.m_left;
  document.getElementById('mright').innerHTML = this.m_right;
  document.getElementById('mup').innerHTML = this.m_up;
  document.getElementById('mdown').innerHTML = this.m_down;
};
Player.prototype.check_keys = function()
{
  /*if (this.is_downkey == true)
    this.drawY += this.speed;
  if (this.is_upkey == true)
    this.drawY -= this.speed;
  */

  if ((this.m_right == true) && (this.m_left == true)){
    this.m_right = false;
    this.m_left = false;
  }

  if ((this.m_up == true) && (this.m_down == true)){
    this.m_up = false;
    this.m_down = false;
  }


  this.Animation='standing';

  if (this.m_right == true){
    
    if (this.m_up == true){
      this.facing = 5;
      this.Animation = 'running';

    }
    
    if (this.m_down == true){
      this.facing = 5;
      this.Animation = 'running';
    }
    
    if (this.m_down ==false && this.m_up == false) {
      this.facing = 5;
      this.Animation='running';
    }
  }

  if (this.m_left == true){

    if (this.m_up == true){
      this.facing = 1;
      this.Animation = 'running';
    }
    
    if (this.m_down == true){
      this.facing = 1;
      this.Animation = 'running';
    }
    if (this.m_down ==false && this.m_up == false) {
      this.facing = 1;
      this.Animation='running';
    }
  }
  
  if (this.m_up == true && this.m_right == false && this.m_left == false){
    this.facing = 1;
    this.Animation='running';
  }

  if ((this.m_down == true) && (this.m_right == false) && (this.m_left == false)) {
    this.facing = 5;
    this.Animation='running';
  }


if (this.Animation == 'running') {
  switch (this.facing) {
    case 1:{
      this.x=(this.x-this.speed);
      break;
    }
    case 2:{
      this.x=this.x-0.75*this.speed;
      this.y=this.y-0.75*this.speed;
      break;
    }
    case 3:{
      this.y=this.y-this.speed;
      break;
    }
    case 4:{
      this.x=this.x+0.75*this.speed;
      this.y=this.y-0.75*this.speed;
      break;
    }
    case 5:{
      this.x=(this.x+this.speed);
      break;
    }
    case 6:{
      this.x=this.x+0.75*this.speed;
      this.y=this.y+0.75*this.speed;
      break;
    }
    case 7:{
      this.y=this.y+this.speed;
      break;
    }
    case 8:{
      this.x=this.x-0.75*this.speed;
      this.y=this.y+0.75*this.speed;
      break;
    }
  }
}
}

 
function key_down(e)
{
  var key_id = e.keyCode || e.which;
  if (key_id == 83) //s key
  {
    player.m_down = true;
    e.preventDefault();
  }
  if (key_id == 87) //w key
  {
    player.m_up = true;
    e.preventDefault();
  }
  if (key_id == 65) //a key
  {
    player.m_left = true;
    e.preventDefault();
  }
  if (key_id == 68) //d key
  {
    player.m_right = true;
    e.preventDefault();
  }
}
function key_up(e)
{
  var key_id = e.keyCode || e.which;
  if (key_id == 83) //s key
  {
    player.m_down = false;
    e.preventDefault();
  }
  if (key_id == 87) //w key
  {
    player.m_up = false;
    e.preventDefault();
  }
  if (key_id == 65) //a key
  {
    player.m_left = false;
    e.preventDefault();
  }
  if (key_id == 68) //d key
  {
    player.m_right = false;
    e.preventDefault();
  }
}


function drawstuff(){
  main_ctx.clearRect(0,0,1280,800);
  background_ctx.clearRect(0,0,1280,800);
  player.draw();  
  background_ctx.drawImage(map_img[1],player.x-640,player.y-400,1280,800,0,0,1280,800);



}


function start_loop()
{
  if (is_playing == true) {
    is_playing = false;
    document.getElementById('b_start').innerHTML = 'start';

  } else {
    is_playing = true;
    document.getElementById('b_start').innerHTML = 'pause';
    loop();
  }

  // background_ctx.drawImage(bg_sprite, 0, 0);
}
function stop_loop()
{
  is_playing = false;
}
 

function loop()
{

  player.check_keys();
  drawstuff();
 
  if (is_playing)
    requestaframe(loop);
}