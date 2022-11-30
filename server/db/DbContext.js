import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { CarSchema } from '../models/Car.js';
import { ValueSchema } from '../models/Value'

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Cars = mongoose.model('Car', CarSchema) // add this allow api to grab from this db collection
}

export const dbContext = new DbContext()