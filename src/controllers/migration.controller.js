const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { Food, FoodCategory, FoodAndFoodCategory, Location } = require('../models');

const food = catchAsync(async (req, res) => {
  const foods = [
    {
      _id: 1,
      name: 'Rujak Cingur',
      description: `Cingur is taken from the Madurese regional language which means "mouth". This food has a salty taste, and is served with a variety of ingredients such as cucumber, jicama, young mango, plus rice cake, tofu, tempe, cingur, sprouts, water spinach, and long beans.`,
      image: 'https://picsum.photos/200',
      likes: 100,
    },
    {
      _id: 2,
      name: 'Campur',
      description: `Campur is one of the typical Madurese soup that has a savory taste. This food is served with rice cake, rice noodles, meat, sprouts, and peanut sauce.`,
      image: 'https://picsum.photos/200',
      likes: 90,
    },
    {
      _id: 3,
      name: 'Soto Madura',
      description: `Soto Madura is made from shredded chicken or beef, eggs, potatoes, scallions, lemongrass, celery leaves, lime, and fried onions. The difference is, Soto Madura sauce uses candlenut, which makes the color of the sauce a cloudy yellow, but has a quite distinctive and appetizing aroma.`,
      image: 'https://picsum.photos/200',
      likes: 70,
    },
    {
      _id: 4,
      name: 'Sate Lalat',
      description: `Sate Lalat, or in the Madurese language commonly called sate lalak, are not made from flies, but from lamb or chicken, which are cut into small pieces so that they look like flies. Just like satay in general, this fly satay is served with peanut sauce.`,
      image: 'https://picsum.photos/200',
      likes: 30,
    },
    {
      _id: 5,
      name: 'Lorjuk',
      description: `Lorjuk is a bamboo shell that has a small elongated shape. By the Madurese, lorjuk can be processed into various kinds of food. One of the foods made using lorjuk as the main ingredient.
      The savory taste makes this typical Madurese food a pity to miss.`,
      image: 'https://picsum.photos/200',
      likes: 100,
    },
    {
      _id: 6,
      name: 'Nasi Serpong',
      description: `This dish serves white rice, with rich side dishes such as black squid, shrimp, tuna, krecek, vermicelli, and sambel pencit. Of course, you will not be bored with the various flavors of side dishes on Nasi Serpang.`,
      image: 'https://picsum.photos/200',
      likes: 90,
    },
  ];

  await Food.collection.bulkWrite(
    foods.map((user) => ({
      updateOne: {
        filter: { name: user.name, description: user.description, likes: user.likes, image: user.image },
        update: { $set: user },
        upsert: true,
      },
    }))
  );

  const foodCategories = [
    {
      _id: 'Food',
      name: 'Food',
    },
    {
      _id: 'Beverages',
      name: 'Beverages',
    },
    {
      _id: 'Sweet',
      name: 'Sweet',
    },
    {
      _id: 'Savory',
      name: 'Savory',
    },
    {
      _id: 'Spicy',
      name: 'Spicy',
    },
  ];

  await FoodCategory.collection.bulkWrite(
    foodCategories.map((user) => ({
      updateOne: {
        filter: { name: user.name },
        update: { $set: user },
        upsert: true,
      },
    }))
  );

  const foodAndFoodCategories = [
    {
      _id: 1,
      food: 1,
      foodCategory: 'Food',
    },
    {
      _id: 2,
      food: 1,
      foodCategory: 'Spicy',
    },
    {
      _id: 3,
      food: 2,
      foodCategory: 'Food',
    },
    {
      _id: 4,
      food: 2,
      foodCategory: 'Savory',
    },
    {
      _id: 5,
      food: 3,
      foodCategory: 'Food',
    },
    {
      _id: 6,
      food: 3,
      foodCategory: 'Savory',
    },
    {
      _id: 7,
      food: 4,
      foodCategory: 'Food',
    },
    {
      _id: 8,
      food: 4,
      foodCategory: 'Sweet',
    },
    {
      _id: 9,
      food: 5,
      foodCategory: 'Food',
    },
    {
      _id: 10,
      food: 5,
      foodCategory: 'Savory',
    },
    {
      _id: 11,
      food: 6,
      foodCategory: 'Food',
    },
    {
      _id: 12,
      food: 6,
      foodCategory: 'Savory',
    },
  ];

  await FoodAndFoodCategory.collection.bulkWrite(
    foodAndFoodCategories.map((user) => ({
      updateOne: {
        filter: { food: user.food, foodCategory: user.foodCategory },
        update: { $set: user },
        upsert: true,
      },
    }))
  );

  // location
  const locations = [
    {
      _id: 'Madura',
      name: 'Madura',
    },
    {
      _id: 'Jogjakara',
      name: 'Jogjakarta',
    },
    {
      _id: 'Jakarta',
      name: 'Jakarta',
    },
  ];

  await Location.collection.bulkWrite(
    locations.map((user) => ({
      updateOne: {
        filter: { name: user.name },
        update: { $set: user },
        upsert: true,
      },
    }))
  );

  res.status(httpStatus.CREATED).send();
});

module.exports.food = food;
