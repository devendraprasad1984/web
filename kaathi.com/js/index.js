let rs = '₹';
let product_img_base = 'imgs/products/';
let priceTag = '#priceTag';
let v_bottom_cart_icon = '#id_bottom_cart_icon';
let v_right_close_button = '#rightPanelCloseButton';
let topContainer = '#id_div_top_container';
let cart_final_amt = 'cart_final_amt';
let cart_final_qty = 'cart_final_qty';
let leftContainer = '#id_div_left_container';
let v_products = {
    1: {
        category: 'wooden educational toys',
        code: 'prod1',
        desc: 'this is a test of product 1 category 1',
        images: ['1.jpeg'],
        price: 10,
        discount: 0,
        amzlink: 'https://www.amazon.in/Mammon-Womens-Leather-Handbag-3L-bib-Cream/dp/B07XKNS6FF/ref=lp_19079038031_1_1?s=shoes&ie=UTF8&qid=1574514565&sr=1-1'
    }
}
let configObj = {};
let globalVars = {}
let constObj = {
    cart: 'cart',
    success: 'success',
    failed: 'failed',
    product: 'product',
    contact: 'contact',
    send: 'plz wait...',
    close: 'Close',
    errmsg: 'some error, contact admin'
}
let curRightPanelObject = constObj.cart;
let onSuccess = () => {
}
let onFailure = () => {
}
let v_left_page = [
    , ['<span class = "btn" onClick = "makeProductPage();">Products</span>']
    , ['<span class="btn" onClick="makeContactPage();">Contact Us</span>']
]
let main = './services/main.php';
let v_contact_page = {
    line1: ['Plot 155'],
    line2: ['Block D, Bagdola'],
    line3: ['new delhi - 110077'],
    line4: ['near dwarka sector 8 metro station'],
    line6: '<div id="idContactForm" class="formx">' +
        '<textarea placeholder="Message" class="form-control" type="textarea" id="message" name="message" maxlength="6000" rows="7"></textarea>' +
        '<input type="text" placeholder="Name" class="form-control" id="name" name="name" required>' +
        '<input type="email" placeholder="Email" class="form-control" id="email" name="email">' +
        '<input type="text" placeholder="contact number" class="form-control" id="contact" name="contact" required>' +
        '<button class="btn pull-right" onClick="sendMessage()">Send</button>' +
        '<button class="btn pull-right">Reset</button>' +
        '</div>',
    line5: '<div>' +
        '<span class="btn" onclick="addressOnMap(51.508742,-0.120850)">View on Map</span>' +
        '<div id="addressMap"></div>' +
        '</div>'
}
let v_product_categories = [{name: 'category1', type: 'type1', details: 'detail1'}];

let mainContainer = '#id_div_container';
let selectedProduct = {}
let rightContainer = '#id_div_right_container';
let cartObj = {}
let checkOutPayment = 0;

function onServerError() {
    console.error(constObj.errmsg);
    alert(constObj.errmsg);
}

$(document).ready(function () {
    prepareViewMobileReady();
    toastr.options = {
        "closeButton": true,
        "debug": false,
        "newestOnTop": true,
        "progressBar": true,
        "preventDuplicates": true,
        "onclick": null,
        "showDuration": "100",
        "hideDuration": "100",
        "timeOut": "1000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "show",
        "hideMethod": "hide"
    };
    initApp();
    // displayProducts('category1');
});

let prepareViewMobileReady = () => {
    globalVars['isMobile'] = isMobileDevice();
}

