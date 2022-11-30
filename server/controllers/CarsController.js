import { carsService } from "../services/CarsService.js";
import BaseController from "../utils/BaseController.js";

export class CarsController extends BaseController {
    constructor() {
        super('api/cars')
        this.router
            .get('', this.getAll)
            .post('', this.create)
            .delete('/:carId', this.remove)
            .put('/:carId', this.update)
    }

    async getAll(req, res, next) {
        try {
            const query = req.query
            const cars = await carsService.getAll(query)
            return res.send(cars)
        } catch (error) {
            next(error)
        }
    }
    async create(req, res, next) {
        try {
            const car = await carsService.create(req.body)
            return res.send(car)
        } catch (error) {
            next(error)
        }
    }

    async remove(req, res, next) {
        try {
            const message = await carsService.remove(req.params.carId)
            return res.send(message)
        } catch (error) {
            next(error)
        }
    }

    async update(req, res, next) {
        try {
            const updated = await carsService.update(req.params.carId, req.body)
            return res.send(updated)
        } catch (error) {
            next(error)
        }
    }
}