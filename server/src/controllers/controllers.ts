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
  const text = 'SELECT * FROM restaurants WHERE id = $1';
  const values = [req.params.id];
  try {
    const results = await db.query(text, values);
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
  const text =
    "INSERT INTO restaurants (name,location,price_range) VALUES ('$1', '$2', $3);";
  const values = [req.body.name, req.body.location, req.body.price_range];
  try {
    await db.query(text, values);
    res.status(201).json({
      status: 'success',
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error');
  }
};

export const updateRestaurant: RequestType = async (req, res, next) => {
  const text =
    "UPDATE restaurants SET name = '$1', location = '$2', price_range = $3 WHERE id = $4;";
  const values = [
    req.body.name,
    req.body.location,
    req.body.price_range,
    req.params.id,
  ];
  try {
    await db.query(text, values);
    res.status(200).json({
      status: 'success',
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error');
  }
};

export const deleteRestaurant: RequestType = async (req, res, next) => {
  const text = 'DELETE FROM restaurants WHERE id = $1;';
  const values = [req.params.id];
  try {
    await db.query(text, values);
    res.status(200).json({
      status: 'success',
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error');
  }
};
