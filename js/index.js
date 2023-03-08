// CONST DOM
const form = document.querySelector('#form');
const nameInput = document.querySelector('#name');
const lastNameInput = document.querySelector('#last-name');
const selectCountry = document.querySelector('#country');
const phoneInput = document.querySelector('#phone');
const btnAdd = document.querySelector('.btn-add');
const contactContainer = document.querySelector('.contacts-container');
const spanPhoneCode = document.querySelector('.phone-code');


// REGEX
const NAME_REGEX = /^([A-Za-z]){4,15}$/;
const PHONE_REGEX = /^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/;

// LETS
let contacts = [];


// EVENT LISTENERS
eventListeners();
function eventListeners() {
    document.addEventListener('DOMContentLoaded', e =>{
        fillSelect();
        resetForm();
        getLocalStorage();
    });
    nameInput.addEventListener('input', validateInput);
    lastNameInput.addEventListener('input', validateInput);
    phoneInput.addEventListener('input', validateInput);
    selectCountry.addEventListener('change', countrySelectCode);
    form.addEventListener('submit', validateForm);
}
//*********************  FUNCTIONS FORM AND INPUTS ***********************//

// VALIDATE THE FORM WITH REGEX AND CHECKCOUT THEIR VALUES
function validateForm(e) {
    e.preventDefault()
    if (nameInput.value.trim() !== "" && lastNameInput.value.trim() !== "" && phoneInput.value.trim() !== "" && selectCountry.value.trim() !== "") {
        if (NAME_REGEX.test(nameInput.value.trim()) && NAME_REGEX.test(lastNameInput.value.trim()) && PHONE_REGEX.test(phoneInput.value.trim())) {
            createObject();
            nameInput.classList.remove('correct');
            lastNameInput.classList.remove('correct');
            phoneInput.classList.remove('correct');
        } else{
            showMessage('Debes llenar los campos correctamente');
        }
    } else {
        showMessage('Debes llenar los campos');
    }
}
// VALIDATE INPUTS
function validateInput(e) {
    const target = e.target;
    if (target.type === 'text') {
        (NAME_REGEX.test(target.value.trim())) ? greenBorder(target) : redBorder(target);
    } 
    if(target.type === 'tel') {
        (PHONE_REGEX.test(target.value.trim())) ? greenBorder(target) : redBorder(target);
    }
  
}
// PUT INPUTS BORDER ON GREEN
function greenBorder(target) {
    target.classList.remove('wrong');
    target.classList.add('correct');
}
// PUT INPUTS BORDER ON RED
function redBorder(target) {
    target.classList.remove('correct');
    target.classList.add('wrong');
}
// SELECT THE PHONE CODE
function countrySelectCode(e) {
    const targetValue = e.target.value;
    spanPhoneCode.innerHTML = `${targetValue}`
}
// RESET THE FORM 
function resetForm() {
    form.reset();
}
// SHOW A MESSAGE IF THERE IS AN ERROR
function showMessage(message) {
    const error = document.createElement('P');
    error.classList.add('error');
    error.textContent = message;
    // VERIFY IF THERE ARE MORE ERRORS
    const errores = document.querySelectorAll('.error');
    if (errores.length === 0) {
        form.firstElementChild.insertAdjacentElement('beforeend', error);
        setTimeout(() =>{
            error.remove();
        }, 3000);
    }
}

