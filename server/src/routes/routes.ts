import express from 'express';
import {
  getRestaurant,
  createRestaurant,
  deleteRestaurant,
  getRestaurants,
  updateRestaurant,
} from '../controllers/controllers';

const router = express.Router();

router.get('/', getRestaurants);
router.get('/:id', getRestaurant);
router.post('/', createRestaurant);
router.put('/:id', updateRestaurant);
router.delete('/:id', deleteRestaurant);

export default router;
