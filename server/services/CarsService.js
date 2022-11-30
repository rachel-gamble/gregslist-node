import { BadRequest } from "@bcwdev/auth0provider/lib/Errors.js"
import { dbContext } from "../db/DbContext.js"



class CarsService {
    async getAll(query) {// query allows people to filter through your find
        //                                           .sort sorts by these values (- makes it ascending)
        //                                            .limit can be used to limit results
        const cars = await dbContext.Cars.find(query).sort('model -make') //Find all cars
        return cars
    }
    async create(carData) {
        const newCar = await dbContext.Cars.create(carData)
        return newCar
    }
    async remove(carId) {
        // await dbContext.Cars.findByIdAndRemove(carId) // this is ok this will delete it
        const car = await dbContext.Cars.findById(carId)
        if (!car) throw new BadRequest('no car at id: ' + carId)

        //TODO get rid of the car too
        await car.remove() //another way to remove a document
        return `deleted ${car.make} ${car.model}`
    }

    async update(carId, carData) {
        // const updated = await dbContext.Cars.findByIdAndUpdate(carId, carData) // this works and is ok
        const original = await dbContext.Cars.findById(carId)
        if (!original) throw new BadRequest('no car at id: ' + carId)

        // NOTE if you don't want them to change it just don't include it here
        original.make = carData.make ? carData.make : original.make
        original.model = carData.model ? carData.model : original.model
        original.price = carData.price !== undefined ? carData.price : original.price // !== is the best case to handle numbers and bool (anything that can be saved as a false value)
        original.imgUrl = carData.imgUrl ? carData.imgUrl : original.imgUrl
        original.year = carData.year !== undefined ? carData.year : original.year
        original.description = carData.description ? carData.description : original.description
        original.color = carData.color ? carData.color : original.color

        await original.save()
        return original
    }

}

export const carsService = new CarsService()