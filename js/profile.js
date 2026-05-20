/* ============================================
   Urban Threads - Profile Page JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    // --- Profile Edit/Save Logic ---
    const profileForm = document.getElementById('profileForm');
    const formInputs = profileForm.querySelectorAll('input:not(#password)');
    const editButton = document.getElementById('editButton');
    const saveButton = document.getElementById('saveButton');
    const cancelButton = document.getElementById('cancelButton');
    let initialFormValues = {};

    const storeInitialValues = () => formInputs.forEach(input => initialFormValues[input.id] = input.value);
    const restoreInitialValues = () => formInputs.forEach(input => input.value = initialFormValues[input.id]);

    const setViewMode = () => {
        formInputs.forEach(input => input.disabled = true);
        editButton.classList.remove('hidden');
        saveButton.classList.add('hidden');
        cancelButton.classList.add('hidden');
    };

    const setEditMode = () => {
        storeInitialValues();
        formInputs.forEach(input => input.disabled = false);
        editButton.classList.add('hidden');
        saveButton.classList.remove('hidden');
        cancelButton.classList.remove('hidden');
        document.getElementById('firstName').focus();
    };

    editButton.addEventListener('click', setEditMode);
    cancelButton.addEventListener('click', () => {
        restoreInitialValues();
        setViewMode();
    });
    profileForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Profile updated successfully!');
        setViewMode();
    });
    storeInitialValues();

    // --- Tab Navigation Logic ---
    const navLinks = document.querySelectorAll('.profile-nav-link');
    const contentSections = document.querySelectorAll('.content-section');
    navLinks.forEach(link => {
        if (link.textContent === 'Logout') return;
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            navLinks.forEach(nav => nav.classList.remove('active'));
            link.classList.add('active');
            contentSections.forEach(section => {
                section.id === targetId ? section.classList.remove('hidden') : section.classList.add('hidden');
            });
        });
    });

    // --- Address Modal Logic ---
    const addressModal = document.getElementById('addressModal');
    const addNewAddressBtn = document.getElementById('addNewAddressBtn');
    const modalClose = addressModal.querySelector('.modal-close');
    const modalOverlay = addressModal.querySelector('.modal-overlay');
    const useLocationBtn = document.getElementById('useLocationBtn');
    const manualEntryBtn = document.getElementById('manualEntryBtn');
    const locationPermissionDiv = document.getElementById('location-permission');
    const addressForm = document.getElementById('addressForm');
    const addressList = document.getElementById('addressList');
    const noAddressPlaceholder = document.getElementById('no-address');

    const openModal = () => {
        addressModal.classList.remove('hidden');
        setTimeout(() => addressModal.querySelector('.modal-container').classList.remove('scale-95'), 50);
    };
    const closeModal = () => {
        addressModal.querySelector('.modal-container').classList.add('scale-95');
        setTimeout(() => {
            addressModal.classList.add('hidden');
            locationPermissionDiv.classList.remove('hidden');
            addressForm.classList.add('hidden');
            addressForm.reset();
        }, 300);
    };

    addNewAddressBtn.addEventListener('click', openModal);
    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', closeModal);

    manualEntryBtn.addEventListener('click', () => {
        locationPermissionDiv.classList.add('hidden');
        addressForm.classList.remove('hidden');
    });

    useLocationBtn.addEventListener('click', () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    // SIMULATED: In a real app, you would use a reverse geocoding API
                    alert('Location accessed! Filling in with dummy data.');
                    const form = addressForm.elements;
                    form.address1.value = '123 Tech Street';
                    form.city.value = 'Innovate City';
                    form.state.value = 'California';
                    form.pincode.value = '90210';
                    form.country.value = 'USA';
                    locationPermissionDiv.classList.add('hidden');
                    addressForm.classList.remove('hidden');
                },
                (error) => {
                    alert('Could not get location. Please enter manually.');
                    console.error("Geolocation error:", error);
                    locationPermissionDiv.classList.add('hidden');
                    addressForm.classList.remove('hidden');
                }
            );
        } else {
            alert("Geolocation is not supported by this browser.");
            locationPermissionDiv.classList.add('hidden');
            addressForm.classList.remove('hidden');
        }
    });

    addressForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(addressForm);
        const data = Object.fromEntries(formData.entries());

        if (noAddressPlaceholder) noAddressPlaceholder.classList.add('hidden');

        const addressCard = `
            <div class="border rounded-lg p-4 flex justify-between items-start">
                <div>
                    <div class="flex items-center gap-3 mb-1">
                        <h4 class="font-bold text-lg">${data.fullName}</h4>
                        <span class="text-xs font-semibold bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full">${data.addressType}</span>
                    </div>
                    <p class="text-gray-600 text-sm">${data.address1}, ${data.address2 ? data.address2 + ', ' : ''}${data.city}, ${data.state} - ${data.pincode}</p>
                    <p class="text-gray-600 text-sm">Mobile: ${data.mobile}</p>
                </div>
                <div class="flex gap-2">
                   <button class="text-gray-500 hover:text-blue-600"><i data-feather="edit-2" class="w-4 h-4"></i></button>
                   <button class="delete-address text-gray-500 hover:text-red-600"><i data-feather="trash-2" class="w-4 h-4"></i></button>
                </div>
            </div>
        `;
        addressList.insertAdjacentHTML('beforeend', addressCard);
        feather.replace();
        closeModal();
    });

    addressList.addEventListener('click', (e) => {
        if (e.target.closest('.delete-address')) {
            e.target.closest('.border').remove();
            if (addressList.children.length === 1) { // Only placeholder is left
                noAddressPlaceholder.classList.remove('hidden');
            }
        }
    });
});
