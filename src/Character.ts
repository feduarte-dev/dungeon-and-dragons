import Archetype, { Mage } from './Archetypes';
import Energy from './Energy';
import Fighter from './Fighter';
import Race, { Elf } from './Races';
import getRandomInt from './utils';

class Character implements Fighter {
  private _dexterity: number;
  private _race: Race;
  private _archetype: Archetype;
  private _maxLifePoints: number;
  _lifePoints: number;
  _strength: number;
  _defense: number;
  _energy?: Energy | undefined;

  constructor(public name: string) {
    this._dexterity = getRandomInt(1, 10);
    this._race = new Elf(this.name, this._dexterity);
    this._archetype = new Mage(this.name);
    this._maxLifePoints = this._race.maxLifePoints / 2;
    this._lifePoints = this._maxLifePoints;
    this._strength = getRandomInt(1, 10);
    this._defense = getRandomInt(1, 10);
    this._energy = {
      type_: this._archetype.energyType,
      amount: getRandomInt(1, 10),
    };
  }

  get race() {
    return this._race;
  }

  get archetype() {
    return this._archetype;
  }

  get lifePoints() {
    return this._lifePoints;
  }

  get strength() {
    return this._strength;
  }

  get defense() {
    return this._defense;
  }

  get dexterity() {
    return this._dexterity;
  }

  get energy() {
    const energy = {
      type_: this._energy?.type_,
      amount: this._energy?.amount,
    };

    return energy;
  }

  attack(enemy: Fighter): void {
    enemy.receiveDamage(this._strength);
  }

  special?(enemy: Fighter): void {
    enemy.receiveDamage(this._strength);
  }

  levelUp(): void {
    this._maxLifePoints += getRandomInt(1, 10);
    this._strength += getRandomInt(1, 10);
    this._dexterity += getRandomInt(1, 10);
    this._defense += getRandomInt(1, 10);
    
    if (this._energy) {
      this._energy.amount = 10;
    }
    
    if (this._maxLifePoints > this._race.maxLifePoints) {
      this._maxLifePoints = this._race.maxLifePoints;
    }
    
    this._lifePoints = this._maxLifePoints;
  }

  receiveDamage(attackPoints: number): number {
    const result = this._defense - attackPoints;
    
    if (result < 0) {
      this._lifePoints += result;
    } else {
      this._lifePoints -= 1;
    }

    if (this._lifePoints <= 0) {
      this._lifePoints = -1;
    }

    return this.lifePoints;
  }
}

export default Character;
