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
const nameInputContainer = document.getElementById('player-setname-container');

const enemyHealthContainer = document.getElementById('enemy-health-container');
const enemyImageContainer = document.getElementById('enemy-image-container');
const enemyHealthBar = document.createElement('h4');
const enemyImage = document.createElement('img');

const itemBagContainer = document.createElement('div');
const itemHeadline = document.createElement('h3');

const magicBagContainer = document.createElement('div');
const magicHeadline = document.createElement('h3');

const fightButtons = document.createElement('div');
const buttonA = document.createElement('button');
const buttonB = document.createElement('button');
const buttonC = document.createElement('button');
const buttonD = document.createElement('button');

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
  level: 1,
  isItemBagOpen: false,
  isMagicBagOpen: false,
  isCurrentTurn: false,
  isInBattle: false,
};

let enemyState = {};

// PLAYER
class Player {
  constructor(name) {
    this.name = name;
    this.health = 100;
    this.kills = 0;
    this.deaths = 0;
    this.fights = 0;
    this.level = 1;
    this.image =
      'https://migrainecanada.org/wp-content/uploads/2019/07/occipital_nerves.jpg';
    this.items = [
      {
        name: 'Potion',
        desc: 'Health plus 10',
        type: 'heal',
        use: 10,
        quantity: 10,
      },
      {
        name: 'Cheese',
        desc: 'Delicious treat',
        type: 'food',
        use: 10,
        quantity: 10,
      },
    ];
    this.weapons = [
      {
        name: 'Mega Sword',
        strength: +5,
        image: `🗡️`,
        quantity: 10,
      },
      {
        name: 'Bow and Arrow',
        strength: +8,
        image: `🏹`,
        quantity: 10,
      },
    ];
    this.magic = [
      {
        name: 'Fireball',
        damage: 10,
        image: `🔥`,
        type: 'fire',
        quantity: 10,
      },
      {
        name: 'Blizzard',
        damage: 8,
        image: `❄️`,
        type: 'ice',
        quantity: 10,
      },
      {
        name: 'Thunder',
        damage: 13,
        image: `⚡`,
        type: 'lightning',
        quantity: 10,
      },
    ];
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
// SPELLS

class Spell {
  constructor({ name, damage, image, type }) {
    this.name = name;
    this.damage = damage;
    this.image = image;
    this.type = type;
  }
}
const spellsAvailable = [
  {
    name: 'Fireball',
    damage: 10,
    image: `🔥`,
    type: 'fire',
  },
  {
    name: 'Blizzard',
    damage: 8,
    image: `❄️`,
    type: 'ice',
  },
  {
    name: 'Thunder',
    damage: 13,
    image: `⚡`,
    type: 'lightning',
  },
];

// ITEMS
class Item {
  constructor({ name, desc, type, use }) {
    this.name = name;
    this.desc = desc;
    this.type = type;
    this.use = use;
  }
}
const itemsAvailable = [
  {
    name: 'Bone',
    desc: 'It was free',
    type: 'junk',
    use: 10,
  },
  {
    name: 'Potion',
    desc: 'Health plus 10',
    type: 'heal',
    use: 10,
  },
  {
    name: 'Cheese',
    desc: 'Delicious treat',
    type: 'food',
    use: 10,
  },
  {
    name: 'Phoenix Down',
    desc: 'Restores health from 0 to 20 in battle',
    type: 'heal',
    use: 10,
  },
];

// LEVELS
const levelLocations = [
  {
    name: 'Crossroads',
    emoji: `⚔️`,
    image:
      'https://www.blogdot.tv/wp-content/uploads/2022/05/little-witch-in-the-woods-game-preview-available-today.jpg',
  },
  {
    name: 'Spooky Castle',
    emoji: `🏰`,
    image:
      'https://www.scottishtours.co.uk/wwwroot/images/blog/41-Eilean-Donan-Castle.jpg',
  },
  {
    name: 'Sandy Desert',
    emoji: `🏜️`,
    image:
      'https://t3.ftcdn.net/jpg/01/44/97/42/360_F_144974295_zwgoD2Z4wl22POM50B5W2045gDVEEDZ4.jpg',
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
    image: `🗡️`,
  },
  {
    name: 'Bow and Arrow',
    strength: +8,
    image: `🏹`,
  },
];

function createNameContainer() {
  const enterNameTitle = document.createElement('h2');
  enterNameTitle.innerText = `Enter Your Hero's Name`;
  nameInputContainer.appendChild(enterNameTitle);

  const nameInput = document.createElement('input');
  nameInput.setAttribute('type', 'text');
  nameInput.setAttribute('id', 'my-input');
  nameInput.setAttribute('class', 'submit');
  nameInputContainer.appendChild(nameInput);

  const submitEnteredName = document.createElement('button');
  submitEnteredName.innerText = 'Submit';
  submitEnteredName.setAttribute('type', 'submit');
  submitEnteredName.setAttribute('class', 'submit-name-btn');
  submitEnteredName.setAttribute('class', 'submit');
  nameInputContainer.appendChild(submitEnteredName);
}

function setAttackStrength() {
  console.log('newCharacter', newCharacter);
  console.log('enemy', enemyState);
}
// Stat of Game
const newCharacter = new Player((this.name = 'Tom'));

function setPlayerName() {
  if (newCharacter.name === '') {
    console.log('blank name');

    createNameContainer();
  } else {
    nameInputContainer.style.display = 'none';
  }
}

function setPlayerData() {
  setPlayerImage(newCharacter);
  setPlayerStats(newCharacter);
  setStartingItems(newCharacter);
  setStartingWeapons(newCharacter);
}

function setPlayerImage(newCharacter) {
  const playerImg = document.createElement('img');
  playerImg.setAttribute('src', newCharacter.image);
  playerImg.setAttribute('class', 'player-image');
  playerImage.appendChild(playerImg);
}

function setPlayerStats(newCharacter) {
  playerName.innerText = `Name: ${newCharacter.name}`;
  playerhealthBar.innerText = `Health: ${newCharacter.health}`;
  playerkillBar.innerText = `Kills: ${newCharacter.kills}`;
}

function setStartingItems(newCharacter) {
  const newItem = new Item(
    itemsAvailable[randomIndexGenerator(itemsAvailable.length)]
  );
  newItem.quantity = 1;
  newCharacter.items.push(newItem);
}

function setStartingWeapons(newCharacter) {
  const newWeapon = new Weapon(
    weaponsAvailable[randomIndexGenerator(weaponsAvailable.length)]
  );

  newCharacter.weapons.push(newWeapon);
}

function startNextTurn() {
  if (state.isCurrentTurn === true) {
    return;
  }
  state.isCurrentTurn = true;
  console.log('next turn');

  let newEnemy = spawnNewEnemy();

  if (!newEnemy) {
    state.isCurrentTurn = false;
    return console.log('no enemies');
  }

  createEnemyElements(newEnemy);
}

function createEnemyElements(newEnemy) {
  enemyImage.setAttribute('src', newEnemy.image);
  enemyImage.setAttribute('alt', newEnemy.name);
  enemyImage.setAttribute('class', 'enemy-image');
  enemyContainer.appendChild(enemyImage);

  enemyHealthBar.setAttribute('id', 'enemy-health-bar');
  enemyHealthBar.setAttribute('class', 'enemy-health-bar');
  enemyHealthBar.innerText = `Enemy Health: ${newEnemy.health}`;
  enemyHealthContainer.appendChild(enemyHealthBar);
}
// produces an instance of the enemy rerturns new enemy
function spawnNewEnemy() {
  if (randomNumberGenerator(10) > 5) {
    state.isInBattle = true;
    spawnCombatButtons();
    const newEnemy = new EnemyCreature(
      enemiesList[randomIndexGenerator(enemiesList.length)]
    );

    enemyState = newEnemy;
    setAttackStrength();
    return newEnemy;
  }
}

function spawnCombatButtons() {
  fightButtons.id = 'fight-buttons';
  fightbuttonsContainer.appendChild(fightButtons);

  buttonA.setAttribute('class', 'gameBtn');
  buttonA.innerText = `Attack`;
  buttonA.onclick = () => attack();

  buttonB.setAttribute('class', 'gameBtn');
  buttonB.innerText = `Magic`;
  buttonB.onclick = () => magic();

  buttonC.setAttribute('class', 'gameBtn');
  buttonC.innerText = `Items`;
  buttonC.onclick = () => items();

  buttonD.setAttribute('class', 'gameBtn');
  buttonD.innerText = `Run`;
  buttonD.onclick = () => runAway();

  fightButtons.appendChild(buttonA);
  fightButtons.appendChild(buttonB);
  fightButtons.appendChild(buttonC);
  fightButtons.appendChild(buttonD);
}

function winEnemyBattle() {
  enemyImage.remove();
  enemyHealthBar.remove();
  fightButtons.remove();
  state.isInBattle = false;
  state.isCurrentTurn = false;
  newCharacter.kills++;
  newCharacter.fights++;
  refreshStats();
}

// 4 Button options
const attack = () => {
  console.log('attack');

  let randomAttackDamage = randomNumberGenerator(5);
  enemyState.health = enemyState.health - randomAttackDamage;
  attachRefresh();
};
const magic = () => {
  openMagicBag();
};
const items = () => {
  openItemBag();
};
const runAway = () => {
  console.log('run');
};

function openMagicBag() {
  // only open one bag at a time
  if (state.isItemBagOpen === true) {
    state.isItemBagOpen = !state.isItemBagOpen;
    itemBagContainer.style.display = 'none';
  }

  // set bag from open to closed, viible or not
  if (state.isMagicBagOpen === true) {
    magicBagContainer.style.display = 'none';
  }

  if (state.isMagicBagOpen === false) {
    magicBagContainer.style.display = 'block';
  }
  state.isMagicBagOpen = !state.isMagicBagOpen;
}

function openItemBag() {
  // only open one bag at a time
  if (state.isMagicBagOpen === true) {
    state.isMagicBagOpen = !state.isMagicBagOpen;
    magicBagContainer.style.display = 'none';
  }

  if (state.isItemBagOpen === true) {
    itemBagContainer.style.display = 'none';
  }

  if (state.isItemBagOpen === false) {
    itemBagContainer.style.display = 'block';
  }
  state.isItemBagOpen = !state.isItemBagOpen;
}

// BUILD SPELLS
function setMagicalSpells() {
  console.log('SETTING SPELL');
  magicBagContainer.id = 'magic-scroll-container';
  magicBagContainer.setAttribute('class', 'magic-bag');
  magicBagContainer.style.display = 'none';
  mainContainer.appendChild(magicBagContainer);

  magicHeadline.innerText = 'Magics';
  magicBagContainer.appendChild(magicHeadline);

  const magicUl = document.createElement('ul');
  magicBagContainer.appendChild(magicUl);

  newCharacter.magic.forEach((spell, index) => {
    const magicP = document.createElement('p');
    magicP.id = 'magicP-item';
    const useMagicButton = document.createElement('button');

    const magicLi = document.createElement('li');
    magicLi.setAttribute('class', 'list-item');
    magicUl.appendChild(magicLi);

    magicP.innerText =
      spell.name +
      `  ` +
      spell.image +
      `   ` +
      `Quantity: ` +
      spell.quantity +
      ` Type: ` +
      spell.type;

    magicLi.appendChild(magicP);

    // USE ITEM BUTTON
    useMagicButton.innerText = 'CAST';
    useMagicButton.onclick = () => {
      useSpell(spell);
    };

    magicLi.appendChild(useMagicButton);
  });

  const closeButton = document.createElement('button');
  closeButton.setAttribute('class', 'btn');
  closeButton.setAttribute('class', 'close-btn');
  closeButton.innerText = 'Close';
  closeButton.addEventListener('click', () => {
    magicBagContainer.style.display = 'none';
    state.isMagicBagOpen = !state.isMagicBagOpen;
  });
  magicBagContainer.appendChild(closeButton);
}
function useSpell(spell) {
  console.log('using spell');

  if (spell.quantity <= 0) {
    return console.log('out of magic');
  }

  console.log('spell', spell);
  spell.quantity--;
  refreshSpells(spell);
  attachRefresh();
  return refreshStats();
}
// BUILD INVINTORY
function setInvintoryItems() {
  itemBagContainer.id = 'item-bag-container';
  itemBagContainer.setAttribute('class', 'item-bag');
  itemBagContainer.style.display = 'none';
  mainContainer.appendChild(itemBagContainer);

  itemHeadline.innerText = 'Items';
  itemBagContainer.appendChild(itemHeadline);

  const itemUl = document.createElement('ul');
  itemBagContainer.appendChild(itemUl);

  newCharacter.items.forEach((item, index) => {
    const listP = document.createElement('p');
    listP.id = 'listP-item';
    const useItemButton = document.createElement('button');

    const itemLi = document.createElement('li');
    itemLi.setAttribute('class', 'list-item');
    itemUl.appendChild(itemLi);

    listP.innerText = item.name + ` ➨ ` + `Quantity: ` + item.quantity;

    itemLi.appendChild(listP);

    // USE ITEM BUTTON
    useItemButton.innerText = 'USE';
    useItemButton.onclick = () => {
      useInvintoryItem(item);
    };

    itemLi.appendChild(useItemButton);
  });

  const closeButton = document.createElement('button');
  closeButton.setAttribute('class', 'btn');
  closeButton.setAttribute('class', 'close-btn');
  closeButton.innerText = 'Close';
  closeButton.addEventListener('click', () => {
    itemBagContainer.style.display = 'none';
    state.isItemBagOpen = !state.isItemBagOpen;
  });
  itemBagContainer.appendChild(closeButton);
}

function useInvintoryItem(item) {
  console.log('item activated', item);

  if (item.quantity <= 0) {
    return console.log('out of stock');
  }

  if (item.type === 'heal') {
    newCharacter.health = newCharacter.health + item.use;
    item.quantity--;
    refreshInvintory(item);
    return refreshStats();
  }
}

function setStartingLevel() {
  let i = state.level - 1;
  const imageTag = document.createElement('img');
  imageTag.setAttribute('src', levelLocations[i].image);
  imageTag.setAttribute('class', 'level-image');
  levelContainer.appendChild(imageTag);

  const locationNameTag = document.createElement('div');
  locationNameTag.id = 'location-tag';
  levelContainer.appendChild(locationNameTag);

  const nameSpan = document.createElement('span');
  nameSpan.innerText = `${levelLocations[i].emoji} ~ ${levelLocations[i].name} ~ ${levelLocations[i].emoji}`;
  nameSpan.id = 'level-name-span';
  locationNameTag.appendChild(nameSpan);
}

function attachRefresh() {
  enemyHealthBar.innerText = `Enemy Health: ${enemyState.health}`;
  if (enemyState.health <= 1 && newCharacter.health > 0) winEnemyBattle();
}

function refreshStats() {
  playerhealthBar.innerText = `Health: ${newCharacter.health}`;
  playerkillBar.innerText = `Kills: ${newCharacter.kills}`;
}

function refreshSpells(spell) {
  console.log('refreshing spells');
  let magicP = document.getElementById('magicP-item');
  magicP.innerText =
    spell.name +
    `  ` +
    spell.image +
    `   ` +
    `Quantity: ` +
    spell.quantity +
    ` Type: ` +
    spell.type;
}

function refreshInvintory(item) {
  console.log('refreshing invintory');
  let listP = document.getElementById('listP-item');
  listP.innerText = item.name + `Quantity: ` + item.quantity;
}

function startingConditions() {}

function run() {
  setPlayerName();
  setPlayerData();
  setStartingLevel();
  setInvintoryItems();
  setMagicalSpells();
  startingConditions();
}

run();
