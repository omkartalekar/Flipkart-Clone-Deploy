import express from  'express';
import { getProductById, getProducts } from '../controller/product-controller.js';
import { userSignUp, userLogIn } from '../controller/user-controller.js';
import { addItemInCart } from '../controller/cart-controller.js';
import { createOrder } from '../controller/payment-controller.js';
import { payOrder } from '../controller/payment-controller.js';
import { paymentResponse } from '../controller/payment-controller.js';


const router = express.Router();

const baseApiUrl = "https://flipkart-clone-kcxs.onrender.com";

// Login & signup
router.post(`${baseApiUrl}/signup`, userSignUp);
router.post(`${baseApiUrl}/login`, userLogIn);

router.get(`${baseApiUrl}/products`, getProducts);
router.get(`${baseApiUrl}/product/:id`, getProductById);

router.post(`${baseApiUrl}/cart/add`, addItemInCart);

router.get(`${baseApiUrl}/get-razorpay-key`, (req, res) => {
  res.send({
    key: process.env.RAZORPAY_KEY_ID,
  });
});

router.post(`${baseApiUrl}/create-order`, createOrder);
router.post(`${baseApiUrl}/pay-order`, payOrder);
router.get(`${baseApiUrl}/pay-res`, paymentResponse);

export default router;