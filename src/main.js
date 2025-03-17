import Phaser from 'phaser'
import LoaderScene from '../scenes/loadingScene'
import MainMenuScene from '../scenes/MainMenuScene';
import PlayScene from '../scenes/PlayScene';
import GameOverScene from '../scenes/GameOverScene';
const config ={
  type: Phaser.AUTO,
  width: 800,
  height: 600,
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

