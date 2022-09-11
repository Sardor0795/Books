// Umumiy kitoblar summasi

// Korzinkaga summa
// Best market

const bName = document.querySelector("[name='bName']");
const bGenre = document.querySelector("[name='genre']");
const bAuthor = document.querySelector("[name='author']");
const pageNumber = document.querySelector("[name='pageNumber']");
const bCompanys = document.querySelectorAll("[name='company']");
const bAbout = document.querySelector("[name='about']");
const bShops = document.querySelectorAll("[name='shops']");
const bNumber = document.querySelector("[name='bNumber']");
const bPrice = document.querySelector("[name='bookPrice']");

const button = document.querySelector("button");
const table = document.querySelector("table");

const all = document.querySelector(".all");
const dramma = document.querySelector(".dramma");
const comedy = document.querySelector(".comedy");
const tragedy = document.querySelector(".tragedy");

const search = document.querySelector(".search");

const img = document.querySelector(".img");
const color = document.querySelector(".color");

const allPrice = document.querySelector(".allPrice");

const modal = document.querySelector(".modal");

const books = [];

const add = () => {
  let company = "";

  bCompanys.forEach((comp) => {
    if (comp.checked) {
      company = comp.value;
      comp.checked = false;
    }
  });

  let shops = [];

  bShops.forEach((shop) => {
    if (shop.checked) {
      shops.push(shop.value);
      shop.checked = false;
    }
  });

  let book = {
    bName: bName.value,
    bGenre: bGenre.value,
    bAuthor: bAuthor.value,
    pageNumber: pageNumber.value,
    bCompany: company,
    bAbout: bAbout.value,
    bShops: shops,
    bNumber: bNumber.value,
    bPrice: bPrice.value,
    color: color.value,
    img: img.value,
  };

  books.push(book);
};

const render = (array) => {
  table.innerHTML = `
    <tr>
        <th>№</th>
        <th>Kitob nomi</th>
        <th>Kitob janri</th>
        <th>Kitob muallifi</th>
        <th>Kitob sahifalar soni</th>
        <th>Kitob ishlab chiqaruvchi</th>
        <th>Rangi</th>
        <th>Kitob haqida qisqa matn</th>
        <th>Qaysi do'konlarda sotiladi</th>
        <th>Kitoblar soni</th>
        <th>Rasmi</th>
        <th>Kitoblar narhi</th>
        <th></th>
    </tr>
    `;

  array.forEach((book, i) => {
    table.innerHTML += `

        <tr>
            <td>${i + 1}</td>
            <td>${book.bName}</td>
            <td>${book.bGenre}</td>
            <td>${book.bAuthor}</td>
            <td>${book.pageNumber}</td>
            <td>${book.bCompany}</td>
            <td style="background-color: ${book.color};"></td>
            <td>${book.bAbout}</td>
            <td>${book.bShops}</td>
            <td>${book.bNumber}</td>
            <td><img src="${book.img}" width="50"></td>
            <td>${book.bPrice}</td>
            <td><button onclick="dell(${i})"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Octagon_delete.svg/2048px-Octagon_delete.svg.png" width="20"></button></td>
        </tr>

        `;
  });
  countBooks();
};

const dell = (i) => {
  if (confirm("Are you sure?")) {
    books.splice(i, 1);
    render(books);
  }
};

const countBooks = () => {
  let allBooksCount = 0;

  books.forEach((book) => {
    if (book.bNumber) {
      allBooksCount += +book.bNumber;
    }
  });

  all.textContent = allBooksCount;

  let drammaCount = 0;
  let comedyCount = 0;
  let tragedyCount = 0;

  books.forEach((book) => {
    if (book.bGenre == "Dramma") {
      drammaCount += +book.bNumber;
    }
    if (book.bGenre == "Comedy") {
      comedyCount += +book.bNumber;
    }
    if (book.bGenre == "Tragedy") {
      tragedyCount += +book.bNumber;
    }
  });

  dramma.textContent = drammaCount;
  comedy.textContent = comedyCount;
  tragedy.textContent = tragedyCount;
};

const countPrice = () => {
  let countAllPrice = 0;

  books.forEach((book) => {
    countAllPrice += +book.bPrice;
  });

  allPrice.textContent = countAllPrice;
};

button.addEventListener("click", () => {
  if (
    bName.value &&
    bGenre.value &&
    bAuthor.value &&
    pageNumber.value &&
    bCompanys &&
    bAbout.value &&
    bShops &&
    bNumber.value &&
    bPrice.value &&
    img.value
  ) {
    add();
    render(books);
    countBooks();
    countPrice();
    bName.value = "";
    bGenre.value = "";
    bAuthor.value = "";
    pageNumber.value = "";
    bAbout.value = "";
    bNumber.value = "";
    bPrice.value = "";
    img.value = "";
    (color.value = 0), 0, 0;
  } else {
    modal.classList.add("open");
    setTimeout(() => {
      modal.classList.remove("open");
    }, 2000);
  }
});

search.addEventListener("input", () => {
  let val = search.value;

  let filteredBooks = books.filter((book) => {
    if (book.bName.toLowerCase().indexOf(val) !== -1) {
      return book;
    }
  });

  render(filteredBooks);
});
