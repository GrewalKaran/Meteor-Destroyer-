import Phaser from 'phaser'
import LoaderScene from '../scenes/loadingScene'
import MainMenuScene from '../scenes/MainMenuScene';
import PlayScene from '../scenes/PlayScene';
import GameOverScene from '../scenes/GameOverScene';

window.addEventListener('resize', () => {
  game.scale.resize(window.innerWidth, window.innerHeight);
});

const config ={
  type: Phaser.AUTO,
  width: window.innerWidth,         // 👈 Set to window width
  height: window.innerHeight,
  physics:{
    default: 'arcade',
    arcade: {
      gravity: {
      y: 0
    },debug: true
    }
  },backgroundColor: '#6495ed',
  scene:[
    LoaderScene,
    MainMenuScene,
    PlayScene,
    GameOverScene
  ]
}

  const game = new Phaser.Game(config);

