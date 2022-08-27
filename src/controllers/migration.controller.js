const mongoose = require('mongoose');
const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { Food, FoodCategory, FoodAndFoodCategory, Location, FoodAndLocation, Restaurant } = require('../models');

const food = catchAsync(async (req, res) => {
  const foodCategories = [
    {
      name: 'Food',
    },
    {
      name: 'Beverages',
    },
    {
      name: 'Sweet',
    },
    {
      name: 'Savory',
    },
    {
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

  const locations = [
    {
      name: 'Madura',
    },
    {
      name: 'Jogjakarta',
    },
    {
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

  const locations2 = await Location.find();
  const foodCategories2 = await FoodCategory.find();

  const foods = [
    {
      name: 'Rujak Cingur',
      description: `Cingur is taken from the Madurese regional language which means "mouth". This food has a salty taste, and is served with a variety of ingredients such as cucumber, jicama, young mango, plus rice cake, tofu, tempe, cingur, sprouts, water spinach, and long beans.`,
      image: 'https://picsum.photos/200',
      likes: 100,
      location: mongoose.Types.ObjectId(locations2[0].id),
      tags: [mongoose.Types.ObjectId(foodCategories2[0].id), mongoose.Types.ObjectId(foodCategories2[4].id)],
    },
    {
      name: 'Campur',
      description: `Campur is one of the typical Madurese soup that has a savory taste. This food is served with rice cake, rice noodles, meat, sprouts, and peanut sauce.`,
      image: 'https://picsum.photos/200',
      likes: 90,
      location: mongoose.Types.ObjectId(locations2[0].id),
      tags: [mongoose.Types.ObjectId(foodCategories2[0].id), mongoose.Types.ObjectId(foodCategories2[4].id)],
    },
    {
      name: 'Soto Madura',
      description: `Soto Madura is made from shredded chicken or beef, eggs, potatoes, scallions, lemongrass, celery leaves, lime, and fried onions. The difference is, Soto Madura sauce uses candlenut, which makes the color of the sauce a cloudy yellow, but has a quite distinctive and appetizing aroma.`,
      image: 'https://picsum.photos/200',
      likes: 70,
      location: mongoose.Types.ObjectId(locations2[0].id),
    },
    {
      name: 'Sate Lalat',
      description: `Sate Lalat, or in the Madurese language commonly called sate lalak, are not made from flies, but from lamb or chicken, which are cut into small pieces so that they look like flies. Just like satay in general, this fly satay is served with peanut sauce.`,
      image: 'https://picsum.photos/200',
      likes: 30,
      location: mongoose.Types.ObjectId(locations2[0].id),
    },
    {
      name: 'Lorjuk',
      description: `Lorjuk is a bamboo shell that has a small elongated shape. By the Madurese, lorjuk can be processed into various kinds of food. One of the foods made using lorjuk as the main ingredient.
      The savory taste makes this typical Madurese food a pity to miss.`,
      image: 'https://picsum.photos/200',
      likes: 100,
      location: mongoose.Types.ObjectId(locations2[0].id),
    },
    {
      name: 'Nasi Serpong',
      description: `This dish serves white rice, with rich side dishes such as black squid, shrimp, tuna, krecek, vermicelli, and sambel pencit. Of course, you will not be bored with the various flavors of side dishes on Nasi Serpang.`,
      image: 'https://picsum.photos/200',
      likes: 90,
      location: mongoose.Types.ObjectId(locations2[1].id),
    },
  ];

  await Food.collection.bulkWrite(
    foods.map((user) => ({
      updateOne: {
        filter: {
          name: user.name,
          description: user.description,
          likes: user.likes,
          image: user.image,
          location: user.location,
        },
        update: { $set: user },
        upsert: true,
      },
    }))
  );

  const foods2 = await Food.find();

  res.status(httpStatus.CREATED).send();
});

const restaurant = catchAsync(async (req, res) => {
  const restaurants = [
    {
      name: 'Restaurant 1',
      description: 'Restaurant 1 description',
      image: 'https://picsum.photos/200',
      location: 'Madura',
    },
  ];

  await Restaurant.collection.bulkWrite(
    restaurants.map((user) => ({
      updateOne: {
        filter: { name: user.name, description: user.description, images: user.images, location: user.location },
        update: { $set: user },
        upsert: true,
      },
    }))
  );

  res.status(httpStatus.CREATED).send();
});

module.exports = { food, restaurant };
