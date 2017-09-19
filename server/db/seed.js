'use strict';

const Promise = require('bluebird');
const db = require('./index');
const { user, product, category } = db.models;

const random = (array) => {
  let i = Math.floor(Math.random() * array.length);
  return array[i];
};

const generateEmail = (instance) => {
  const endings = ['us.gov', 'example.com', 'hello.me', 'myemail.net'];
  const randomNumbers = Math.floor(Math.random() * 1000);
  return `${instance.firstName}${instance.lastName}${randomNumbers}@${random(endings)}`;
};

const generatePrice = () => {
  return Math.floor(Math.random() * 100 * 100) / 100 + 1;
};

const generateRandomInstances = (dummyData) => {
  const fields = Object.keys(dummyData);
  const generatedData = [];
  for (let i = 0; i < 20; i++) {
    let instance = {};
    fields.forEach(field => {
      let options = dummyData[field];
      if (typeof options === 'function') {
        instance[field] = options(instance);
      } else {
        instance[field] = random(options);
      }
    });
    generatedData.push(instance);
  }
  return generatedData;
};

const generateInstances = (dummyData) => {
  const fields = Object.keys(dummyData);
  const number = dummyData[fields[0]].length;
  const generated = [];
  for (let i = 0; i < number; i++) {
    let instance = {};
    fields.forEach(field => {
      let item = dummyData[field][i];
      instance[field] = item;
    });
    generated.push(instance);
  }
  return generated;
}

const seedModel = (model, instancs) => {
  return Promise.map(instancs, instance => model.create(instance))
    .then(arr => {
      console.log(`Model has been seeded`);
      return arr;
    })
    .catch(console.error);
};

const seedProducts = (model, data, dbCategories) => {
  return Promise.map(data, instance => {
    return model.create(instance)
      .then(dbInstance => {
        return dbInstance.addCategory(random(dbCategories).id);
      });
  })
    .then(() => {
      console.log(`Model has been seeded`);
    })
    .catch(console.error);
};

const seedCategAndProd = (cModel, cData, pModel, pData) => {
  return seedModel(cModel, cData)
    .then(dbCateg => {
      return seedProducts(pModel, pData, dbCateg);
    });
};

const testingLogin = (uModel) => {
  return uModel.create({
    firstName: 'God',
    lastName: 'Almighty',
    email: 'god@heaven.com',
    password: '123',
    isAdmin: true
  })
  .then(() => {
    return uModel.create({
      firstName: 'Squidward',
      lastName: 'Tentacles',
      email: 'squid@bikinibottom.com',
      password: '123',
      isAdmin: false
    });
  });
};

const userData = {
  firstName: ['Azula', 'Louie', 'Olive', 'Clover', 'Zuko', 'Bird', 'Lewis', 'Lelouch', 'Arya', 'Samwise', 'Mob', 'Kenan', 'Dickon'],
  lastName: ['Rat', 'Cat', 'Smith', 'Black', 'White', 'Gray', 'Brown', 'Strange', 'Gamgee', 'Stark', 'Lannister', 'Targaeryan', 'Tyrell'],
  email: generateEmail,
  password: ['apple', 'orange', 'GRAPES', '123and123', 'theNorthRemembers', 'wigs', 'cleganebowl', 'serdavos', 'drogon']
};

const productData = {
  name: ['Croissant', 'Donut', 'Cronut', 'Babka', 'Sourdough', 'Cake', 'Poppyseed Muffin', 'Tomato Bread', 'Red Bean Bun', 'Cookies', 'Brownies', 'Picnic Pie'],
  description: ['Scrumptious!', 'A divine treat for all those lucky enough to savor it.', 'Totally healthy and good for your body and soul', 'Eat me', 'Order by the dozen', 'Baked fresh daily', 'Yummy in your tummy'],
  price: generatePrice,
  image: ['jade-wulfraat-96023.jpg'],
  categories: ['Bread', 'Pastry', 'Cakes', 'Cookies']
};

const categoryData = {
  name: ['Bread', 'Pastry', 'Cakes', 'Cookies'],
  description: ['Savory and sweet!', 'For every occasion', 'Decadent treats', 'Beloved by all']
};


db.sync({force: true})
  .then(() => seedModel(user, generateRandomInstances(userData)))
  .then(() => seedCategAndProd(category, generateInstances(categoryData), product, generateRandomInstances(productData)))
  .then(() => testingLogin(user))
  .then(() => console.log('All models have been seeded.'))
  .catch(err => console.error(err));
