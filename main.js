data = []

var imgDiv = document.createElement('div');
imgDiv.classList = ['col-12 show'];
var imgImg = document.createElement('img');
imgImg.src = 'assets/no-search.png';
imgImg.classList = ['no-result'];
imgDiv.appendChild(imgImg);

current = []
for(let i = 1; i <= 30; i++) {
    current.push(i);
}

function sliceIfLong(desc) {
    if (desc.length > 82) {
        return desc.slice(0, 79) + "...";
    } else {
        return desc;
    }
}

function showImage() {
    listQuery.append(imgDiv);
    imgDiv.classList = ['col-12 show'];
}

function hideImage() {
    imgDiv.classList = ['col-12 hide'];
    setTimeout(function () {
        imgDiv.remove();
    }, 1000);
}

function getDOMElementByData(d) {
    let wrapperDiv = document.createElement('div');
    let cardDiv = document.createElement('div');
    let img = document.createElement('img');
    let sourceDiv = document.createElement('div');
    let span1 = document.createElement('span');
    let span2 = document.createElement('span');
    let span3 = document.createElement('span');
    let h1 = document.createElement('h1');
    let priceWrapDiv = document.createElement('div');
    let priceDiv1 = document.createElement('div');
    let strong1 = document.createElement('strong');
    let price1 = document.createElement('span');
    let priceDiv2 = document.createElement('div');
    let span4 = document.createElement('span');
    let span5 = document.createElement('span');
    let strong2 = document.createElement('strong');
    let price2 = document.createElement('span');
    let desc = document.createElement('p');

    wrapperDiv.id = 'result' + d['id'];
    wrapperDiv.classList = ['result show col-lg-4 col-12 col-sm-6'];
    cardDiv.classList = ['resultcard row'];
    img.classList = ['feature col-6'];
    img.src = d['thumbnail'];
    sourceDiv.classList = ['source col-6'];
    span1.classList = ['brand'];
    span1.innerHTML = d['brand'];
    span2.innerHTML = ' · ';
    span3.classList = ['category'];
    span3.innerHTML = capitalizeFirstLetter(d['category']);

    h1.classList = ['source-title'];
    h1.innerHTML = capitalizeFirstLetter(d['title']);

    priceWrapDiv.classList = ['row'];
    priceDiv1.classList = ['price col-3'];
    strong1.innerHTML = '$';

    let pr = d['price'];
    let discount = d['discountPercentage'];
    let discounted = Math.floor(pr * (100 - discount) / 100);

    price1.innerHTML = discounted;
    priceDiv2.classList = ['price col-3'];
    strong2.innerHTML = '$';
    price2.innerHTML = d['price'];

    desc.classList = ['source-desc lead'];
    desc.innerHTML = sliceIfLong(d['description']);

    span4.classList = ['strike1'];
    span5.classList = ['strike2'];

    span5.appendChild(strong2);
    span5.appendChild(price2);
    span4.appendChild(span5);
    priceDiv2.appendChild(span4);

    priceDiv1.appendChild(strong1);
    priceDiv1.appendChild(price1);

    priceWrapDiv.appendChild(priceDiv1);
    priceWrapDiv.appendChild(priceDiv2);

    sourceDiv.appendChild(span1);
    sourceDiv.appendChild(span2);
    sourceDiv.appendChild(span3);
    sourceDiv.appendChild(h1);
    sourceDiv.appendChild(priceWrapDiv);
    sourceDiv.appendChild(desc);

    cardDiv.appendChild(img);
    cardDiv.appendChild(sourceDiv);

    wrapperDiv.appendChild(cardDiv);
    return wrapperDiv;
}

const header = $('#header');
const wrapper = $('#wrapper');
const listQuery = $('#resultslist');
const searchBar = $('#search');

const margin = `${header.outerHeight() + 10}px`;
setTimeout(() => wrapper.css('marginTop', margin), 100);

fetch("data.json")
    .then(response => response.json())
    .then(json => {
        listQuery.innerHTML = "";
        data = json['products'];
        data.forEach(product => {
            listQuery.append(getDOMElementByData(product)); 
        });
    });

const inputHandler = function() {
    let query = searchBar.val().toLowerCase();
    let cat = $("#categories option:selected").val();
    let filteredResult = [];
    data.forEach(product => {
        if (cat === "all") {
            if (product['title'].toLowerCase().includes(query) || product['description'].toLowerCase().includes(query)) {
                filteredResult.push(product['id']);
            }
        } else {
            if (product['title'].toLowerCase().includes(query) || product['description'].toLowerCase().includes(query)) {
                if (product['category'] === cat)
                    filteredResult.push(product['id']);
            }
        }
    });
    let toAddProducts = [];
    let toRemoveProducts = [];
    filteredResult.forEach(id => {
        if (!current.includes(id)) {
            toAddProducts.push(id);
        }
    });
    current.forEach(id => {
        if(!filteredResult.includes(id)) {
            toRemoveProducts.push(id);
        }
    });
    while (toAddProducts.length != 0) {
        let add = getDOMElementByData(data[toAddProducts[0]-1]);
        listQuery.append(add);
        toAddProducts.shift();
    }
    while (toRemoveProducts.length != 0) {
        let remove = $('#result'+toRemoveProducts[0]);
        remove.children()[0].className += " hide";
        setTimeout(function () {
            remove.remove();
        }, 1000);
        toRemoveProducts.shift();
    }
    current = filteredResult;
    if (current.length == 0) showImage();
    else hideImage();
}

searchBar.on('change keyup paste', function () {
    inputHandler();
});

$('#categories').on('change', function () {
    inputHandler();
});

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}