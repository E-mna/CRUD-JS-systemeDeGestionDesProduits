// get total: fonction pour calculer le total 
// get product: fonction pour créer un produit 
// save localStorage :function pour enregistrer les données dans localStorage
// clear inputs : function qui nettoie les input pour que je pourrai taper d'autre infos
// read : quand j'appuie sur le button créer il m'affiche les infos dans le tableau
// count : le nombre des produits créer
// delete
// update
// search
//clean data

// j'appelle mes inputs 
// j'appelle mes inputs 
let title = document.querySelector('#title');
let price = document.querySelector('#price');
let taxes = document.querySelector('#taxes');
let ads = document.querySelector('#ads');
let discount = document.querySelector('#discount');
let total = document.querySelector('#total');
let count = document.querySelector('#count');
let category = document.querySelector('#category');
let submit = document.querySelector('#submit');
let doubleBtn = 'create';
let dummy;



//je vérifie que tout le monde est présent 
//console.log(title,price,taxes,ads, discount, total,count,category,submit)

//get total
function getTotal()
{
    if(price.value != ''){
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.background = '#040';
    }else{
        total.innerHTML = '';
        total.style.background = 'rgb(141, 28, 28)';
    }
}


// get product
let dataProduct;
if(localStorage.product != null){                      
    dataProduct = JSON.parse(localStorage.product)
}else{
    dataProduct = [];
}


submit.onclick = function(){
    let newProduct ={
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase()
    }
    if(doubleBtn === 'create'){
        
        if(newProduct.count > 1){
        for(let i = 0; i < newProduct.count; i++){
            dataProduct.push(newProduct);   //j'ajoute mon objet à mon tableau
        }
    }else{
             dataProduct.push(newProduct); 
    }
    }else{
          dataProduct[ dummy ] = newProduct
          doubleBtn = 'create';
          submit.innerHTML = 'Créer';
          count.style.display = 'block';
    }
    
    
    // save localStorage
    localStorage.setItem('product',   JSON.stringify(dataProduct))
    //console.log(newProduct)

    clearData(); 
    showData();
}


// clear inputs
function clearData(){
   title.value = '';
   price.value = '';
   taxes.value = '';
   ads.value = '';
   discount.value = '';
   total.innerHTML = '';
   count.value = '';
   category.value = '';
}


// read
function showData()
{
  getTotal();
  let table = '';
  for(let i = 0; i < dataProduct.length; i++ ){   // ce for pour récupérer les produit de mon arary et l'ajouter dans le table
     table += `
                <tr>
                            <td>${i}</td>
                            <td>${dataProduct[i].title}</td>
                            <td>${dataProduct[i].price}</td>
                            <td>${dataProduct[i].taxes}</td>
                            <td>${dataProduct[i].ads}</td>
                            <td>${dataProduct[i].discount}</td>
                            <td>${dataProduct[i].total}</td>
                            <td>${dataProduct[i].category}</td>
                            <td> <button onclick="updateData( ${i} )" id="uptade">modifier</button> </td>
                            <td> <button onclick="deleteData( ${i} )" id="delete">supprimer</button> </td>
                        </tr> 
              ` 
  }
   document.querySelector('#tbody').innerHTML = table;
}
showData()


//delete
function deleteData(i)
{
  dataProduct.splice(i,1);                            // supprimer du Array
  localStorage.product = JSON.stringify(dataProduct); // supprimer de localStorage
  showData()
}


//counter : j'ai ajouter une condition dans la function submit
// S'il s'agit plus d'un produit > 1 
//loop répète le nombre (valeur count) du produit qui est taper par l'utilisateur.
//sinon il va creer un seul produit(quand la valeur count est < 1)


//update
function updateData(i){
  title.value = dataProduct[i].title;
  price.value = dataProduct[i].price;
  taxes.value = dataProduct[i].taxes;
  ads.value = dataProduct[i].ads;
  discount.value = dataProduct[i].discount;
  getTotal();
  count.style.display = 'none';
  category.value = dataProduct[i].category;
  submit.innerHTML = 'Modifier';
  doubleBtn ='update';
  dummy = i; 
  scroll({
      top:0,
      behavior: "smooth",
  })
}


//search
let searchDouble = 'title';

function getSearch(id)
{
   let search = document.querySelector('#search')
   if(id == 'searchTitle'){
       searchDouble ='title';
   }else{
       searchDouble ='category';
   }
   search.placeholder = 'Rechercher par ' + searchDouble;
    search.focus()
    search.value = '';
    showData()
}

function searchData(value)
{  
    let table =  '';
    for(let i = 0; i < dataProduct.length ; i++){
    if(searchDouble == 'title')
    {
           if(dataProduct[i].title.includes(value.toLowerCase())){
                   table += `
                                <tr>
                                        <td>${i}</td>
                                        <td>${dataProduct[i].title}</td>
                                        <td>${dataProduct[i].price}</td>
                                        <td>${dataProduct[i].taxes}</td>
                                        <td>${dataProduct[i].ads}</td>
                                        <td>${dataProduct[i].discount}</td>
                                        <td>${dataProduct[i].total}</td>
                                        <td>${dataProduct[i].category}</td>
                                        <td> <button onclick="updateData( ${i} )" id="uptade">modifier</button> </td>
                                        <td> <button onclick="deleteData( ${i} )" id="delete">supprimer</button> </td>
                                </tr> 
                          `
           }
    }else{
           if(dataProduct[i].category.includes(value.toLowerCase())){
                   table += `
                                <tr>
                                        <td>${i}</td>
                                        <td>${dataProduct[i].title}</td>
                                        <td>${dataProduct[i].price}</td>
                                        <td>${dataProduct[i].taxes}</td>
                                        <td>${dataProduct[i].ads}</td>
                                        <td>${dataProduct[i].discount}</td>
                                        <td>${dataProduct[i].total}</td>
                                        <td>${dataProduct[i].category}</td>
                                        <td> <button onclick="updateData( ${i} )" id="uptade">modifier</button> </td>
                                        <td> <button onclick="deleteData( ${i} )" id="delete">supprimer</button> </td>
                                </tr> 
                            `
           }
    }
    document.querySelector('#tbody').innerHTML = table;
}
}