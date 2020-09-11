import express from 'express';
import db from '../db';

type RequestType = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => void;

export const getRestaurants: RequestType = async (req, res, next) => {
  try {
    const results = await db.query('SELECT * FROM restaurants');
    res.status(200).json({
      status: 'success',
      results: results.rows.length,
      data: {
        restaurants: results.rows,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error');
  }
};

export const getRestaurant: RequestType = async (req, res, next) => {
  try {
    const results = await db.query(
      `SELECT * FROM restaurants WHERE id = ${req.params.id}`
    );
    res.status(200).json({
      status: 'success',
      data: {
        restaurant: results.rows,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error');
  }
};

export const createRestaurant: RequestType = async (req, res, next) => {
  try {
    const results = await db.query(
      `INSERT INTO restaurants
        (name,location,price_range)
      VALUES
        ('${req.body.name}', '${req.body.location}', ${req.body.price_range});`
    );
    res.status(201).json({
      status: 'success',
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error');
  }
};

export const updateRestaurant: RequestType = async (req, res, next) => {
  try {
    await db.query(`
      UPDATE restaurants
      SET name = '${req.body.name}',
          location = '${req.body.location}',
          price_range = ${req.body.price_range}
      WHERE id = ${req.params.id};
    `);
    res.status(200).json({
      status: 'success',
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error');
  }
};

export const deleteRestaurant: RequestType = async (req, res, next) => {
  try {
    await db.query(`
      DELETE FROM restaurants
      WHERE id = ${req.params.id};
    `);
    res.status(200).json({
      status: 'success',
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error');
  }
};
