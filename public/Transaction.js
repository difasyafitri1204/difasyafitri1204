    
            function saveTransaction(form) {
                console.log(form);
                ListTransaction.inputTransaction(form);
                ListTransaction.showListTransaction();
            
            }
            function save() {
                ListTransaction.showMultiplication();
                ListTransaction.showReduction();
            }
            
            const dbTransaction = {
                save(ListTransaction2) {
                    localStorage.setItem('ListTransaction', JSON.stringify(ListTransaction2));
                },
                get () {
                    return JSON.parse(localStorage.getItem('ListTransaction'));
                }
            }
            const dbListProduct = {
                save(ListProduct2) {
                    localStorage.setItem('ListProduct', JSON.stringify(ListProduct2));
                },
                get() {
                    return JSON.parse(localStorage.getItem('ListProduct'));
                }
            }
            const dbConsumer = {
                save(dfConsumer2) {
                    localStorage.setItem('dfConsumer', JSON.stringify(dfConsumer2));
                },
                get () {
                    return JSON.parse(localStorage.getItem('dfConsumer'));
                }
            }
            const ListTransaction = {
                Transaction: {
                    index: -1,
                    consumer: null,
                    product: null,
                    price: null,
                    stock: null,
                    pictures: null,
                    amount: null,
                    total: null,
                    cash: null,
                    changes: null
                },
                ListTransaction: [],
                inputTransaction: function (form) {
                    this.Transaction.index = form.index.value;
                    this.Transaction.consumer = form.consumer.value;
                    this.Transaction.product = form.product.value;
                    this.Transaction.price = form.price.value;
                    this.Transaction.stock = form.stock.value;
                    this.Transaction.pictures = form.pictures.value;
                    this.Transaction.amount = form.amount.value;
                    this.Transaction.total = form.total.value;
                    this.Transaction.cash = form.cash.value;
                    this.Transaction.changes = form.changes.value;
            
                    if(!this.Transaction.product) {
                        alert('Product tidak boleh kosong');
                        return false
                    }
                    if(!this.Transaction.price) {
                        alert('price tidak boleh kosong');
                        return false
                    }
                    if(!this.Transaction.stock) {
                        alert('stock tidak boleh kosong');
                        return false
                    }
                    if(!this.Transaction.pictures) {
                        alert('link pictures tidak boleh kosong');
                        return false
                    }
                    if(!this.Transaction.amount) {
                        alert('link amount tidak boleh kosong');
                        return false
                    }
                    if(!this.Transaction.total) {
                        alert('link total tidak boleh kosong');
                        return false
                    }
                    if(!this.Transaction.cash) {
                        alert('link cash tidak boleh kosong');
                        return false
                    }
                    if(!this.Transaction.changes) {
                        alert('link changes tidak boleh kosong');
                        return false
                    }
                    
                    if(this.Transaction.index == -1) {
                        this.ListTransaction = this.ListTransaction || [];
                        this.ListTransaction.push(copy(this.Transaction));
                    } else {
                        this.ListTransaction[this.Transaction.index] = copy(this.Transaction)
                    }
                    dbTransaction.save(this.ListTransaction);
                    this.resetFormTransaction(form);
                },
                
                resetFormTransaction: function(form) {
                    this.Transaction.product =null;
                    this.Transaction.consumer = null,
                    this.Transaction.price = null;
                    this.Transaction.stock = null;
                    this.Transaction.pictures = null;
                    this.Transaction.amount = null;
                    this.Transaction.total = null;
                    this.Transaction.cash = null;
                    this.Transaction.changes = null;
                    this.Transaction.index = -1;
            
                    form.product.value = this.Transaction.product;
                    form.consumer.value = this.Transaction.consumer;
                    form.price.value = this.Transaction.price;
                    form.stock.value = this.Transaction.stock;
                    form.pictures.value = this.Transaction.pictures;
                    form.amount.value = this.Transaction.amount;
                    form.total.value = this.Transaction.total;
                    form.cash.value = this.Transaction.cash;
                    form.changes.value = this.Transaction.changes;
                    form.index.value = this.Transaction.index;
            
                    document.getElementById('btn-save-Transaction').innerHTML = 'save';
                },
                showListTransaction: function () {
                    this.ListTransaction = dbTransaction.get();
                    const componentListTransaction = document.getElementById('List-Transaction');
                    
                    componentListTransaction.innerHTML = '';
                    if (this.ListTransaction === null) {
                        console.log ('gak ada data');
                    } else {
                        this.ListTransaction.forEach((Transaction, index) => {
                        componentListTransaction.innerHTML +=  `<h4><div class="flex justify-center gap-5"> <div class="card-actions justify-end"> ${Transaction.consumer} <br> ${Transaction.product} <br>
                            price: ${Transaction.price} <br> stock: ${Transaction.stock} <br> amount: ${Transaction.amount}  <br> Total: ${Transaction.total} <br> cash: 
                            ${Transaction.cash} <br> changes: ${Transaction.changes}  <img src="${Transaction.pictures}" width= "100px"></div></div></h4>`;
                        });
                        
                    }
                    
                },
                showMultiplication: function multiplication() {
                    var txtFirstNumberValue = document.getElementById('price').value;
                    var txtSecondNumberValue = document.getElementById('amount').value;
                    var result = parseInt(txtFirstNumberValue) * parseInt(txtSecondNumberValue);
                    if (!isNaN(result)) {
                        document.getElementById('total').value = result;
                        }
                },
                showReduction: function reduction() {
                    var txtFirstNumberValue = document.getElementById('cash').value;
                    var txtSecondNumberValue = document.getElementById('total').value;
                    var result = parseInt(txtFirstNumberValue) - parseInt(txtSecondNumberValue);
                    if (!isNaN(result)) {
                        document.getElementById('changes').value = result;
                        }
                }
                
            }
            const chooseConsumer = {
            showListConsumer: function () {
            this.dfConsumer = dbConsumer.get();
    
            const listOption = document.getElementById('consumer');
            if (this.dfConsumer === null){
                this.dfConsumer =[];
            } else {
                this.dfConsumer.forEach((item) => {
                listOption.innerHTML += `<option>${item.names}</option>`
                })
            }
           
        }
    
    }
            const chooseProduct = {

            showListProduct: function () {
            this.ListProduct = dbListProduct.get();
    
            const listOption = document.getElementById('list-option');
                this.ListProduct.forEach((item) => {
                listOption.innerHTML += `<option data-product="${item.product}" data-price=${item.price} 
                data-stock=${item.stock} data-pictures=${item.picture}>${item.product}</option>`
            })
            }
    
        }
        $('#list-option').on('change', function(){
            // ambil data dari elemen option yang dichoose
            const product = $('#list-option option:selected').data('product');
            const price = $('#list-option option:selected').data('price');
            const stock = $('#list-option option:selected').data('stock');
            const picture = $('#list-option option:selected').data('pictures');
            
            
            // tampilkan data ke element
            $('[name=product]').val(product);
            $('[name=price]').val(price);
            $('[name=stock]').val(stock);
            $('[name=pictures]').val(picture);
            
          });
        
            function copy(obj) {
                return JSON.parse(JSON.stringify(obj));
            }
    
                
            ListTransaction.showListTransaction();
            chooseProduct.showListProduct();
            chooseConsumer.showListConsumer();