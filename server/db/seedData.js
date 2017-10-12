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
        return dbInstance.addCategory(instance.categoryId);
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

const productInstances = [
  {
    name: 'Chocolate Chip Cookies',
    description: 'Made from the finest dark chocolate chips. Soft, gooey and delicious. Order by the dozen.',
    price: 10.00,
    image: 'jade-wulfraat-96023.jpg',
    categoryId: 4
  },
  {
    name: 'Brownies',
    description: 'Includes walnuts, dark chocolate, and a whole lot of yummy. Order in trays of 15',
    price: 15.00,
    image: 'brownie.jpg',
    categoryId: 4
  },
  {
    name: 'Fruit Tart',
    description: 'Delightful, fresh, and fun.',
    price: 5.00,
    image: 'fruitTart.jpg',
    categoryId: 2
  },
  {
    name: 'Macarons',
    description: 'Comes in batches of three assorted flavors. Just the right amount of sweet.',
    price: 10.00,
    image: 'macarons.jpg',
    categoryId: 2
  },
  {
    name: 'Chocolate Donut',
    description: 'Decadent chocolate topped with hazelnuts and walnuts.',
    price: 7.00,
    image: 'chocoDonut.jpg',
    categoryId: 2
  },
  {
    name: 'Muffins',
    description: 'The perfect breakfast treat! Baked with real apples',
    price: 10.00,
    image: 'muffins.jpg',
    categoryId: 4
  },
  {
    name: 'Nutty Loaf',
    description: 'Hearty and healthy bread for everyday or special occasions.',
    price: 12.00,
    image: 'nutLoaf.jpg',
    categoryId: 1
  },
  {
    name: 'Whole Wheat Bread',
    description: 'Healthy bread baked on a hearth.',
    price: 9.00,
    image: 'roundBread.jpg',
    categoryId: 1
  },
  {
    name: 'Tomato Bread',
    description: 'Infused with sweet ripe tomatoes.',
    price: 11.00,
    image: 'tomatoBread.jpg',
    categoryId: 1
  },
  {
    name: 'Rye Bread',
    description: 'Great for all sorts of sandwiches and soups',
    price: 11.00,
    image: 'ryeBread.jpg',
    categoryId: 1
  },
  {
    name: 'Strawberry Tart',
    description: 'A strawberries and cream paradise',
    price: 15.00,
    image: 'strawberryTart.jpg',
    categoryId: 2
  },
  {
    name: 'Rainbow Layer Cake',
    description: 'A festive cake for any special occasion',
    price: 35.50,
    image: 'rainbowCake.jpg',
    categoryId: 3
  },
  {
    name: 'Rustic Berry Lemon Cake',
    description: 'Fresh blueberries on top of a moist, lemony cake with vanilla frosting.',
    price: 37.50,
    image: 'berryCake.jpg',
    categoryId: 3
  },
  {
    name: 'Flower Cookies',
    description: 'A classic jam-in-the-middle cookie. Sold by the dozen.',
    price: 9.95,
    image: 'flowerCookie.jpg',
    categoryId: 4
  },
  {
    name: 'A Very Berry Pie',
    description: 'Filled with raspberries and love.',
    price: 21.90,
    image: 'berryPie.jpg',
    categoryId: 2
  },
  {
    name: 'Sprinkle Cupcakes',
    description: 'Buttercream frosting atop a vanilla cupcake. Rainbow Sprinkles. Order by the dozen.',
    price: 25.90,
    image: 'cupcakes.jpg',
    categoryId: 2
  },
  {
    name: 'Harvest Cake',
    description: "Nature's bounty all in one glorious cake.",
    price: 25.90,
    image: 'harvestCake.jpg',
    categoryId: 3
  },
]
const categoryData = {
  name: ['bread', 'pastry', 'cakes', 'smallBites'],
  displayName: ['Bread', 'Pastry', 'Cakes', 'Small Bites'],
  description: ['Savory and sweet!', 'For every occasion', 'Decadent treats', 'Beloved by all']
};


db.sync({force: true})
  .then(() => seedModel(user, generateRandomInstances(userData)))
  .then(() => seedCategAndProd(category, generateInstances(categoryData), product, productInstances))
  .then(() => testingLogin(user))
  .then(() => console.log('All models have been seeded.'))
  .catch(err => console.error(err));
