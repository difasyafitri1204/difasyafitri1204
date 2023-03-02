function saveCategory(form) {
    console.log(form);
    ListCategory.inputCategory(form);
    ListCategory.showListCategory();
    }
    const dbCategory = {
        save(ListCategory2) {
            localStorage.setItem('ListCategory', JSON.stringify(ListCategory2));
        },
        get() {
            return JSON.parse(localStorage.getItem('ListCategory'));
        }
    }
    
    const ListCategory = {
    Category: {
        index: -1,
        names: null
    },
    ListCategory: [],
    inputCategory: function (form) {
        this.Category.index = form.index.value;
        this.Category.names = form.names.value;

        if(!this.Category.names) {
            alert('names Category tidak boleh kosong');
            return false
        }

        if(this.Category.index == -1) {
            this.ListCategory = this.ListCategory || [];
            this.ListCategory.push(copy(this.Category));
        } else {
            this.ListCategory[this.Category.index] = copy(this.Category)
        }
        dbCategory.save(this.ListCategory);
        this.resetFormCategory(form);
    },
        resetFormCategory: function(form) {
        this.Category.names =null;
        this.Category.index = -1;

        form.names.value = this.Category.names;
        form.index.value = this.Category.index;

        document.getElementById('btn-save-Category').innerHTML = 'save';
    },

    showListCategory: function(form) {
            this.ListCategory = dbCategory.get();
            const componentListCategory = document.getElementById('List-Category');
            componentListCategory.innerHTML = '';
            if (this.ListCategory === null) {
                console.log ('tidak memiliki data');
            } else {
                    this.ListCategory.forEach((Category, index) => {
                    componentListCategory.innerHTML +=  `<h2><div class="flex justify-center gap-5"> <div class="card-actions justify-end">${Category.names} <button
                    class="btn btn-accent btn-active" onclick="ListCategory.editCategory(${index})">Edit</button><button 
                    class="btn btn-accent btn-active" onclick="ListCategory.deleteCategory(${index})"> delete </button></div></div></h2>`;
                    });
            }
            
    },
    deleteCategory: function (index) {
        if(confirm('Apakah anda yakin ingin mengdelete Category ini?')) {
            this.ListCategory.splice(index, 1);
            dbCategory.save(this.ListCategory);
            this.showListCategory();
        }
    },
    editCategory: function (index) {
        const Category = this.ListCategory[index];
        const form = document.getElementById('form-Category');
        form.names.value = Category.names;
        form.index.value = index;

        document.getElementById('btn-save-Category').innerHTML = 'Edit';
    }
    }

    

    function copy(obj) {
        return JSON.parse(JSON.stringify(obj));
    }

    ListCategory.showListCategory();
