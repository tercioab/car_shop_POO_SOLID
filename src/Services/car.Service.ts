import CarDomains from '../Domains/Car.domains';
import ICar from '../Interfaces/ICar';
import CarODM from '../Models/CarODM';

export default class CarService {
  constructor(private _carODM = new CarODM()) {}
  public createVehicleDomain(car: ICar) {
    if (car) {
      return new CarDomains(car);
    } return null;
  }

  public async create(car: ICar) {
    const newCar = await this._carODM.create(car);
    return this.createVehicleDomain(newCar);
  }

  public async findAll() {
    const allCars = await this._carODM.findAll();
    return allCars
      .map((car) => this.createVehicleDomain(car));
  }

  public async findById(id: string) {
    const car = await this._carODM.findById(id);
    if (car) { return this.createVehicleDomain(car); }
  }

  public async updateById(id: string, vehicle: ICar) {
    const car = await this._carODM.updateById(id, vehicle);
    if (car) { return this.createVehicleDomain(car); }
  }

  public async excludeById(id: string) {
    return this._carODM.excludeById(id);
  }
}