let displayProducts = (category) => {
    checkOutPayment = 0;
    // console.log(category)
    $(mainContainer).empty();
    let categ = getCategoryDetails(category);
    let topText = '<h1><div title="' + categ.details + '">' + categ.name + ' (' + categ.type + ')' + '</div></h1>';
    $(mainContainer).prepend(topText);
    let found = 0;
    for (x in v_products) {
        let v_product = v_products[x];
        if (v_product.category !== category) continue;
        found += 1;
        let pid = parseInt(v_product.id);
        let pname = v_product.name;
        let desc = v_product.desc;
        let qty = parseInt(v_product.qty) || 0;
        let images = v_product.images;
        let amzLink = v_product.amazonLink || '';
        let folderRef = v_product.folderRef;
        let qrid = v_product.qrid;
        let flipkarLink = v_product.flipkartLink || '';

        let elm1 = '<div style="padding: 2px;">' +
            '<h1>' + pname + ' ' +
            '<span class="btn btn-light pull-right" onclick="handleProductClick(\'' + pid + '\',-1)"><i class="fa fa-lg fa-minus"></i></span>' +
            '<span class="btn btn-light pull-right" onclick="handleProductClick(\'' + pid + '\',1)"><i class="fa fa-lg fa-plus"></i></span>' +
            '</h1>' +
            '</div>';
        let elm2 = '<div><b id="id_prod_desc_' + pid + '">' + desc.substr(0,100) + '...<a href="javascript:void(0)" onclick="showMoreText(\''+pname+'\',\''+desc+'\')">more</a></b></div>';
        let elm3 = '<div><span id="id_img_desc_' + pid + '" class="productImages">' + display_product_images(pid,folderRef, images) + '</span></div>';
        let elm4 = '<div id="priceTag_' + pid + '" class="priceline color1">' + getPriceLine(v_product, qty) + '</div>';
        let elm5 = '<div class="link_logo">' +
            (amzLink !== "" ? '<a target="_blank" id="id_amazon_"' + pid + ' href="' + amzLink + '">amazon</a>' : '')
            + (flipkarLink !== "" ? ' | <a target="_blank" id="id_flipkart_"' + pid + ' href="' + flipkarLink + '">flipkart</a>' : '') +
            '</div>';
        let shtml = '<div class="cenAlign product_box">' + elm1 + elm4 + elm2 + elm3 + elm5 + '</div><br/>';
        $(mainContainer).append(shtml);
        closePanelIfMobile();
    }
    if (found == 0) {
        $(mainContainer).append(getErrorDetails());
    }
}

let getErrorDetails = () => {
    return '<span class="badge text-danger">sorry, we couldnt find any related match</span>';
}

let getCategoryDetails = (category) => {
    for (x in v_product_categories) {
        if (v_product_categories[x].name == category) {
            return v_product_categories[x];
        }
    }
}

let getCalci = (prod, qty) => {
    let discount = parseFloat(prod.discount);
    let price = parseFloat(prod.price) * parseInt(qty);
    let finalAmount = Math.round(price - price * discount / 100, 0);
    let savedAmount = price - finalAmount;
    let objCalc = {price, discount, finalAmount, savedAmount, qty};
    prod.finalAmount = finalAmount;
    return objCalc;
}
let getPriceLine = (prod, qty) => {
    let x = getCalci(prod, qty);
    let shtml = '<h2>' +
        '<span>' + rs + prod.price + '*' + qty + '</span> ' +
        '<span> - ' + rs + x.savedAmount + '(' + x.discount + '%)</span> ' +
        '<span> = ' + rs + x.finalAmount + '</span> ' +
        '<span class="btn btn-light pull-right" title="' + x.qty + ' qty selected" onclick="add2cart(\'' + prod.id + '\');">' +
        'Add to Cart </span>' +
        '</h2>';
    return shtml;
}

let display_product_images = (id,folderRef, imgs) => {
    let pid='prod_img_'+id;
    if (imgs === '' || typeof imgs === "undefined") return;
    let sImages = '<div id="'+pid+'"  class="carousel slide" data-ride="carousel">';
    sImages+='<div class="carousel-inner">';
    let arrImg = imgs.split(',');
    for (let i in arrImg) {
        sImages += '<div class="carousel-item '+(i==="0"?'active':'')+'" style="background-color: lightgray">';
        sImages += '<img src="' + product_img_base + folderRef + arrImg[i] + '" alt="' + arrImg[i] + '" />';
        sImages += '</div>';
    }
    sImages+='</div>';
    sImages+='<a class="carousel-control-prev" href="#'+pid+'" role="button" data-slide="prev">';
    sImages+='<span class="carousel-control-prev-icon" aria-hidden="true"></span>';
    sImages+='<span class="sr-only">Previous</span>';
    sImages+='</a>';
    sImages+='<a class="carousel-control-next" href="#'+pid+'" role="button" data-slide="next">';
    sImages+='<span class="carousel-control-next-icon" aria-hidden="true"></span>';
    sImages+='<span class="sr-only">Next</span>';
    sImages+='</a>';
    sImages += '</div>';
    return sImages
}

let makeContactPage = () => {
    curRightPanelObject = constObj.contact;
    let elm1 = '<div id="id_contact_page"><h2>Contact Us</h2>';
    let shtml = elm1;
    for (let i in v_contact_page) {
        let line = v_contact_page[i];
        let sline = (typeof line === Array ? line.join(' ') : line);
        shtml += '<div id="contact_page_"' + i + '>' + sline + '</div>'
    }
    shtml += '</div>';
    $(rightContainer).html(shtml);
    move2top();
}

