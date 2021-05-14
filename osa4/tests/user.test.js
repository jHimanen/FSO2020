const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')

describe('When there is initially one user at db', () => {
    
    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('sekret', 10)
        const user = await new User({ username: 'root', passwordHash })

        await user.save()
    })

    test('Creation succeeds with a fresh username', async () => {
        const usersAtStart = await User.find({})

        const newUser = {
            username: 'mluukkai',
            name: 'Matti Luukkainen',
            password: 'salainen'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await User.find({})
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

        const usernames = usersAtEnd.map(u => u.username)
        expect(usernames).toContain(newUser.username)
    })

    test('Creation fails with faulty username', async () => {
        const usersAtStart = await User.find({})

        const usernameMissing = {
            name: 'Matti Luukkainen',
            password: 'salainen'
        }
        const usernameTooShort = {
            username: 'Ma',
            name: 'Matti Luukkainen',
            password: 'salainen'
        }

        await api
            .post('/api/users')
            .send(usernameMissing)
            .expect(400)

        await api
            .post('/api/users')
            .send(usernameTooShort)
            .expect(400)

        const usersAtEnd = await User.find({})
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('Creation fails with faulty password', async () => {
        const usersAtStart = await User.find({})

        const passwordMissing = {
            username: 'mluukkai',
            name: 'Matti Luukkainen'
        }
        const passwordTooShort = {
            username: 'mluukkai',
            name: 'Matti Luukkainen',
            password: 'sa'
        }

        await api
            .post('/api/users')
            .send(passwordMissing)
            .expect(400)

        await api
            .post('/api/users')
            .send(passwordTooShort)
            .expect(400)

        const usersAtEnd = await User.find({})
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })
})

afterAll(() => {
    mongoose.connection.close()
})