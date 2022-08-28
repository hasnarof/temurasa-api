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
    {
      name: 'Snacks',
    },
    {
      name: 'Dessert',
    },
    {
      name: 'Chicken & Duck',
    },
    {
      name: 'Noodles',
    },
    {
      name: 'Rice',
    },
    {
      name: 'Seafood',
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
      name: 'Palembang',
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
      image:
        'https://firebasestorage.googleapis.com/v0/b/temurasa-206af.appspot.com/o/foods%2Frujak_cingur.png?alt=media&token=2690598d-4547-40a7-9d1a-215c4ab8b9b6',
      likes: 100,
      location: mongoose.Types.ObjectId('63098571b1b38b3e3fb34d18'),
      tags: [mongoose.Types.ObjectId(foodCategories2[0].id), mongoose.Types.ObjectId(foodCategories2[4].id)],
    },
    {
      name: 'Campur',
      description: `Campur is one of the typical Madurese soup that has a savory taste. This food is served with rice cake, rice noodles, meat, sprouts, and peanut sauce.`,
      image:
        'https://firebasestorage.googleapis.com/v0/b/temurasa-206af.appspot.com/o/foods%2Fcampur.png?alt=media&token=64e2ddfc-4451-49d7-9c52-111a3b476156',
      likes: 90,
      location: mongoose.Types.ObjectId('63098571b1b38b3e3fb34d18'),
      tags: [mongoose.Types.ObjectId(foodCategories2[0].id), mongoose.Types.ObjectId(foodCategories2[4].id)],
    },
    {
      name: 'Soto Madura',
      description: `Soto Madura is made from shredded chicken or beef, eggs, potatoes, scallions, lemongrass, celery leaves, lime, and fried onions. The difference is, Soto Madura sauce uses candlenut, which makes the color of the sauce a cloudy yellow, but has a quite distinctive and appetizing aroma.`,
      image:
        'https://firebasestorage.googleapis.com/v0/b/temurasa-206af.appspot.com/o/foods%2Fsoto_madura.png?alt=media&token=eeb94443-6b06-4daf-820e-685d6e5a4ac2',
      likes: 70,
      location: mongoose.Types.ObjectId('63098571b1b38b3e3fb34d18'),
    },
    {
      name: 'Sate Lalat',
      description: `Sate Lalat, or in the Madurese language commonly called sate lalak, are not made from flies, but from lamb or chicken, which are cut into small pieces so that they look like flies. Just like satay in general, this fly satay is served with peanut sauce.`,
      image:
        'https://firebasestorage.googleapis.com/v0/b/temurasa-206af.appspot.com/o/foods%2Fsate_lalat.png?alt=media&token=e02b3343-d5fe-4375-9bc7-0d273d93244a',
      likes: 30,
      location: mongoose.Types.ObjectId('63098571b1b38b3e3fb34d18'),
    },
    {
      name: 'Lorjuk',
      description: `Lorjuk is a bamboo shell that has a small elongated shape. By the Madurese, lorjuk can be processed into various kinds of food. One of the foods made using lorjuk as the main ingredient.
      The savory taste makes this typical Madurese food a pity to miss.`,
      image:
        'https://firebasestorage.googleapis.com/v0/b/temurasa-206af.appspot.com/o/foods%2Florjuk.png?alt=media&token=724a0267-c677-4d1e-8431-02d0ef9c897b',
      likes: 100,
      location: mongoose.Types.ObjectId('63098571b1b38b3e3fb34d18'),
    },
    {
      name: 'Nasi Serpong',
      description: `This dish serves white rice, with rich side dishes such as black squid, shrimp, tuna, krecek, vermicelli, and sambel pencit. Of course, you will not be bored with the various flavors of side dishes on Nasi Serpang.`,
      image:
        'https://firebasestorage.googleapis.com/v0/b/temurasa-206af.appspot.com/o/foods%2Fnasi_serpong.png?alt=media&token=93b0f9fc-122a-442c-90bf-c9416a783e5c',
      likes: 90,
      location: mongoose.Types.ObjectId('63098571b1b38b3e3fb34d18'),
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

  const restaurants = [
    {
      name: 'Warung Asela',
      address: 'Jalan Raya, Slabayan, Sejati, Kec. Camplong, Kabupaten Sampang, Jawa Timur',
      phone: '0812-XXXX-XXX',
      openHours: ['Open 9AM - 10 PM'],
      location: mongoose.Types.ObjectId('63098571b1b38b3e3fb34d18'),
      foods: ['Gurame', 'Capcay', 'Kepiting'],
      map: 'https://goo.gl/maps/CDsJN7cMv4zKrjGG8',
      menu: {
        title: 'Menu',
        image:
          'https://firebasestorage.googleapis.com/v0/b/temurasa-206af.appspot.com/o/restaurants%2Fwarung_asela_menu.jpeg?alt=media&token=b904a35c-a9a1-4ad8-9156-2080a4e91701',
      },
      image: [
        'https://firebasestorage.googleapis.com/v0/b/temurasa-206af.appspot.com/o/restaurants%2Fwarung_asela.jpeg?alt=media&token=af3818dc-b50c-4ac5-9a9d-a3c29eae41fb',
        'https://firebasestorage.googleapis.com/v0/b/temurasa-206af.appspot.com/o/restaurants%2Fwarung_asela2.jpeg?alt=media&token=1fe359d4-076d-488a-8a66-ac302fc6c268',
      ],
      ratingFix: 4,
      ratingCount: 100,
    },
    {
      name: 'Warung Asela 2',
      address: 'Jalan Raya, Slabayan, Sejati, Kec. Camplong, Kabupaten Sampang, Jawa Timur',
      phone: '0812-XXXX-XXX',
      openHours: ['Open 9AM - 10 PM'],
      location: mongoose.Types.ObjectId('63098571b1b38b3e3fb34d18'),
      foods: ['Gurame', 'Capcay', 'Kepiting'],
      map: 'https://goo.gl/maps/CDsJN7cMv4zKrjGG8',
      menu: {
        title: 'Menu',
        image:
          'https://firebasestorage.googleapis.com/v0/b/temurasa-206af.appspot.com/o/restaurants%2Fwarung_asela_menu.jpeg?alt=media&token=b904a35c-a9a1-4ad8-9156-2080a4e91701',
      },
      image: [
        'https://firebasestorage.googleapis.com/v0/b/temurasa-206af.appspot.com/o/restaurants%2Fwarung_asela2.jpeg?alt=media&token=1fe359d4-076d-488a-8a66-ac302fc6c268',
        'https://firebasestorage.googleapis.com/v0/b/temurasa-206af.appspot.com/o/restaurants%2Fwarung_asela.jpeg?alt=media&token=af3818dc-b50c-4ac5-9a9d-a3c29eae41fb',
      ],
      ratingFix: 4.1,
      ratingCount: 100,
    },
    {
      name: 'Putri Restaurant',
      address: 'Jl. Trunojoyo No. 107, Pamekasan',
      phone: '0812-XXXX-XXX',
      openHours: ['Open 7AM - 11 PM'],
      location: mongoose.Types.ObjectId('63098571b1b38b3e3fb34d18'),
      foods: ['Lorjuk', 'Soto Madura', 'Nasi Serpong'],
      map: 'https://www.google.com/maps/place/Putri+Restaurant,+Jl.+Trunojoyo+No.107,+Patemon,+Kec.+Pamekasan,+Kabupaten+Pamekasan,+Jawa+Timur+69317/@-7.1667819,113.481364,17z/data=!4m5!3m4!1s0x2dd77ddede3d136f:0xb0ce41f3663be129!8m2!3d-7.1667819!4d113.481364',
      menu: {
        title: 'Menu',
        image:
          'https://firebasestorage.googleapis.com/v0/b/temurasa-206af.appspot.com/o/restaurants%2Fwarung_asela_menu.jpeg?alt=media&token=b904a35c-a9a1-4ad8-9156-2080a4e91701',
      },
      image: [
        'https://firebasestorage.googleapis.com/v0/b/temurasa-206af.appspot.com/o/restaurants%2Fputri_restaurant.jpeg?alt=media&token=e9a6ae0b-05eb-4c03-8af9-5c65f943ee67',
      ],
      ratingFix: 4.2,
      ratingCount: 100,
    },
    {
      name: 'Putri Restaurant 2',
      address: 'Jl. Trunojoyo No. 107, Pamekasan',
      phone: '0812-XXXX-XXX',
      openHours: ['Open 7AM - 11 PM'],
      location: mongoose.Types.ObjectId('63098571b1b38b3e3fb34d18'),
      foods: ['Lorjuk', 'Soto Madura', 'Nasi Serpong'],
      map: 'https://www.google.com/maps/place/Putri+Restaurant,+Jl.+Trunojoyo+No.107,+Patemon,+Kec.+Pamekasan,+Kabupaten+Pamekasan,+Jawa+Timur+69317/@-7.1667819,113.481364,17z/data=!4m5!3m4!1s0x2dd77ddede3d136f:0xb0ce41f3663be129!8m2!3d-7.1667819!4d113.481364',
      menu: {
        title: 'Menu',
        image:
          'https://firebasestorage.googleapis.com/v0/b/temurasa-206af.appspot.com/o/restaurants%2Fwarung_asela_menu.jpeg?alt=media&token=b904a35c-a9a1-4ad8-9156-2080a4e91701',
      },
      image: [
        'https://firebasestorage.googleapis.com/v0/b/temurasa-206af.appspot.com/o/restaurants%2Fputri_restaurant2.jpeg?alt=media&token=2a6fe6fe-bf2c-47ce-86ee-9fc6165af0bf',
        'https://firebasestorage.googleapis.com/v0/b/temurasa-206af.appspot.com/o/restaurants%2Fputri_restaurant.jpeg?alt=media&token=e9a6ae0b-05eb-4c03-8af9-5c65f943ee67',
      ],
      ratingFix: 4.2,
      ratingCount: 100,
    },
    {
      name: 'RM Kaysa Putri',
      address: 'Jl. Raya Taddan Desa Taddan, Kecamatan, Kec. Camplong, Kabupaten Sampang, Jawa Timur',
      phone: '0812-XXXX-XXX',
      openHours: ['Open 9 AM - 9 PM'],
      location: mongoose.Types.ObjectId('63098571b1b38b3e3fb34d18'),
      foods: ['Rujak Cingur', 'Campur', 'Sate Lalat'],
      map: 'https://goo.gl/maps/TXsNsFCwhpHHjPq99',
      menu: {
        title: 'Menu',
        image:
          'https://firebasestorage.googleapis.com/v0/b/temurasa-206af.appspot.com/o/restaurants%2Fwarung_asela_menu.jpeg?alt=media&token=b904a35c-a9a1-4ad8-9156-2080a4e91701',
      },
      image: [
        'https://firebasestorage.googleapis.com/v0/b/temurasa-206af.appspot.com/o/restaurants%2Fmahkota_kaysa.jpeg?alt=media&token=47936685-ba2f-4736-b27f-1ba75304f8ce',
        'https://firebasestorage.googleapis.com/v0/b/temurasa-206af.appspot.com/o/restaurants%2Fmahkota_kaysa2.jpeg?alt=media&token=1838ccdc-866b-431a-8968-0d581f2d8ad3',
        'https://firebasestorage.googleapis.com/v0/b/temurasa-206af.appspot.com/o/restaurants%2Fmahkota_kaysa3.jpeg?alt=media&token=29e52983-17dc-48fa-b9b8-bd666c2f6b78',
      ],
      ratingFix: 4.3,
      ratingCount: 100,
    },
    {
      name: 'RM Kaysa Putri 2',
      address: 'Jl. Raya Taddan Desa Taddan, Kecamatan, Kec. Camplong, Kabupaten Sampang, Jawa Timur',
      phone: '0812-XXXX-XXX',
      openHours: ['Open 9 AM - 9 PM'],
      location: mongoose.Types.ObjectId('63098571b1b38b3e3fb34d18'),
      foods: ['Rujak Cingur', 'Campur', 'Sate Lalat'],
      map: 'https://goo.gl/maps/TXsNsFCwhpHHjPq99',
      menu: {
        title: 'Menu',
        image:
          'https://firebasestorage.googleapis.com/v0/b/temurasa-206af.appspot.com/o/restaurants%2Fwarung_asela_menu.jpeg?alt=media&token=b904a35c-a9a1-4ad8-9156-2080a4e91701',
      },
      image: [
        'https://firebasestorage.googleapis.com/v0/b/temurasa-206af.appspot.com/o/restaurants%2Fmahkota_kaysa3.jpeg?alt=media&token=29e52983-17dc-48fa-b9b8-bd666c2f6b78',
        'https://firebasestorage.googleapis.com/v0/b/temurasa-206af.appspot.com/o/restaurants%2Fmahkota_kaysa.jpeg?alt=media&token=47936685-ba2f-4736-b27f-1ba75304f8ce',
        'https://firebasestorage.googleapis.com/v0/b/temurasa-206af.appspot.com/o/restaurants%2Fmahkota_kaysa2.jpeg?alt=media&token=1838ccdc-866b-431a-8968-0d581f2d8ad3',
      ],
      ratingFix: 4.3,
      ratingCount: 100,
    },
  ];

  await Restaurant.collection.bulkWrite(
    restaurants.map((user) => ({
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

  const foodsPalembang = [
    {
      name: 'Rujak Cingur',
      description: `Cingur is taken from the Madurese regional language which means "mouth". This food has a salty taste, and is served with a variety of ingredients such as cucumber, jicama, young mango, plus rice cake, tofu, tempe, cingur, sprouts, water spinach, and long beans.`,
      image:
        'https://firebasestorage.googleapis.com/v0/b/temurasa-206af.appspot.com/o/foods%2Frujak_cingur.png?alt=media&token=2690598d-4547-40a7-9d1a-215c4ab8b9b6',
      likes: 100,
      location: mongoose.Types.ObjectId('63098571b1b38b3e3fb34d18'),
      tags: [mongoose.Types.ObjectId(foodCategories2[0].id), mongoose.Types.ObjectId(foodCategories2[4].id)],
    },
  ];

  res.status(httpStatus.CREATED).send();
});

module.exports = { food };
