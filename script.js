// Umumiy kitoblar
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
        <th>Kitob haqida qisqa matn</th>
        <th>Qaysi do'konlarda sotiladi</th>
        <th>Kitoblar soni</th>
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
            <td>${book.bAbout}</td>
            <td>${book.bShops}</td>
            <td>${book.bNumber}</td>
            <td>${book.bPrice}</td>
            <td><button onclick="dell(${i})">X</button></td>
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
    bPrice.value
  ) {
    add();
    render(books);
    countBooks();
    bName.value = "";
    bGenre.value = "";
    bAuthor.value = "";
    pageNumber.value = "";
    bAbout.value = "";
    bNumber.value = "";
    bPrice.value = "";
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