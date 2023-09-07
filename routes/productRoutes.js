import express from 'express'
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js'
import { brainTreePaymentController, brainTreeTokenController, createProductController, deleteProductController, getProductController, getSingleProductController, productCategoryController, productCountController, productFiltersController, productListController, productPhotoController, relatedProductController, searchProductController, updateProductController } from '../controllers/productController.js'
import formidable from 'express-formidable'

const router = express.Router()

//routes
//create product
router.post('/create-product', requireSignIn, isAdmin, formidable(), createProductController)

//update product
router.put('/update-product/:pid', requireSignIn, isAdmin, formidable(), updateProductController)

//get products
router.get("/get-product", getProductController)

//single Product
router.get("/get-product/:slug", getSingleProductController)

//get photo
router.get("/product-photo/:pid", productPhotoController)

//delete Product
router.delete("/delete-product/:pid", deleteProductController)
//filter Product
router.post("/product-filters", productFiltersController)

// count product
router.get("/product-count", productCountController)

//product per page
router.get("/product-list/:page", productListController)

//search product 
router.get("/search/:keyword", searchProductController)

//similar Product
router.get("/related-product/:pid/:cid", relatedProductController)

//category wise product
router.get("/product-category/:slug", productCategoryController)


//payment routes
//toekn
router.get("/braintree/token", brainTreeTokenController)

//payment
router.post("/braintree/payment", requireSignIn, brainTreePaymentController)

export default router