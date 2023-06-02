import modalHtml from "./render-modal.html?raw";
import "./render-modal.css";
import { User } from "../../models/user";
import { getUserById } from "../../use-cases/get-user-by-id";

let modal, form;
let loadedUser;

/**
 * 
 * @param {String|Number} id 
 * @returns 
 */
export const showModal = async (id) => {
    modal?.classList.remove('hide-modal');
    loadedUser = {};
    if (!id) return;
    const user = await getUserById(id);
    setFormValues(user);
}

export const hideModal = () => {
    modal?.classList.add('hide-modal');
    form?.reset();
}

/**
 * 
 * @param {User} user 
 */
const setFormValues = (user) => {
    form.querySelector('[name="firstName"]').value = user.firstName;
    form.querySelector('[name="lastName"]').value = user.lastName;
    form.querySelector('[name="balance"]').value = user.balance;
    form.querySelector('[name="isActive"]').checked = user.isActive;
    form.querySelector('[name="isActive"]').value = user.isActive;
    console.log(form);
    loadedUser = user;
}

/**
 * 
 * @param {HTMLDivElement} element 
 * @param {(userLike)=>Promise<void>} callback 
 * @returns 
 */
export const renderModal = (element, callback) => {
    if (modal) return;
    modal = document.createElement('div');
    modal.innerHTML = modalHtml;
    modal.className = 'modal-container hide-modal';
    form = modal.querySelector('form');
    modal.addEventListener('click', (event) => {
        if (event.target.className === 'modal-container') {
            hideModal();
        };
    });
    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(form);
        if (!formData.get('isActive')) {
            formData.append('isActive', 'off');
        }
        const userLike = { ...loadedUser };
        for (const [key, value] of formData) {
            console.log(userLike[key], value);
            if (key === 'balance') {
                userLike[key] = Number(value);
                continue;
            }
            if (key === 'isActive') {
                userLike[key] = document.getElementById("is-active").checked;
                //(value === 'on') ? true : false;
                continue;
            }
            userLike[key] = value;
        }
        await callback(userLike);
        hideModal();
    });
    element.append(modal);
}