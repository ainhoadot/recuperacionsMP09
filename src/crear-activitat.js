document.addEventListener('DOMContentLoaded', function () {
    const button = document.querySelector('[data-collapse-toggle]');
    const menu = document.getElementById('navbar-default');

    button.addEventListener('click', function () {
        menu.classList.toggle('hidden');
        menu.classList.toggle('block');
    });

    const form = document.getElementById('add-activity-form');
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const description = document.getElementById('description').value;
        const location = document.getElementById('location').value;
        const date = document.getElementById('date').value;
        const image = document.getElementById('image').value;

        const selectedDate = new Date(date);
        const currentDate = new Date();
        const dateError = document.getElementById('date-error');

        if (selectedDate <= currentDate) {
            dateError.innerText = 'La data ha de ser superior a la data actual.';
            dateError.classList.add('text-red-600');
            dateError.classList.remove('hidden');
            return;
        } else {
            dateError.classList.add('hidden');
        }

        const newActivity = {
            name,
            description,
            location,
            date: selectedDate.getTime() / 1000,
            image
        };

        fetch('https://6644bc6db8925626f88fb8d6.mockapi.io/api/v1/activities', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newActivity)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Nueva actividad creada:', data);
            window.location.href = 'activitats.html';
        })
        .catch(error => {
            console.error('Error al crear la actividad:', error);
        });
    });
});
