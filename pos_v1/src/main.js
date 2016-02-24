//TODO: Please write code in this file.
function printInventory(inputs){
  var inputList = dealInput(inputs);
  var cart = getCartList(inputList,loadAllItems());
  var gift = getGiftList(cart,loadPromotions());
  updateCartList(cart,gift);
  var totalAndSave = getTotalAndSave(gift,cart);

  var reception = '***<没钱赚商店>购物清单***\n';
  for(var i=0; i<cart.length; i++){
    reception += '名称：' + cart[i].name + '，数量：' + cart[i].quantity + cart[i].unit +
    '，单价：' + cart[i].price + '(元)，小计：' + cart[i].total + '(元)\n';
  }
  reception += '----------------------\n' + '挥泪赠送商品：\n' ;

  for(var j=0; j<gift.length; j++){
    reception += '名称：' + gift[j].name + '，数量：' + gift[j].quantity + gift[j].unit + '\n';
  }
  reception += '----------------------\n' +
  '总计：' + totalAndSave.totalPrice + '(元)\n' +
  '节省：' + totalAndSave.totalSave + '(元)\n' +
  '**********************';
   document.write(reception);
}

function dealInput(inputs){
  var newInputList = new Array();
  for(var i=0; i<inputs.length; i++){
    if(inputs[i].indexOf('-')>0){
      var inputArray = new Array();
      inputArray = inputs[i].split('-');
      var item = new Object();
      item.barcode = inputArray[0];
      item.quantity = parseInt(inputArray[1]);
      newInputList.push(item);
    }else{
      var flag = false;
      for(var j=0; j<newInputList.length; j++){
        if(inputs[i] == newInputList[j].barcode){
          newInputList[j].quantity += 1;
          flag = true;
        }
      }
      if(!flag){
        var item = new Object();
        item.barcode = inputs[i];
        item.quantity = 1;
        newInputList.push(item);
      }
    }
  }
  return newInputList;
}

function getCartList(inputList, allItems){
  var cartList = new Array();;
  for(var i=0; i<inputList.length; i++){
    for(var j=0; j<allItems.length; j++){
      if(inputList[i].barcode == allItems[j].barcode){
        var item = new Object();
        item.barcode = allItems[j].barcode;
        item.name = allItems[j].name;
        item.unit = allItems[j].unit;
        item.price = allItems[j].price;
        item.quantity = inputList[i].quantity;
        item.total = allItems[j].price * inputList[i].quantity;
        cartList.push(item);
      }
    }
  }
  return cartList;
}

function getGiftList(cart, promotions){
  var giftList = new Array();
  var promotionList = new Array();
  promotionList = promotions[0].barcodes;
  for(var i=0; i<cart.length; i++){
    for(var j=0; j<promotionList.length; j++){
      if(cart[i].barcode == promotionList[j]){
        var item = new Object();
        item.barcode = cart[i].barcode;
        item.name = cart[i].name;
        item.quantity = cart[i].quantity;
        item.unit = cart[i].unit;
        item.price = cart[i].price*cart[i].quantity-Math.floor((cart[i].quantity/3))*cart[i].price;
        giftList.push(item);
      }
    }
  }
  return giftList;
}

function updateCartList(cart,gift){
  for(var i=0; i<cart.length; i++){
    for(var j=0; j<gift.length; j++){
      if(cart[i].barcode == gift[j].barcode){
        cart[i].total = gift[j].price;
      }
    }
  }
}

function getTotalAndSave(gift,cart){
  var totalForGift = 0,totalPrice = 0,totalSave = 0;
  for(var i=0; i<gift.length; i++){
    totalForGift += gift[i].price;
  }
  for(var j=0; j<cart.length; j++){
    totalPrice += cart[j].total;
  }
  totalSave = totalPrice - totalForGift;

  var total = new Object();
  total.totalPrice = totalPrice;
  total.totalSave = totalSave;
  return total;
}
