var is_playing = false;
var main_sprite = new Object();
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
  
      // standing facing right
      main_sprite['right'] = new Object();
      main_sprite['right']['standing'] = new Array();
      main_sprite['right']['standing'][1] = new Image();
      main_sprite['right']['standing'][1].src = 'images/FacingR_1.png';
      main_sprite['right']['standing'][2] = new Image();
      main_sprite['right']['standing'][2].src = 'images/FacingR_2.png';
      main_sprite['right']['standing'][3] = new Image();
      main_sprite['right']['standing'][3].src = 'images/FacingR_3.png';


      // standing facing left
      main_sprite['left'] = new Object();
      main_sprite['left']['standing'] = new Array();
      main_sprite['left']['standing'][1] = new Image();
      main_sprite['left']['standing'][1].src = 'images/FacingL_1.png';
      main_sprite['left']['standing'][2] = new Image();
      main_sprite['left']['standing'][2].src = 'images/FacingL_2.png';
      main_sprite['left']['standing'][3] = new Image();
      main_sprite['left']['standing'][3].src = 'images/FacingL_3.png';


      // running facing right
      main_sprite['right']['running'] = new Array();
      main_sprite['right']['running'][1] = new Image();
      main_sprite['right']['running'][1].src = 'images/RunCycle5_1.png';  
      main_sprite['right']['running'][2] = new Image();
      main_sprite['right']['running'][2].src = 'images/RunCycle5_2.png';  
      main_sprite['right']['running'][3] = new Image();
      main_sprite['right']['running'][3].src = 'images/RunCycle5_3.png';  
      main_sprite['right']['running'][4] = new Image();
      main_sprite['right']['running'][4].src = 'images/RunCycle5_4.png'; 
      main_sprite['right']['running'][5] = new Image();
      main_sprite['right']['running'][5].src = 'images/RunCycle5_5.png';  
      main_sprite['right']['running'][6] = new Image();
      main_sprite['right']['running'][6].src = 'images/RunCycle5_6.png';  
      main_sprite['right']['running'][7] = new Image();
      main_sprite['right']['running'][7].src = 'images/RunCycle5_7.png';  
      main_sprite['right']['running'][8] = new Image();
      main_sprite['right']['running'][8].src = 'images/RunCycle5_8.png';  


      // running facing left
      main_sprite['left']['running'] = new Array();
      main_sprite['left']['running'][1] = new Image();
      main_sprite['left']['running'][1].src = 'images/RunCycle1_1.png';  
      main_sprite['left']['running'][2] = new Image();
      main_sprite['left']['running'][2].src = 'images/RunCycle1_2.png';  
      main_sprite['left']['running'][3] = new Image();
      main_sprite['left']['running'][3].src = 'images/RunCycle1_3.png';  
      main_sprite['left']['running'][4] = new Image();
      main_sprite['left']['running'][4].src = 'images/RunCycle1_4.png'; 
      main_sprite['left']['running'][5] = new Image();
      main_sprite['left']['running'][5].src = 'images/RunCycle1_5.png';  
      main_sprite['left']['running'][6] = new Image();
      main_sprite['left']['running'][6].src = 'images/RunCycle1_6.png';  
      main_sprite['left']['running'][7] = new Image();
      main_sprite['left']['running'][7].src = 'images/RunCycle1_7.png';  
      main_sprite['left']['running'][8] = new Image();
      main_sprite['left']['running'][8].src = 'images/RunCycle1_8.png';  

}
function mouse(e)
{
  var x = e.pageX - document.getElementById('game_object').offsetLeft;
  var y = e.pageY - document.getElementById('game_object').offsetTop;

}
 
function Player()
{
  this.X = 600;
  this.Y = 500;
  this.speed = 4;
  this.m_down = false;
  this.m_up = false;
  this.m_left = false;
  this.m_right = false;
  this.facing = 'right';
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

  main_ctx.drawImage(main_sprite[this.facing][this.Animation][1+Math.floor((this.AniState-1)/5)], this.X, this.Y);
  this.AniState++;

  document.getElementById('x').innerHTML = this.X;
  document.getElementById('y').innerHTML = this.Y;
  document.getElementById('animation').innerHTML = this.Animation;
  document.getElementById('facing').innerHTML = this.facing;
  document.getElementById('aframe').innerHTML = 1+Math.floor((this.AniState-1)/5);
};
Player.prototype.check_keys = function()
{
  /*if (this.is_downkey == true)
    this.drawY += this.speed;
  if (this.is_upkey == true)
    this.drawY -= this.speed;
  */

this.Animation='standing';

  if (this.m_right == true){
    this.X += this.speed;
    this.facing = 'right';
    this.Animation='running';
  }

  if (this.m_left == true){
    this.X -= this.speed;
    this.facing = 'left';
    this.Animation='running';
  }
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
 
 
function key_down(e)
{
  var key_id = e.keyCode || e.which;
  // if (key_id == 40) //down key
  // {
  //   player.m_down = true;
  //   e.preventDefault();
  // }
  // if (key_id == 38) //up key
  // {
  //   player.m_up = true;
  //   e.preventDefault();
  // }
  if (key_id == 37) //left key
  {
    player.m_left = true;
    e.preventDefault();
  }
  if (key_id == 39) //right key
  {
    player.m_right = true;
    e.preventDefault();
  }
}
function key_up(e)
{
  var key_id = e.keyCode || e.which;
  // if (key_id == 40) //down key
  // {
  //   player.m_down = false;
  //   e.preventDefault();
  // }
  // if (key_id == 38) //up key
  // {
  //   player.m_up = false;
  //   e.preventDefault();
  // }
  if (key_id == 37) //left key
  {
    player.m_left = false;
    e.preventDefault();
  }
  if (key_id == 39) //right key
  {
    player.m_right = false;
    e.preventDefault();
  }
}


function loop()
{
  main_ctx.clearRect(0,0,800,600);

  player.check_keys();
  player.draw();
 
  if (is_playing)
    requestaframe(loop);
}