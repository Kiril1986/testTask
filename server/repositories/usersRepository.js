const {MongoClient, ObjectId} = require("mongodb")
const { faker} = require("@faker-js/faker")
const bcrypt = require("bcrypt");
const path = require('path');
const axios = require("axios")
const fs = require('fs');

// eslint-disable-next-line no-undef
const client = new MongoClient(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.aradlng.mongodb.net/?retryWrites=true&w=majority`)

const seedSize = 21;
const staticFolderPath = path.resolve("server", "..", "public");


async function saveImageToPublic (photo, imagePath) {  // функция для сохранения фотографий пользователей в папку "public" на сервере
  axios({
    method: 'get',
    url: photo,
    responseType: 'stream',
  }).then((response) => {
    response.data.pipe(fs.createWriteStream(imagePath));
  });
 }

// eslint-disable-next-line no-unused-vars
const start = async () => {  // функция для проверки подключения к базе
  try {
    await client.connect()
    console.log("db connected")
  } catch (e) {
    console.log(e)
  }
}
// start()

 async function generateUsers () {  // функция, которая генерирует массив рандомных пользователей заданной длины (seedSize) 
  const result = []
  for (let i = 0; i < seedSize; i++) {
    const photo = faker.image.avatar();
    const password = await bcrypt.hash(faker.internet.password(), 5);
    const email = faker.internet.email();
    const imageName = `${email}avatar.jpg`;
    const imagePath = path.resolve(staticFolderPath, imageName);
    saveImageToPublic(photo, imagePath);
      result.push({
      name: faker.person.firstName(),
      email: email,
      password: password,
      birthDate: faker.date.birthdate(),
      gender: faker.person.gender(),
      photo: imageName,
    })
  }
  return result
}

// eslint-disable-next-line no-unused-vars
const seedUsers = async () => {  // функция для добавления массива рандомных пользователей в базу
  try {
    await client.connect()
    const users = await client.db().collection("users")
    const seeds = await generateUsers();
    await users.insertMany(seeds)
    users.find()
  
  } catch (e) {
    console.log(e)
  }
}

// seedUsers()

const getAllUsers = async () => {  // функция для получения из базы всех пользователей
  try {
    const limit = 21;
    await client.connect();
    const users = await client.db().collection("users");
    const currentUsers = await users.find().limit(limit).toArray();
    return currentUsers
  } catch (e) {
    console.log(e)
  }
}

const registerUser = async (newUser) => {  // функция для регистрации пользователя
  try {
    await client.connect();
    const users = await client.db().collection("users");
    const photo = newUser.photo;
    const imageName = `${newUser.email}avatar.jpg`;
    const imagePath = path.resolve(staticFolderPath, imageName);
    saveImageToPublic(photo, imagePath);
    await users.insertOne({ name: newUser.name, email: newUser.email, password: await bcrypt.hash(newUser.password, 5), birthDate: newUser.birthDate, gender: newUser.gender, photo: imageName}) 
    const user = await users.findOne({email: newUser.email})
    return user
  } catch(e) {
    console.log(e)
  }
}

const updateUser = async (currentUser, newUser) => {  // функция для обновления данных юзера
  try {
    await client.connect();
    const users = await client.db().collection("users");
    const photo = newUser.photo;
    const imageName = `${currentUser.email}avatar.jpg`;
    const imagePath = path.resolve(staticFolderPath, imageName);
    fs.unlink(imagePath, (err) => {
      if (err) {
        console.error('Error deleting file:', err);
      } else {
        console.log('File deleted successfully');
      }
    });
    saveImageToPublic(photo, imagePath);
    await users.updateOne({_id: new ObjectId(currentUser._id)}, { $set: { name: newUser.name, password: await bcrypt.hash(newUser.password, 5), photo: imageName} } )
    return
  } catch(e) {
    console.log(e)
  }

}

const findOneUserById = async (id) => {  // функция для поиска юзера по id
  try {
    await client.connect();
     const users = await client.db().collection("users");
     const user = await users.findOne({_id: new ObjectId(id)})
     return user
  } catch (e) {
    console.log(e)
  }
}

const findOneUserByEmail = async (email) => {  // функция для поиска юзера по email
  try {
     await client.connect();
     const users = await client.db().collection("users");
     const user = await users.findOne({email: email})
     return user 
  } catch (e) {
    console.log(e)
  }
}

// eslint-disable-next-line no-unused-vars
const deleteAllUsers = async () => {  // функция для удаления всех пользователей из базы
  try {
    await client.connect();
    const users = await client.db().collection("users");
    await users.deleteMany({})
    fs.readdir(staticFolderPath, (err, files) => {
      if (err) {
        console.error('Error reading directory:', err);
        return;
      }
          files.forEach((file) => {
        const filePath = path.join(staticFolderPath, file);
          fs.unlink(filePath, (err) => {
          if (err) {
            console.error('Error deleting file:', err);
          } else {
            console.log(`File ${file} deleted successfully`);
          }
        });
      });
    });
  } catch (e) {
    console.log(e)
  }
}

// deleteAllUsers()

module.exports = {
  getAllUsers, registerUser, updateUser, findOneUserByEmail, findOneUserById
}