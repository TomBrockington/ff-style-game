const mainContainer = document.getElementById('container');
const levelContainer = document.getElementById('level-container');
const playerContainer = document.getElementById('player-info-container');
const enemyContainer = document.getElementById('enemy-container');
const actionsContainer = document.getElementById('actions-container');

const playernameContainer = document.getElementById('player-name-container');
const playerName = document.getElementById('player-name');
const playerStatsContainer = document.getElementById('player-stats-container');
const playerhealthBar = document.getElementById('player-health-bar');
const playerkillBar = document.getElementById('player-kill-bar');
const playerImage = document.getElementById('player-image-container');

const enemyHealthContainer = document.getElementById('enemy-health-container');
const enemyImageContainer = document.getElementById('enemy-image-container');

const fightbuttonsContainer = document.getElementById(
  'fight-buttons-container'
);

const easyLevelRandom = 10;
const mediumLevelRandom = 5;
const hardLevelRandom = 3;

// GENERATE ANY RANDOM NUMBERS NEEDED
const randomNumberGenerator = (number) => {
  const randomNumber = Math.floor(Math.random() * number) + 1;
  return randomNumber;
};

const randomIndexGenerator = (number) => {
  const randomNumber = Math.floor(Math.random() * number);
  return randomNumber;
};

let state = {
    openItemBag: false,
    isCurrentTurn: false,
}

// PLAYER
class Player {
  constructor(name) {
    this.name = name;
    this.health = 100;
    this.kills = 0;
    this.deaths = 0;
    this.fights = 0;
    this.level = 1;
    this.image = '';
    this.items = [];
    this.weapons = [];
  }
}

// ENEMIES
class EnemyCreature {
  constructor({ name, health, strength, image }) {
    this.name = name;
    this.health = health;
    this.strength = strength;
    this.image = image;
  }
}

const enemiesList = [
  {
    name: 'Dragon',
    health: 25,
    strength: 5,
    image:
      'https://img.freepik.com/free-vector/hand-drawn-dragon_53876-88179.jpg?w=2000',
  },
  {
    name: 'Evil Wizard',
    health: 50,
    strength: 3,
    image: 'https://images.stockfreeimages.com/857/sfixl/8579385.jpg',
  },
];


// ITEMS
class Item {
  constructor({ name }) {
    this.name = name;
  }
}

const itemsAvailable = [
  {
    name: 'Knife',
  },
  {
    name: 'Sword',
  },
  {
    name: 'Cheese',
  },
  {
    name: 'Phoenix Down',
  },
];
const newItem = new Item(
  itemsAvailable[randomIndexGenerator(itemsAvailable.length)]
);
console.log('newItem: ', newItem);

// LEVELS
const levelLocations = [
  {
    name: 'CrossRoads',
    image:
      'https://www.blogdot.tv/wp-content/uploads/2022/05/little-witch-in-the-woods-game-preview-available-today.jpg',
  },
];

// WEAPONS
class Weapon {
  constructor({ name, strength, image }) {
    this.name = name;
    this.strength = strength;
    this.image = image;
  }
}
const weaponsAvailable = [
  {
    name: 'Mega Sword',
    strength: +5,
    image:
      'https://media.istockphoto.com/photos/sword-disposed-by-diagonal-picture-id630052480?k=20&m=630052480&s=612x612&w=0&h=FPu6qhzFivQuHltu4zcH0DA2M7LRBr3rsoUodk8laJ0=',
  },
];
const newWeapon = new Weapon(
  weaponsAvailable[randomIndexGenerator(weaponsAvailable.length)]
);
console.log('newWeapon', newWeapon);


const newCharacter = new Player(this.name = 'Tom');

function startGame() {
  console.log('Game started');
  console.log('newCharacter: ', newCharacter);
}

if (newCharacter.health <= 0) {
    alert('Youre dead!')
}

function startNextTurn() {
    if (state.isCurrentTurn === true) {
        return
    }
    state.isCurrentTurn = true;

    const newEnemy = new EnemyCreature(
        enemiesList[randomIndexGenerator(enemiesList.length)]
      );
      console.log('newEnemy: ', newEnemy);
}

function run() {
  startGame();
}

run()
