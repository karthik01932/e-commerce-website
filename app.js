const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const sequelize = require('./util/datebase');
const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');


const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');



app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req,res,next)=>{
    const id = req.body.id;
    User.findAll({where:{id:id}})
    .then(user =>{
        req.user = user;
        next();
    })
    .catch(err=>{
        console.log(err);
    })
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

Product.belongsTo(User,{constraints: true, onDelete: 'CASCADE'});
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product,{ through: CartItem});
Product.belongsToMany(Cart,{ through: CartItem});

 
sequelize
    .sync()
    .then(result =>{
        const data = (req,res,next)=>{
            const id = req.body.id;
            return User.findAll({where:{id:id}})
        }
    })
    .then((user)=>{
        if(!user){
            return User.create({name: 'Test', email: 'test@test.com'});
        }
        return user;
    })
    .then(user =>{
        // console.log(user);
        return user.createCart();
    })   
    .then(cart =>{
        app.listen(4000);
    }) 
    .catch(err => {
        console.log(err);
    })    

