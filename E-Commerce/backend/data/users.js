import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'Bhavesh Dixit',
    email: 'bhavesh@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Hardik Agarwal',
    email: 'hardik@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
]

export default users
