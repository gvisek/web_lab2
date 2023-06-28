const express = require("express");
const router = express.Router();
const data = require("../data/mydata");
const categories = data.categories;
const session = require("express-session");


router.get("/", (req, res) => {
    req.session.cart = req.session.cart || [];
    res.render("home", {name : "Trgovina hranom i pićem", categorie : undefined, cart: req.session.cart});
});

router.get("/getCategories", (req, res) => {
    req.session.cart = req.session.cart || [];
    res.render("home", {name : "Trgovina hranom i pićem", categorie : undefined, cart: req.session.cart});
});

router.get("/getProducts/:id", (req, res) => {
    let categorie = categories.find((x) => x.id === req.params.id);
    let categoryName = findCategoryName(categorie.name);
    req.session.cart = req.session.cart || [];
    res.render("home", {categorie : categorie, name : categoryName, cart: req.session.cart});
});

router.get("/add/:id", (req, res) => {
    let selectedItem  = req.params.id;
    req.session.cart = req.session.cart || [];
    let item = req.session.cart.find((product) => product.id === selectedItem);
    if(item === undefined){
        req.session.cart.push({id: selectedItem, item: 1});
    }else{
        item.item += 1;
    }
    res.redirect(`/home/getProducts/${req.query.categoryId}`);
});

let findCategoryName = (categorie) => {
    if(categorie === "jela s rostilja"){
        return "Jela s roštilja";
    }else if(categorie === "riba"){
        return "Riba";
    }else if(categorie === "pizze"){
        return "Pizze";
    }else if(categorie === "prilozi"){
        return "Prilozi";
    }else if(categorie === "salate"){
        return "Salate";
    }else if(categorie === "deserti"){
        return "Deserti";
    }else if(categorie === "bezalkoholna_pica"){
        return "Bezalkoholna pića";
    }else if(categorie === "alkoholna_pica"){
        return "Alkoholna piĆa";
    }else if(categorie === "piva"){
        return "Piva";
    }else{
        return "Topli napitci";
    }
}

module.exports = router;