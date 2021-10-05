const express = require('express');
const productRouter = express.Router();
const Products = require('../models/products.js')
const defaultProducts = require('../models/default.js')
var customer = [
];


// Index

productRouter.get('/' , (req, res) => {
    res.render('welcome.ejs', {
        customer,
    });
  });

  productRouter.get('/menu' , (req, res) => {
    res.render('index.ejs', {
        customer: customer,
    });
  });

  productRouter.get('/yourOrder', (req, res) => {
	Products.find({}, (error, allProducts) => {
		res.render('order.ejs', {
			product: allProducts,
            customer,
		});
	});
});

// New
productRouter.get('/new', (req, res) => {
	res.render('new.ejs', {
        defaultProduct: defaultProducts[req.params.id],
    product: Products,
    });
});
// Delete
productRouter.delete('/yourOrder/:id', (req, res) => {
    Products.findByIdAndRemove(req.params.id, (err, data) => {
        res.redirect('/hyperBean/yourOrder');
    });
});
// Update
productRouter.post('/menu', (req,res) => {
    // console.log(req.body);
    // console.log(customer);
    customer.push(req.body.customer);
    res.redirect('/hyperBean/menu')
});


// Create
productRouter.post("/yourOrder", (req,res)=>{
    // original res.send to send body
    // res.send(req.body);
    Products.create(req.body, (error, createdProduct)=>{
        console.log(error);
        res.redirect('/hyperBean/yourOrder');
    });
});
// Edit
// productRouter.get('/:id/edit', (req, res) => {     
// 	Products.findById(req.params.id, (error, foundProduct) => {
// 		res.render('edit.ejs', {
//             defaultProduct: defaultProducts[req.params.id],
// 			product: foundProduct
// 		});
// 	});
// });

// Show
productRouter.get('/:id', (req, res) => {
    res.render('show.ejs', { defaultProduct: defaultProducts[req.params.id],
    product: Products,
    });
  });



module.exports = productRouter;