let makeProductPage = () => {
    curRightPanelObject = constObj.product;
    let elm1 = '<div id="id_product_page"><h2>Our Products</h2>';
    let shtml = '';
    for (let i in v_product_categories) {
        let category = v_product_categories[i];
        shtml += '<div id="id_product_page_' + i + '"><span class="btn" title="' + category.type + ' - ' + category.details + '" onclick="clickOnProductCategory(\'' + category.name + '\')">' + category.name + '</span></div>'
    }
    shtml += '</div>';
    $(topContainer).html(shtml);
    move2top();
}

let prepareLeftPage = () => {
    getPageWidth();
    let elm1 = '<div id="id_left_page" class="dropMenu">';
    let shtml = elm1;
    for (let i in v_left_page) {
        let line = v_left_page[i];
        shtml += line;
    }
    shtml += '</div>';
    $(leftContainer).html(shtml);
    // showLeftPanel();
    move2top();
    if (globalVars.isMobile) {
        //set right+left container display mode like a mobile
    } else {
        //set right+left container display mode like a mobile  -REVERT
    }
}

let clickOnProductCategory = (category) => {
    displayProducts(category);
}


let add2cart = (xid) => {
    let prods = getProductByCode(xid);
    if (prods.qty === undefined || prods.qty <= 0 || prods.finalAmount <= 0) {
        toastr.error("choose min 1 qty");
        return;
    }
    if (cartObj.hasOwnProperty(xid)) {
        if (cartObj[xid].qty === prods.qty) {
            toastr.error(prods.name + " is already present. no qty changed");
            return;
        }
    }
    cartObj[xid] = JSON.parse(JSON.stringify(prods)); //deep copy of object
    toastr.success(xid + "-" + cartObj[xid].qty + " unit(s) added");
    manage_bottom_cart_icon_count();
    if ($(rightContainer).is(":visible")) {
        displayCart(cartObj);
    }
}

let initApp = () => {
    //get home load data from server
    prepareLeftPage();
    onSuccess = (res) => {
        if (res.status.status === 'success') {
            console.log(res);
            configObj = res.config;
            v_product_categories = res.categories;
            v_products = res.products;
            displayCart();
            makeProductPage();
            displayProducts(v_product_categories[0].name);
        } else {
            onServerError();
        }
    }
    onFailure = failHandle
    POSTMeesage(main, {loadhome: 1})
}
let closePanelIfMobile = () => {
    if (globalVars['isMobile']) {
        // closeLeftPanel();
        // closeRightPanel();
    }
}

function showMoreText(title,text) {
    swal({text, title:title||''});
}

let displayCart = () => {
    $(rightContainer).empty();
    let count = 0;
    let Amount = 0;
    for (let o in cartObj) {
        let prod = cartObj[o];
        let elm1 = '<div class="xcard" id="id_cart_' + prod.id + '">';
        let elm3 = '<h3><a class="orange" href="javascript:void(0)" onclick="">' + prod.name + '</a> <a href="javascript:void(0);" class="btn pull-right" onclick="removeFromCart(\'' + prod.id + '\')"><i class="fa fa-lg fa-minus"/></a></h3>';
        let elm4 = '<div><span>' + prod.desc.substr(0, 30) + '...<a href="javascript:void(0);" onclick="showMoreText(\'' + prod.name + '\',\''+prod.desc+'\')">more</a></span><span>' + prod.calci + '</span></div>';
        let elm5 = '</div>';
        $(rightContainer).append(elm1 + elm3 + elm4);
        count += 1;
        Amount += prod.finalAmount;
    }
    let elm0 = "<h4>Cart has <span id='" + cart_final_qty + "'>" + count + "</span> item of " + rs + "<span id='" + cart_final_amt + "' class='badge badge-light text-danger'>" + Amount + "</span></h4>";
    let elm0_1 = "<div><a target='_blank' href='javascript:void(0);' class='btn'>Pay</a>";
    let elm0_2 = " <a href='javascript:void(0);' class='btn' onclick='clearAll()'>Clear</a></div>";
    let elm0_4 = "<h4>Thanks for using kaathi.com</h4>";
    $(rightContainer).prepend(elm0 + elm0_1 + elm0_2 + elm0_4);
    manage_bottom_cart_icon_count();
    $(".xcard span h2 span.btn").remove();
    checkOutPayment = Amount; //checkout amount that we may want to charge
    // showRightPanel();
}

let makeCart = () => {
    curRightPanelObject = constObj.cart;
    displayCart();
    move2top();
}

let clickCartBadge = () => {
    move2top();
    if (!$(rightContainer).is(":visible") || curRightPanelObject != constObj.cart) {
        displayCart();
    }
}

