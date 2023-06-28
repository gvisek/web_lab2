const express = require("express");
const router = express.Router();
//const session = require("express-session");
const data = require("../data/mydata");

router.get("/", (req, res) => {
    req.session.cart = req.session.cart || [];
    res.render("cart", { cart: req.session.cart, data: data });
});

router.get("/getAll", (req, res) => {
    req.session.cart = req.session.cart || [];
    res.render("cart", { cart: req.session.cart, data: data });
});

router.get("/add/:id", (req, res) => {
    let selectedItem  = req.params.id;
    req.session.cart = req.session.cart || [];
    let exists;
    for(categorie of data.categories){
        exists = categorie.products.find((x) => x.id === selectedItem);
        if(exists){
            break;
        }
    }
    if(exists === undefined){
        res.status(404).send("Error 404: Item Doesn't Exist");
    }
    let item = req.session.cart.find((product) => product.id === selectedItem);
    if(item === undefined){
        req.session.cart.push({id: selectedItem, item: 1});
    }else{
        item.item += 1;
    }
    res.redirect("/cart/getAll");
});

router.get("/remove/:id", (req,res) => {
    let selectedItem  = req.params.id;
    req.session.cart = req.session.cart || [];
    let item = req.session.cart.find((product) => product.id === selectedItem);
    for(categorie of data.categories){
        exists = categorie.products.find((x) => x.id === selectedItem);
        if(exists){
            break;
        }
    }
    if(exists === undefined){
        res.status(404).send("Error 404: Item Doesn't Exist");
    }
    if(item === undefined){
        res.redirect("/cart/getAll");
    }else if(item.item === 0){
        res.redirect("/cart/getAll");
    }else{
        item.item -= 1;
    }
    req.session.cart = req.session.cart.filter((product) => product.item !== 0);
    res.redirect("/cart/getAll");
});



module.exports = router;