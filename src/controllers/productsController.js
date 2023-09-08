const fs = require('fs');
const path = require('path');
const { validationResult } = require("express-validator")

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');

const productsController = {

	/* Traigo todos los productos */

	index: (req, res) => {

		const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

		res.render("products", { products })
	},
	detail: (req, res) => {

		/* Traigo productos de manera individual */

		const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
		let id = req.params.id
		let product = products.find(product => product.id == id)
		res.render('detail', {
			product
		})
	},

	/* Ir al formulario de creación de producto */

	create: (req, res) => {

		res.render("product-create-form")
	},

	//Crear un nuevo producto

	store: (req, res) => {


		const resultValidation = validationResult(req);
		// Si hay errores: 
		if (resultValidation.errors.length > 0) {
			res.render("product-create-form", {
				// Convierto el array en Objeto literal
				errors: resultValidation.mapped(),
				oldData: req.body
			})

		} else {


			/*Actualizo la información con el producto nuevo y lo guardamos en el  JSON */
			const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

			/* Producto nuevo */

			let productoNuevo = {
				id: products[products.length - 1].id + 1,
				name: req.body.name,
				price: parseInt(req.body.price),
				discount: parseInt(req.body.discount),
				category: req.body.category,
				description: req.body.description,
				image: req.file ? req.file.filename : "default-image.png"

			}

			products.push(productoNuevo);

			/* Recovertir a JSON */

			let productsJson = JSON.stringify(products, null, " ");

			/* Escribir en el archivo JSON */

			fs.writeFileSync(productsFilePath, productsJson)


			res.redirect("/products")


		}

	},

	edit: (req, res) => {

		const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

		let id = req.params.id;
		let productToEdit = products.find(product => product.id == id)

		res.render("product-edit-form", { productToEdit })

	},

	update: (req, res) => {

		let id = req.params.id;

		/*Actualizo la información con el producto editado y lo guardamos en el  JSON */
		const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

		/* Me aseguro que el producto  a editar siga teniendo la misma imagen */

		let productWithoutEdit = products.find(product => product.id == id);

		/* Editar producto */

		let productoEditado = {
			id: id,
			name: req.body.name,
			price: parseInt(req.body.price),
			discount: parseInt(req.body.discount),
			category: req.body.category,
			description: req.body.description,
			image: req.file ? req.file.filename : productWithoutEdit.image

		}

		/* Reemplazar el producto en el array */

		let indice = products.findIndex(product => {

			return product.id == id;
		})

		products[indice] = productoEditado;

		/* Recovertir a JSON */

		let productsJson = JSON.stringify(products, null, " ");

		/* Escribir en el archivo JSON */

		fs.writeFileSync(productsFilePath, productsJson)


		res.redirect("/products")
	},

	destroy: (req, res) => {

		let id = req.params.id;

		const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

		/* Traigo todos los productos menos el que quiero eliminar */

		let finalProducts = products.filter(product => {

			return product.id != id
		})

		let productsJson = JSON.stringify(finalProducts, null, " ");

		fs.writeFileSync(productsFilePath, productsJson);

		res.redirect("/products")
	}



}

module.exports = productsController;