//************************ FUNCTION CONTACTS AND FUNCTIONALITY ******************************//
// CREATE AN OBJECT WITH THE INPUTS VALUES
function createObject() {
   const contact = {
        name: nameInput.value,
        lastName: lastNameInput.value,
        country: selectCountry.options[selectCountry.selectedIndex].textContent,
        flag: selectCountry.options[selectCountry.selectedIndex].dataset.countryFlag,
        code: Number(selectCountry.options[selectCountry.selectedIndex].value),
        phone: Number(phoneInput.value),
        id: Date.now()
   }
   contacts = [...contacts, contact];
   createList(contacts);
   resetForm();
}
// CREATE A LIST AND INSERT THE OBJECT INFO INTO HIM
function createList(contacts) {    
    cleanHTML();
    contacts.forEach(contact =>{
        const{name, lastName, country, flag, code, phone, id} = contact;
        const li = document.createElement('LI');
        li.classList.add('contact');
        li.dataset.id = id;
        li.innerHTML = `
        <div class="contact-info">
            <span class="chart">${name.charAt(0).toUpperCase()}${lastName.charAt(0).toUpperCase()}</span>
            <div class="contact-inputs">
                <input class="disabled name-contact" type="text"  value="${name}" readonly>
                <input class="disabled last-name-contact" type="text"  value="${lastName}"  readonly>
            </div>
            <span class="flag">${flag}</span>
        </div>
        <div class="contact-number">
            <p class="number-phone">+${code}-${phone}</p>
        </div>
        <div class="contact-btn">
            <button class="btn-edit edit" data-id="${id}">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 svg-edit"><path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" /></svg> 
            </button>
            <button class="btn-delete" data-id="${id}">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 svg-delete"><path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>
            </button>
        </div>
        `
    spanPhoneCode.innerHTML = `+##`;
    // INSERT LI CONTACT IN YOUR FATHER
    contactContainer.appendChild(li);
    // LISTEN DETECT EVENT
    li.addEventListener('click', detectEvent);
    });
    // SET LOCAL STORAGE
    setLocalStorage();
}
// CLEAN HTML EVEN THAT EXECUTE CREATELIST
function cleanHTML() {
    while (contactContainer.firstElementChild) {
        contactContainer.removeChild(contactContainer.firstElementChild)
    }
}
// DETECT EDIT EVENT OR REMOVE
function detectEvent(e) {
    e.preventDefault();
    const target = e.target;
   
    if (target.closest('.btn-delete')) {
        removeContact(Number(target.closest('.btn-delete').dataset.id));
    }
    if (target.closest('.btn-edit')) {
        const dataId = Number(target.closest('.btn-edit').dataset.id);
        const btnEdit = target.closest('.btn-edit');
        (btnEdit.classList.contains('edit')) ? editContact(btnEdit) : closeContact(btnEdit, dataId);
        
    }
}
// EDIT CONTACT
function editContact(btnEdit) {
    btnEdit.parentElement.parentElement.querySelector('.name-contact').removeAttribute('readonly');
    btnEdit.parentElement.parentElement.querySelector('.last-name-contact').removeAttribute('readonly');
    btnEdit.parentElement.parentElement.querySelector('.name-contact').value = "";
    btnEdit.parentElement.parentElement.querySelector('.name-contact').focus();
    btnEdit.classList.remove('edit');
    btnEdit.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 close">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>`;
}
// CLOSE CONTACT
function closeContact(btnEdit, dataId) {
    let newValueName = btnEdit.parentElement.parentElement.querySelector('.name-contact').value;
    let newValueLastName = btnEdit.parentElement.parentElement.querySelector('.last-name-contact').value;
    btnEdit.parentElement.parentElement.querySelector('.name-contact').setAttribute('readonly', true);
    btnEdit.parentElement.parentElement.querySelector('.last-name-contact').setAttribute('readonly', true)
    btnEdit.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 svg-edit"><path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" /></svg> 
    `;
    if (NAME_REGEX.test(newValueName) && NAME_REGEX.test(newValueLastName)){
        changeName(dataId, newValueName, newValueLastName)
    } else {
        alert('Debes ingresar el nombre o apellido correctamente');
        editContact(btnEdit);
    }
}
// CHANGE NAME CONTACT
function changeName(dataId, newValueName, newValueLastName) {
    contacts.map( contact => {
        if (dataId === contact.id) {
            contact.name = newValueName;
            contact.lastName = newValueLastName;
            createList(contacts)
            return contact
        }
        })
}
// REMOVE CONTACT
function removeContact(dataId) {
    contacts = contacts.filter(contact => dataId !== contact.id);
    createList(contacts);
}
// SET ITEM IN THE LOCAL STORAGE
function setLocalStorage() {
    localStorage.setItem('contactsUser', JSON.stringify(contacts));
    
}
// GET ITEM IN THE LOCAL STORAGE
function getLocalStorage() {
    contacts = contacts = JSON.parse(localStorage.getItem('contactsUser')) || [];
    createList(contacts);
    
}
// FILL SELECT WITH AN ARRAY
function fillSelect() {
    countries.forEach(country => {
        const option = document.createElement('OPTION');
        const {name, flag, code, dial_code} = country;
        option.value = dial_code;
        option.dataset.countryCode = code;
        option.dataset.countryFlag = flag;
        option.innerHTML = `${name} ${flag}`;
        selectCountry.appendChild(option);
    })
}
