"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

document.addEventListener('DOMContentLoaded', function () {
  var grid = document.querySelector('.grid');
  var doodler = document.createElement('div');
  var goLeft = document.getElementById('left');
  var goRight = document.getElementById('right');
  var goStraight = document.getElementById('straight');
  var startButton = document.getElementById('startButton');
  var doodlerLeftSpace = 50;
  var startPoint = 150;
  var doodlerBottomSpace = startPoint;
  var platformCount = 5;
  var isGameOver = false;
  var isGameOn = false;
  var platforms = [];
  var upTimerId;
  var downTimerId;
  var isJumping = true;
  var isGoingLeft = false;
  var isGoingRight = false;
  var leftTimerId = false;
  var rightTimerId = false;
  var score = 0;

  function createDoodler() {
    grid.appendChild(doodler);
    doodler.classList.add('doodler');
    doodlerLeftSpace = platforms[0].left;
    doodler.style.left = doodlerLeftSpace + 'px';
    doodler.style.bottom = doodlerBottomSpace + 'px';
  }

  var Platform = function Platform(newPlatformBottom, score) {
    _classCallCheck(this, Platform);

    var width = 80 - 0.5 * score;
    this.bottom = newPlatformBottom;
    this.left = Math.random() * 315;
    this.width = Math.floor(width);
    this.visual = document.createElement('div');
    var visual = this.visual;
    visual.classList.add('platform');
    visual.style.left = this.left + 'px';
    visual.style.bottom = this.bottom + 'px';
    visual.style.width = this.width + '.px';
    grid.appendChild(visual);
  };

  function createPlatforms() {
    for (var i = 0; i < platformCount; i++) {
      var platformGap = 600 / platformCount;
      var newPlatformBottom = 100 + i * platformGap;
      var newPlatform = new Platform(newPlatformBottom, score);
      platforms.push(newPlatform);
      console.log(platforms);
    }
  }

  function movePlatforms() {
    if (doodlerBottomSpace > 200) {
      platforms.forEach(function (platform) {
        platform.bottom -= 4;
        var visual = platform.visual;
        visual.style.bottom = platform.bottom + 'px';

        if (platform.bottom < 10) {
          var firstPlatform = platforms[0].visual;
          firstPlatform.classList.remove('platform');
          platforms.shift();
          score++;
          var newPlatform = new Platform(600, score);
          platforms.push(newPlatform);
        }
      });
    }
  }

  function jump() {
    clearInterval(downTimerId);
    isJumping = true;
    upTimerId = setInterval(function () {
      doodlerBottomSpace += 20;
      doodler.style.bottom = doodlerBottomSpace + 'px';

      if (doodlerBottomSpace > startPoint + 200) {
        fall();
      }
    }, 30);
  }

  function fall() {
    clearInterval(upTimerId);
    isJumping = false;
    downTimerId = setInterval(function () {
      doodlerBottomSpace -= 5;
      doodler.style.bottom = doodlerBottomSpace + 'px';

      if (doodlerBottomSpace <= 0) {
        gameOver();
      }

      platforms.forEach(function (platform) {
        if (doodlerBottomSpace >= platform.bottom && doodlerBottomSpace <= platform.bottom + 15 && doodlerLeftSpace + 60 >= platform.left && doodlerLeftSpace <= platform.left + platform.width && !isJumping) {
          console.log('landed');
          startPoint = doodlerBottomSpace;
          jump();
        }
      });
    }, 30);
  }

  function gameOver() {
    console.log('game over');
    isGameOver = true;
    isGameOn = false;

    while (grid.firstChild) {
      grid.removeChild(grid.firstChild);
    }

    grid.innerHTML = score;
    clearInterval(downTimerId);
    clearInterval(upTimerId);
    clearInterval(rightTimerId);
    clearInterval(leftTimerId);
    endGame();
  }

  function endGame() {
    var endGameBox = document.querySelector('.endGameBox'); // Ajout d'un bouton reload

    var reloadButton = document.createElement('button');
    reloadButton.innerHTML = 'Recommencer';
    endGameBox.appendChild(reloadButton);
    reloadButton.addEventListener('click', function () {
      window.location.reload(true);
    }); // Créer le boutton enregistrer

    var registerButton = document.createElement('button');
    registerButton.innerHTML = 'Enregistrer ma perf'; // Lier le lien vers php

    registerButton.addEventListener('click', function () {
      // Récupérer le pseudo
      var pseudo = document.getElementById('pseudo').value;
      document.location.href = '?pseudo=' + pseudo + '&score=' + score;
    });
    endGameBox.appendChild(registerButton);
    endGameBox.style.top = '200px';
  }

  function control(e) {
    if (e.key === 'ArrowLeft') {
      moveLeft();
    } else if (e.key === 'ArrowRight') {
      moveRight();
    } else if (e.key === 'ArrowUp') {
      moveStraight();
    }
  }

  function moveLeft() {
    if (isGoingRight) {
      clearInterval(rightTimerId);
      isGoingRight = false;
    }

    isGoingLeft = true;
    clearInterval(leftTimerId);
    leftTimerId = setInterval(function () {
      if (doodlerLeftSpace >= 0) {
        doodlerLeftSpace -= 5;
        doodler.style.left = doodlerLeftSpace + 'px';
      } else {
        moveRight();
      }

      doodlerLeftSpace -= 5;
      doodler.style.left = doodlerLeftSpace + 'px';
    }, 30);
  }

  function moveRight() {
    if (isGoingLeft) {
      clearInterval(leftTimerId);
      isGoingLeft = false;
    }

    isGoingRight = true;
    clearInterval(rightTimerId);
    rightTimerId = setInterval(function () {
      if (doodlerLeftSpace <= 340) {
        doodlerLeftSpace += 5;
        doodler.style.left = doodlerLeftSpace + 'px';
      } else {
        moveLeft();
      }

      doodlerLeftSpace += 5;
      doodler.style.left = doodlerLeftSpace + 'px';
    }, 30);
  }

  function moveStraight() {
    isGoingRight = false;
    isGoingLeft = false;
    clearInterval(rightTimerId);
    clearInterval(leftTimerId);
  }

  function start() {
    if (!isGameOver && !isGameOn) {
      isGameOn = true;
      grid.removeChild(startButton);
      createPlatforms();
      createDoodler();
      setInterval(movePlatforms, 30);
      jump();
      goLeft.addEventListener('click', moveLeft);
      goRight.addEventListener('click', moveRight);
      goStraight.addEventListener('click', moveStraight);
      document.addEventListener('keyup', control);
    }
  }

  startButton.addEventListener('click', start);
});