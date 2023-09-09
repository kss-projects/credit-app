document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('creditApplicationForm');
    const pages = Array.from(form.querySelectorAll('.form-page'));
    const nextButton = form.querySelector('#nextButton');
    const previousButton = form.querySelector('#previousButton');
    const submitButton = form.querySelector('#submitButton');
    let currentPage = 0;

    // Define countries, states, and cities
    const countries = ['Canada', 'United States'];
    const states = {
        'Canada': ['Alberta', 'British Columbia', 'Manitoba', 'New Brunswick', 'Newfoundland and Labrador', 'Nova Scotia', 'Ontario', 'Prince Edward Island', 'Quebec', 'Saskatchewan'],
        'United States': ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming']
    };
    const cities = {
        'Canada': {
            'Alberta': ['Calgary', 'Edmonton'],
            'British Columbia': ['Vancouver', 'Victoria'],
            // ...
        },
        'United States': {
            'Alabama': ['Birmingham', 'Huntsville'],
            'Alaska': ['Anchorage', 'Fairbanks'],
            // ...
        }
    };

    // Populate country options
    const countrySelects = Array.from(form.querySelectorAll('select[name$="Country"]'));
    countrySelects.forEach(select => {
        select.innerHTML = `<option value="" disabled selected>Select a country</option>`;
        countries.forEach(country => {
            select.innerHTML += `<option value="${country}">${country}</option>`;
        });
    });

    // Populate state options when a country is selected
    countrySelects.forEach(select => {
        select.addEventListener('change', function() {
            const selectedCountry = this.value;
            const stateSelect = this.closest('.form-column').querySelector('select[name$="State"]');
            stateSelect.innerHTML = `<option value="" disabled selected>Select a state</option>`;
            states[selectedCountry].forEach(state => {
                stateSelect.innerHTML += `<option value="${state}">${state}</option>`;
            });
            stateSelect.disabled = false;
        });
    });

    // Populate city options when a state is selected
    const stateSelects = Array.from(form.querySelectorAll('select[name$="State"]'));
    stateSelects.forEach(select => {
        select.addEventListener('change', function() {
            const selectedState = this.value;
            const selectedCountry = this.closest('.form-column').querySelector('select[name$="Country"]').value;
            const citySelect = this.closest('.form-column').querySelector('select[name$="City"]');
            citySelect.innerHTML = `<option value="" disabled selected>Select a city</option>`;
            cities[selectedCountry][selectedState].forEach(city => {
                citySelect.innerHTML += `<option value="${city}">${city}</option>`;
            });
            citySelect.disabled = false;
        });
    });

    // Show the first page and disable the previous button
    pages[currentPage].classList.add('active');
    previousButton.disabled = true;

    // Handle next button click
    nextButton.addEventListener('click', function() {
        pages[currentPage].classList.remove('active');
        currentPage++;
        pages[currentPage].classList.add('active');
        previousButton.disabled = false;
        if (currentPage === pages.length - 1) {
            nextButton.disabled = true;
            submitButton.disabled = false;
        }
    });

    // Handle previous button click
    previousButton.addEventListener('click', function() {
        pages[currentPage].classList.remove('active');
        currentPage--;
        pages[currentPage].classList.add('active');
        nextButton.disabled = false;
        submitButton.disabled = true;
        if (currentPage === 0) {
            previousButton.disabled = true;
        }
    });
});


document.addEventListener('DOMContentLoaded', function() {
    // ... [Your existing code above]

    // 1. Form Validation
    function validatePage(page) {
        const requiredFields = page.querySelectorAll('[required]');
        for (let field of requiredFields) {
            if (!field.value) {
                alert("Please fill out all required fields before proceeding.");
                return false;
            }
        }
        return true;
    }

    // 2. Dynamic content loading
    const deliveryOptions = form.querySelector('[name="deliveryOption"]');
    const shippingAddressSection = form.querySelector('#shippingAddressSection');
    if (deliveryOptions) {
        deliveryOptions.addEventListener('change', function() {
            if (this.value === 'Delivery') {
                shippingAddressSection.style.display = 'block';
            } else {
                shippingAddressSection.style.display = 'none';
            }
        });
    }

    // Handle next button click with validation
    nextButton.addEventListener('click', function() {
        if (!validatePage(pages[currentPage])) return;

        pages[currentPage].classList.remove('active');
        currentPage++;
        pages[currentPage].classList.add('active');
        previousButton.disabled = false;

        if (currentPage === pages.length - 1) {
            nextButton.disabled = true;
            submitButton.disabled = false;
        }
    });

    // 3. AJAX form submission
    form.addEventListener("submit", function(event) {
        event.preventDefault();

        let formData = new FormData(form);
        fetch('YOUR_SERVER_ENDPOINT_HERE', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            alert('Form submitted successfully!');
        })
        .catch(error => {
            console.error('Error:', error);
            alert('There was an error submitting the form.');
        });
    });
});