let removeFromCart = (code) => {
    let curcart = cartObj[code];
    let prod = getProductByCode(code);
    // displayCart();
    prod.qty = 0;
    //trying to boost performance by not reloading cart object from scratch
    let amtid = '#' + cart_final_amt;
    let qtyid = '#' + cart_final_qty;
    $(qtyid).html(parseFloat($(qtyid).html()) - 1);
    $(amtid).html(parseFloat($(amtid).html()) - curcart.finalAmount);
    delete cartObj[code];
    manage_bottom_cart_icon_count();

    $("#id_cart_" + code).remove();
    $(priceTag + '_' + code).html(getPriceLine(prod, 0));
}

let manage_bottom_cart_icon_count = () => {
    let iconid = v_bottom_cart_icon + " span.badge-danger";
    // $(iconid).html(parseInt($(iconid).html())+qty);
    $(iconid).html(Object.keys(cartObj).length);
}

let getPageWidth = () => {
    let wid = $('body').width();
    if (wid <= 800) {
        globalVars.isMobile = true;
    } else {
        globalVars.isMobile = false;
    }
}

let clearAll = () => {
    checkOutPayment = 0;
    cartObj = {};
    $(rightContainer).empty();
    displayProducts(Object.keys(v_product_categories)[0]);
    // if (globalVars.isMobile) closeRightPanel();
    manage_bottom_cart_icon_count();
}

function isMobileDevice() {
    // console.log('ismobile window orintation:',window.orientation,'navigator user agent',navigator.userAgent.indexOf('Mobile'));
    return (navigator.userAgent.indexOf('Mobile') !== -1) ? true : false;
};


let getProductByCode = (pid) => {
    let pr = {}
    for (let i in v_products) {
        if (v_products[i].id === pid) {
            pr = v_products[i];
            break;
        }
    }
    return pr;
}

let handleProductClick = (pid, qty) => {
    selectedProduct = getProductByCode(pid);
    if (selectedProduct.qty == undefined) selectedProduct.qty = 0;
    selectedProduct.qty = parseInt(selectedProduct.qty) + qty;
    if (selectedProduct.qty <= 0) selectedProduct.qty = 0;
    // console.log(selectedProduct)
    let sUpdatedPrice = getPriceLine(selectedProduct, selectedProduct.qty);
    selectedProduct.calci = sUpdatedPrice;
    $(priceTag + '_' + pid).html(sUpdatedPrice);
}

let move2top = () => {
    $('html, body').animate({scrollTop: 0}, 'fast');
    // window.scroll(0, -100);
    // $('html,body').scrollTop(-500);
    // document.location.href="#top";
}

let addressOnMap = (lat, lang) => {
    toastr.info("in progress");
}

let sendMessage = () => {
    $(v_right_close_button).html(constObj.send);
    // let contactFormData=$('#idContactForm').html();
    let id = '#idContactForm';
    let contactFormData = {
        contactus: 1
        , message: $(id + ' #message').val()
        , name: $(id + ' #name').val()
        , email: $(id + ' #email').val()
        , contact: $(id + ' #contact').val()
    };
    onSuccess = emailSuccess;
    onFailure = failHandle;
    POSTMeesage(main, contactFormData);
}
let failHandle = (res) => {
    console.log('failed response from server', res['status'], res);
    swal({
        text: 'Processing failed, contact helpdesk, delhi.kaathi@gmail.com, +919582797772'
        , icon: 'error'
    })
    $(v_right_close_button).html(constObj.close);
}

let emailSuccess = (res) => {
    if (res.status === constObj.success) {
        swal({
            text: 'Processing Successful, ' + res.msg
            , icon: 'success'
        })
    }
    $(v_right_close_button).html(constObj.close);
}
let POSTMeesage = (url, xval) => {
    // beforeSend:textreplace(description),
    $.ajax({
        url: url,
        type: 'POST',
        data: xval,
        dataType: 'json',
        success: (res) => {
            onSuccess(res);
        },
        error: (res) => {
            onFailure('error, check with admin ' + res);
        }
    });
    return false;
}

function getData(url = '', success, error) {
    $.ajax({
        type: "GET",
        url: url,
        dataType: 'json',
        success,
        error
    });
}


function validateContact() {
    let valid = true;
    let id = '#idContactForm';
    let name = $(id + ' #name');
    let email = $(id + ' #email');
    let message = $(id + ' #message');
    let contact = $(id + ' #contact');
    name.css(clearbg);
    email.css(clearbg);
    message.css(clearbg);
    contact.css(clearbg);
    if (!name.val()) {
        $(name).css(bg);
        valid = false;
    }
    if (!email.val()) {
        email.css(bg);
        valid = false;
    }
    if (!message.val()) {
        message.css(bg);
        valid = false;
    }
    if (!contact.val()) {
        contact.css(bg);
        valid = false;
    }
    return valid;
}




