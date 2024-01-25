import Race from './Race';

class Halfling extends Race {
  private static _instances = 0;
  constructor(_name: string, _dexterity: number, private _maxLifePoints = 60) {
    super(_name, _dexterity);
    Halfling._instances += 1;
  }

  get maxLifePoints(): number {
    return this._maxLifePoints;
  }

  static createdRacesInstances(): number {
    return this._instances;
  }
}

export default Halfling;