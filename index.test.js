const request = require("supertest");
const app = require("./src/app"); // Assuming your Express app is in src/app.js
const { Restaurant } = require("./src/models"); // Import your Restaurant model

describe("Restaurants API", () => {
  // Test for GET /restaurants - Status code 200
  it("should return status code 200 for GET /restaurants", async () => {
    const res = await request(app).get("/restaurants");
    expect(res.statusCode).toBe(200);
  });

  // Test for GET /restaurants - Returns an array of restaurants
  it("should return an array of restaurants", async () => {
    const res = await request(app).get("/restaurants");
    expect(Array.isArray(res.body)).toBe(true);
  });

  // Test for GET /restaurants - Returns the correct number of restaurants
  it("should return the correct number of restaurants", async () => {
    const restaurantCount = await Restaurant.count();
    const res = await request(app).get("/restaurants");
    expect(res.body.length).toBe(restaurantCount);
  });

  // Test for GET /restaurants - Returns correct restaurant data
  it("should return correct restaurant data", async () => {
    const restaurant = await Restaurant.findOne();
    const res = await request(app).get("/restaurants");
    expect(res.body[0].name).toBe(restaurant.name);
    expect(res.body[0].location).toBe(restaurant.location);
  });

  // Test for GET /restaurants/:id - Returns correct restaurant by ID
  it("should return correct restaurant data for GET /restaurants/:id", async () => {
    const restaurant = await Restaurant.findOne();
    const res = await request(app).get(`/restaurants/${restaurant.id}`);
    expect(res.body.name).toBe(restaurant.name);
    expect(res.body.location).toBe(restaurant.location);
  });

  // Test for POST /restaurants - Restaurant array is updated
  it("should update restaurant array when POST /restaurants", async () => {
    const newRestaurant = {
      name: "New Spot",
      location: "Uptown",
      cuisine: "Thai",
    };
    const res = await request(app).post("/restaurants").send(newRestaurant);
    expect(res.body).toEqual(
      expect.arrayContaining([expect.objectContaining(newRestaurant)])
    );
  });

  // Test for PUT /restaurants/:id - Updates restaurant data
  it("should update the restaurant when PUT /restaurants/:id", async () => {
    const restaurant = await Restaurant.findOne();
    const updatedData = { name: "Updated Restaurant" };
    const res = await request(app)
      .put(`/restaurants/${restaurant.id}`)
      .send(updatedData);
    expect(res.body.name).toBe(updatedData.name);
  });

  // Test for DELETE /restaurants/:id - Deletes the restaurant
  it("should delete the restaurant when DELETE /restaurants/:id", async () => {
    const restaurant = await Restaurant.create({
      name: "Temporary",
      location: "City",
      cuisine: "Fast Food",
    });
    const res = await request(app).delete(`/restaurants/${restaurant.id}`);
    expect(res.statusCode).toBe(200);

    const deletedRestaurant = await Restaurant.findByPk(restaurant.id);
    expect(deletedRestaurant).toBeNull();
  });
});
