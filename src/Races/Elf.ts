import Race from './Race';

class Elf extends Race {
  private static _instances = 0;
  constructor(_name: string, _dexterity: number, private _maxLifePoints = 99) {
    super(_name, _dexterity);
    Elf._instances += 1;
  }

  get maxLifePoints(): number {
    return this._maxLifePoints;
  }

  static createdRacesInstances(): number {
    return this._instances;
  }
}

export default Elf;