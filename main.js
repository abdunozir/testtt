let userName = document.querySelector(".username");
let email = document.querySelector(".email");
let phoneNumber = document.querySelector(".number");
let select = document.querySelector(".select");

let tableBody = document.querySelector(".table-body");
let submitBtn = document.querySelector(".submit-btn");
let formSubmit = document.querySelector(".form-submit");
let modal = document.querySelector(".modal1");
let modalBack = document.querySelector(".modal-back");

let addUser = document.querySelector(".add-use");

//? Modal Show
addUser.addEventListener("click", () => {
  modal.classList.add("modal1-show");
  modalBack.classList.add("modal1-back-show");
});

// ?Modal Hide
modalBack.addEventListener("click", () => {
  modal.classList.remove("modal1-show");
  modalBack.classList.remove("modal1-back-show");
  modal2.classList.remove("modal2-show");
});
let count = 1
// ?Array of inputs
let array = [
  {
    id: count,
    userName: "Shaxzod",
    email: "shaxzod@gmail.com",
    phoneNumber: +990901020440,
    select: "HR",
  },
];

let newArr = [];
function showCard(array) {
  newArr = [];
  array.map((item, index) => {
    let div = `
    <tr class='tr-all' id='${item.id}'>
      <td class='user-td'>${item.userName}</td>
      <td class='email-td'>${item.email}</td>
      <td class='phone-td'>${item.phoneNumber}</td>
      <td class='department-td'>${item.select}</td>
      <td class='edit-td'>
      <i class='bx bx-edit-alt edit' onclick="editList('${item.id}')"></i>
      <i class='bx bx-x remove' id='${item.id}'onclick="removeList('${item.id}')"></i></td>
  </tr>
    `;

    newArr.push(div);
  });
  tableBody.innerHTML = newArr.join("");
}
showCard(array);

// ?Adding New Employees to list
formSubmit.addEventListener("submit", submitFunction);


function submitFunction(e) {
  e.preventDefault();
  count++
  let userError = document.querySelector(".user-error");
  if (phoneNumber.value == "" && phoneNumber.value.length < 9) {
    phoneNumber.classList.add('phone-border-red')
  } else {
    phoneNumber.classList.remove('phone-border-red')
    let successSubmitted = document.querySelector(".succes-fixed");
    successSubmitted.classList.add("succes-fixed-show");
    setTimeout(() => {
      successSubmitted.classList.remove("succes-fixed-show");
    }, 3000);

    modal.classList.remove("modal1-show");
    modalBack.classList.remove("modal1-back-show");
    
    array.push({
      id: count,
      userName: userName.value,
      email: email.value,
      phoneNumber: phoneNumber.value,
      select: select.value,
    });
    console.log(count);

    console.log(array);
    showCard(array);

    userName.value = "";
    email.value = "";
    phoneNumber.value = "";
  }
}

// ?Editing Lists
let modal2 = document.querySelector(".modal2");
function editList(id) {
  let editName = document.querySelector(".edit-name");
  let editEmail = document.querySelector(".edit-email");
  let editNumber = document.querySelector(".edit-number");
  let editSelect = document.querySelector(".edit-select2");

  modal2.classList.add("modal2-show");
  modalBack.classList.add("modal1-back-show");
  array.forEach((item, index) => {
    if (id == item.id) {
      editName.value = item.userName;
      editEmail.value = item.email;
      editNumber.value = item.phoneNumber;
      editItem(id, editName, editEmail, editNumber);
    }
  });
}

let formSubmit1 = document.querySelector(".form-submit2");
function editItem(id, editName, editEmail, editNumber) {
  let count2 = 1;
  formSubmit1.addEventListener("submit", (e) => {
    e.preventDefault();
    if (count2 === 1) {
      array[id - 1].userName = editName.value;
      array[id - 1].email = editEmail.value;
      array[id - 1].phoneNumber = editNumber.value;
      showCard(array);
      count2++;
    }
    modalBack.classList.remove("modal1-back-show");
    modal2.classList.remove("modal2-show");
  });
}

// ?Remove List
function removeList(id) {
  let con = confirm('Are You Sure?')
  if (con == true) {
    const newArray = array.filter(item => item.id != id);
    array = newArray;
    showCard(array)
  }
}

// ?Search filter
let searchMain = document.querySelector('.search-main')
searchMain.addEventListener("keyup", (e) => {
  e.preventDefault();
  let searchReady = e.target.value.toLowerCase();
  let liAr = document.querySelectorAll('.user-td')
  liAr.forEach((li) => {
    let liText = li.textContent;
    if (liText.toLowerCase().indexOf(searchReady) != -1) {
      li.parentElement.style.display = 'block'
      console.log(li.parentElement);
    } else {
      li.parentElement.style.display = 'none'
    }
  });
});

// ?Reset list
function resetList() {
  userName.value = ''
  email.value = ''
  phoneNumber.value = ''
  phoneNumber.classList.remove('phone-border-red')
}
