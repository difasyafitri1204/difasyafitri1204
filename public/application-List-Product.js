function saveProduct(form) {
    console.log(form);
    applicationListProduct.inputProduct(form);
    applicationListProduct.showListProduct();
}

const dbListProduct = {
    save(ListProduct2) {
        localStorage.setItem('ListProduct', JSON.stringify(ListProduct2));
    },
    get() {
        return JSON.parse(localStorage.getItem('ListProduct'));
    }
}

const dbCategory = {
    save(ListCategory2) {
        localStorage.setItem('ListCategory', JSON.stringify(ListCategory2));
    },
    get() {
        return JSON.parse(localStorage.getItem('ListCategory'));
    }
}

const chooseCategory = {

    showListCategory: function () {
        this.ListCategory = dbCategory.get()

        const listOption = document.getElementById('category');
            this.ListCategory.forEach((item) => {
            listOption.innerHTML += `<option>${item.names}</option>`
        })
    }
}

const applicationListProduct = {
    Product: {
        index: -1,
        category: null,
        product: null,
        price: null,
        stock: null,
        picture: null
    },
    
    ListProduct: [],
    inputProduct: function (form) {
        this.Product.index = form.index.value;
        this.Product.category = form.category.value;
        this.Product.product = form.product.value;
        this.Product.price = form.price.value;
        this.Product.stock = form.stock.value;
        this.Product.picture = form.picture.value;

        if(!this.Product.product) {
            alert('Product tidak boleh kosong');
            return false
        }
        if(!this.Product.price) {
            alert('price tidak boleh kosong');
            return false
        }
        if(!this.Product.stock) {
            alert('stock tidak boleh kosong');
            return false
        }
        if(!this.Product.picture) {
            alert('link picture tidak boleh kosong');
            return false
        }
        
        if(this.Product.index == -1) {
            this.ListProduct = this.ListProduct || [];
            this.ListProduct.push(copy(this.Product));
        } else {
            this.ListProduct[this.Product.index] = copy(this.Product)
        }
        dbListProduct.save(this.ListProduct);
        this.resetFormProduct(form);
    },
    
    resetFormProduct: function(form) {
        this.Product.product = null;
        this.Product.category = null;
        this.Product.price = null;
        this.Product.stock = null;
        this.Product.picture = null;
        this.Product.index = -1;

        form.product.value = this.Product.product;
        form.category.value = this.Product.category;
        form.price.value = this.Product.price;
        form.stock.value = this.Product.stock;
        form.picture.value = this.Product.picture;
        form.index.value = this.Product.index;

        document.getElementById('btn-save-Product').innerHTML = 'save';
    },
    showListProduct: function () {
        this.ListProduct = dbListProduct.get();
        const componentListProduct = document.getElementById('List-Product');
        componentListProduct.innerHTML = '';
        if (this.ListProduct === null) {
            console.log ('tidak ada data');
        } else {
            this.ListProduct.forEach((Product, index) => {
                componentListProduct.innerHTML +=  `<h4><div class="flex justify-center gap-5"> <div class="card-actions justify-end">${Product.category} <br> ${Product.product} <br> ${Product.price} <br> stock: ${Product.stock} <br> <img src="${Product.picture}" width= "100px"><button 
                class="btn btn-accent btn-active" onclick="applicationListProduct.editProduct(${index})">Edit</button><button 
                class="btn btn-accent btn-active" onclick="applicationListProduct.deleteProduct(${index})"> delete </button></div></div></h4>`;
            });
        }
       

    },
    deleteProduct: function (index) {
        if(confirm('Apakah anda yakin ingin menghaapus data ini?')) {
            this.ListProduct.splice(index, 1);
            dbListProduct.save(this.ListProduct);
            this.showListProduct();
        }
    },
    editProduct: function (index) {
        const Product = this.ListProduct[index];
        const form = document.getElementById('form-Product');
        form.product.value = Product.product;
        form.price.value = Product.price;
        form.stock.value = Product.stock;
        form.picture.value = Product.picture;
        form.index.value = index;


        document.getElementById('btn-save-Product').innerHTML = 'Edit';
    }
}

   

function copy(obj) {
    return JSON.parse(JSON.stringify(obj));
}

applicationListProduct.showListProduct();
chooseCategory.showListCategory();
