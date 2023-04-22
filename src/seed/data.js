
import mongoose from 'mongoose'
/**
 * Random number generator function
 * @returns {number}
 *
 */

const data = {
  users: [
    {
      _id: new mongoose.Types.ObjectId(),
      email: 'mrtonyq@me.com',
      password: 'Password',
      name: 'Super Admin',
      role: 'admin',
    },
    {
      _id: new mongoose.Types.ObjectId(),
      email: 'me@me.com',
      password: 'Password',
      name: 'Vitamin Alex',
      role: 'admin'
    },
    {
      _id: new mongoose.Types.ObjectId(),
      email: 'me1@me.com',
      password: 'Password',
      name: 'Jose Medina',
    },
    {
      _id: new mongoose.Types.ObjectId(),
      email: 'me2@me.com',
      password: 'Password',
      name: 'Tina Turner',
    },
    {
      _id: new mongoose.Types.ObjectId(),
      email: 'me3@me.com',
      password: 'Password',
      name: 'Henry De Caprio',
    },
  ],
}

export default data