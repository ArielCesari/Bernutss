const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');


const mainController = {

     // Traigo todos los productos y los filtro por categoria.
    index: (req, res) => {

       

        const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

        const visited = products.filter(function (product) {
            return product.category == 'visited'
        })
        const inSale = products.filter(function (product) {
            return product.category == 'in-sale'
        })

        res.render("index", { visited, inSale });
    },

       // Buscador
    search: (req, res) => {

        const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
		let search = req.query.keywords;
		let productsToSearch = products.filter(product => product.name.toLowerCase().includes(search));	
		res.render('results', { 
			products: productsToSearch, 
			search
		});
	}

}


module.exports = mainController