
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
      name: 'David Montoya',
    },
    {
      _id: new mongoose.Types.ObjectId(),
      email: 'me2@me.com',
      password: 'Password',
      name: 'Jose Lima',
    },
    {
      _id: new mongoose.Types.ObjectId(),
      email: 'me3@me.com',
      password: 'Password',
      name: 'Maria Lopez',
    },
    {
      _id: new mongoose.Types.ObjectId(),
      email: 'me4@me.com',
      password: 'Password',
      name: 'Tina Turner',
    },
    {
      _id: new mongoose.Types.ObjectId(),
      email: 'me5@me.com',
      password: 'Password',
      name: 'Henry Carpio',
    },
  ],
}

export default data