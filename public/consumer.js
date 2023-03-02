function saveConsumer(form) {
    console.log(form);
    ListConsumer.inputConsumer(form);
    ListConsumer.showListConsumer();
}
const dbConsumer = {
    save(dfConsumer2) {
        localStorage.setItem('dfConsumer', JSON.stringify(dfConsumer2));
    },
    get () {
        return JSON.parse(localStorage.getItem('dfConsumer'));
    }
}
const ListConsumer = {
Consumer: {
    index: -1,
    names: null,
    address: null,
    no: null,
    email: null
},
dfConsumer: [],
inputConsumer: function (form) {
    this.Consumer.index = form.index.value;
    this.Consumer.names = form.names.value;
    this.Consumer.address = form.address.value;
    this.Consumer.no = form.no.value;
    this.Consumer.email = form.email.value;

    if(!this.Consumer.names) {
        alert('names tidak boleh kosong');
        return false
    }
    if(!this.Consumer.address) {
        alert('address tidak boleh kosong');
        return false
    }
    if(!this.Consumer.no) {
        alert('No.Hp tidak boleh kosong');
        return false
    }
    if(!this.Consumer.email) {
        alert('email tidak boleh kosong');
        return false
    }
    
    if(this.Consumer.index == -1) {
        this.dfConsumer = this.dfConsumer || [];
        this.dfConsumer.push(copy(this.Consumer));
    } else {
        this.dfConsumer[this.Consumer.index] = copy(this.Consumer)
    }
    dbConsumer.save(this.dfConsumer);
    this.resetFormConsumer(form);
},

resetFormConsumer: function(form) {
    this.Consumer.names =null;
    this.Consumer.address = null;
    this.Consumer.no = null;
    this.Consumer.email = null;
    this.Consumer.index = -1;

    form.names.value = this.Consumer.names;
    form.address.value = this.Consumer.address;
    form.no.value = this.Consumer.no;
    form.email.value = this.Consumer.email;
    form.index.value = this.Consumer.index;

    document.getElementById('btn-save-Consumer').innerHTML = 'save';
},
showListConsumer: function () {
        this.dfConsumer = dbConsumer.get();
        const componentListConsumer = document.getElementById('List-Consumer');
        componentListConsumer.innerHTML = '';
        if (this.dfConsumer === null) {
            console.log ('data nothing');
        } else {
                this.dfConsumer.forEach((Consumer, index) => {
                componentListConsumer.innerHTML +=  `<h4><div class="flex justify-center gap-5"> <div class="card-actions justify-end">${Consumer.names} <br> ${Consumer.address} <br> no.hp: ${Consumer.no} <br>${Consumer.email} <button 
                class="btn btn-accent btn-active" onclick="ListConsumer.editConsumer(${index})">Edit</button><button 
                class="btn btn-accent btn-active" onclick="ListConsumer.deleteConsumer(${index})"> delete </button></div></div></h4>`;
                });
        }   
},
deleteConsumer: function (index) {
    if(confirm('Apakah anda yakin ingin menghaapus data ini?')) {
        this.dfConsumer.splice(index, 1);
        dbConsumer.save(this.dfConsumer);
        this.showListConsumer();
    }
},
editConsumer: function (index) {
   
        const Consumer = this.dfConsumer[index];
        const form = document.getElementById('form-Consumer');
        form.index.value = index;
        form.names.value = Consumer.names;
        form.address.value = Consumer.address;
        form.no.value = Consumer.no;
        form.email.value = Consumer.email;

    document.getElementById('btn-save-Consumer').innerHTML = 'Edit';
    }
    }

    function copy(obj) {
        return JSON.parse(JSON.stringify(obj));
    }

    ListConsumer.showListConsumer();
