const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const docsRoute = require('./docs.route');
const migrationRoute = require('./migration.route');
const locationRoute = require('./location.route');
const restaurantRoute = require('./restaurant.route');
const foodRoute = require('./food.route');
const imageRoute = require('./image.route');
const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/images',
    route: imageRoute,
  },
  {
    path: '/locations',
    route: locationRoute,
  },
  {
    path: '/foods',
    route: foodRoute,
  },
  {
    path: '/restaurants',
    route: restaurantRoute,
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
  {
    path: '/migration',
    route: migrationRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
