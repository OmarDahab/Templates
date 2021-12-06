// Setup Varibals

var productNameInput = document.getElementById('ProductNameInput')
var productPriceInput = document.getElementById('ProductPriceInput')
var productCategoryInput = document.getElementById('ProductCategoryInput')
var productDescInput = document.getElementById('ProductDescInput')
var ProductNameAlert = document.getElementById('ProductNameAlert')
var ProductPriceAlert = document.getElementById('ProductPriceAlert')
var productList ;

// Enter Data To localStorage

if(localStorage.getItem("OurProduct") == null)
{
    productList = [];
}
else {
    productList = JSON.parse(localStorage.getItem('OurProduct'))
    displayproducts(productList)
}

// Add Product Value
function addProduct()
{
    var product = 
    {
        name:productNameInput.value,
        price:productPriceInput.value,
        category:productCategoryInput.value,
        desc:productDescInput.value,
    }
    productList.push(product)
    displayproducts(productList)
    localStorage.setItem('OurProduct' , JSON.stringify(productList))
    clearForm()
   
}
// View Product List

function displayproducts(anyArray)
{
   var productData ='' 
   for(var i=0 ; i < anyArray.length ; i++)
   {
    productData += `<tr>
                    <td>${i+1}</td>
                    <td>${anyArray[i].name}</td>
                    <td>${anyArray[i].price}</td>
                    <td>${anyArray[i].category}</td>
                    <td>${anyArray[i].desc}</td>
                    <td><button class="btn btn-warning" >Update</button></td>
                    <td><button onclick="deleteProduct(${i})" class="btn btn-danger" >Delete</button></td>
                    </tr>`
   }

document.getElementById('tablebody').innerHTML=productData;
}

// Clear Form After Enter
function clearForm()
{
    productNameInput.value = ""
    productPriceInput.value = ""
    productCategoryInput.value = ""
    productDescInput.value = ""
}
function deleteProduct(index)
{   
    productList.splice(index,1);
    displayproducts(productList);
    localStorage.setItem('OurProduct' , JSON.stringify(productList))

}

// CreateSearchProduct

var SearchInput = document.getElementById('SearchInput')

function searchProduct(){
    var searchTerm = SearchInput.value; 
    var WantedProducts = [];
    for (var i=0 ; i < productList.length ; i++) 
    {
        if(productList[i].name.toLowerCase().includes(searchTerm.toLowerCase())) 
        {
            WantedProducts.push(productList[i])
            console.log('ok')
        }
    }
    displayproducts(WantedProducts);
}

// Product Name Validation

function validatProductName(productName)
{
    var regex = /^[A-Z][a-z]{3,6}$/;
    
    if (regex.test(productName)== true)
    {
        productNameInput.classList.add("is-valid")
        productNameInput.classList.remove("is-invalid")
        ProductNameAlert.classList.replace("d-block" , "d-none")
   
    }
    else
     {
        productNameInput.classList.add("is-invalid")
        productNameInput.classList.remove("is-valid")
        ProductNameAlert.classList.replace("d-none" , "d-block")

    }

} 

productNameInput.addEventListener("keyup", function(){
   
    validatProductName(productNameInput.value)
    
});

// Product Price Valdation 

function validatProductPrice(productPrice)
{
    var regex = /^([1-9][0-9]{2,3}|10000$)/;
    
    if (regex.test(productPrice)== true)
    {
        productPriceInput.classList.add("is-valid")
        productPriceInput.classList.remove("is-invalid")
        ProductPriceAlert.classList.replace("d-block" , "d-none")
   
    }
    else
     {
        productPriceInput.classList.add("is-invalid")
        productPriceInput.classList.remove("is-valid")
        ProductPriceAlert.classList.replace("d-none" , "d-block")

    }

} 

productPriceInput.addEventListener("keyup", function(){
   
    validatProductPrice(productPriceInput.value)
    
});
// End Validation
