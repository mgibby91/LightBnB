const properties = require('./json/properties.json');
const users = require('./json/users.json');
const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {

  const values = [email];

  return pool.query(`
  SELECT *
  FROM users
  WHERE email = $1
  `, values)
    .then(res => {
      if (!res.rows.length) {
        return null;
      }
      console.log(res.rows);
      return res.rows[0];
    })
    .catch(err => {
      console.log('error!', err);
    });

  // let user;
  // for (const userId in users) {
  //   user = users[userId];
  //   if (user.email.toLowerCase() === email.toLowerCase()) {
  //     break;
  //   } else {
  //     user = null;
  //   }
  // }
  // return Promise.resolve(user);
}
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {

  const values = [id];

  return pool.query(`
  SELECT *
  FROM users
  WHERE id = $1
  `, values)
    .then(res => {
      if (!res.rows.length) {
        return null;
      }
      return res.rows[0];
    })
    .catch(err => {
      console.log('error!', err);
    });


  // return Promise.resolve(users[id]);
}
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser = function(user) {

  // console.log(users);
  const values = [user.name, user.email, user.password]
  console.log(values);

  return pool.query(`
  INSERT INTO users (name, email, password)
  VALUES
  ($1, $2, $3)
  RETURNING *;
  `, values)
    .then(res => {
      return res.rows;
    })
    .catch(err => {
      console.log(err);
    })


  // const userId = Object.keys(users).length + 1;
  // user.id = userId;
  // users[userId] = user;
  // return Promise.resolve(user);
}
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {

  const values = [guest_id, limit]

  return pool.query(`
  SELECT properties.id, properties.title, properties.cost_per_night, reservations.start_date, avg(property_reviews.rating) as average_rating
  FROM properties
  JOIN reservations ON properties.id = property_id
  JOIN property_reviews ON reservations.id = reservation_id
  JOIN users on property_reviews.guest_id = users.id
  WHERE users.id = $1
  GROUP BY reservations.start_date, properties.id
  ORDER BY start_date
  LIMIT $2
  `, values)
    .then(res => {
      console.log(res.rows);
      return res.rows;
    })
    .catch(err => {
      console.log(err);
    })


  // return getAllProperties(null, 2);
}
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function(options, limit = 10) {

  // 1
  const queryParams = [];
  // 2
  let queryString = `
   SELECT properties.*, avg(property_reviews.rating) as average_rating
   FROM properties
   JOIN property_reviews ON properties.id = property_id
   `;

  // 3
  if (options.city) {
    queryParams.push(`%${options.city}%`);
    queryString += `WHERE city LIKE $${queryParams.length} AND `;
  }
  if (options.owner_id) {
    queryParams.push(`${Number(options.owner_id)}`);
    queryString += `properties.owner_id = $${queryParams.length} AND `;
  }
  if (options.minimum_price_per_night) {
    queryParams.push(`${Number(options.minimum_price_per_night)}`);
    queryString += `properties.cost_per_night > $${queryParams.length} AND `;
  }
  if (options.maximum_price_per_night) {
    queryParams.push(`${Number(options.maximum_price_per_night)}`);
    queryString += `properties.cost_per_night < $${queryParams.length} AND `;
  }
  if (options.minimum_rating) {
    queryParams.push(`${Number(options.minimum_rating)}`);
    queryString += `property_reviews.rating > $${queryParams.length}`;
  }


  // 4
  queryParams.push(limit);
  queryString += `
   GROUP BY properties.id
   ORDER BY cost_per_night
   LIMIT $${queryParams.length};
   `;

  // 5
  console.log(queryString, queryParams);

  // 6
  return pool.query(queryString, queryParams)
    .then(res => res.rows);


}
exports.getAllProperties = getAllProperties;




/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  const propertyId = Object.keys(properties).length + 1;
  property.id = propertyId;
  properties[propertyId] = property;
  return Promise.resolve(property);
}
exports.addProperty = addProperty;
