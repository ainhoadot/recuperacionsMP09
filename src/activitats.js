document.addEventListener('DOMContentLoaded', function () {
    const button = document.querySelector('[data-collapse-toggle]');
    const menu = document.getElementById('navbar-default');
    const locationFilter = document.getElementById('location-filter');

    button.addEventListener('click', function () {
        menu.classList.toggle('hidden');
        menu.classList.toggle('block');
    });

    fetch('https://6644bc6db8925626f88fb8d6.mockapi.io/api/v1/activities')
        .then(response => response.json())
        .then(data => {
            const activitiesContainer = document.getElementById('activities-container');

            data.forEach(activity => {
                const activityCard = document.createElement('div');
                activityCard.classList.add('bg-gray-300', 'rounded-lg', 'p-8', 'relative', 'transition', 'transform', 'hover:shadow-xl');

                const deleteButton = document.createElement('button');
                deleteButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 absolute top-2 right-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>';
                deleteButton.classList.add('delete-button', 'text-red-600', 'hover:text-red-800');
                deleteButton.setAttribute('aria-label', 'Eliminar activitat'); // Afegir aria-label
                deleteButton.addEventListener('click', function () {
                    deleteActivity(activity.id);
                });
                activityCard.appendChild(deleteButton);

                const title = document.createElement('h2');
                title.classList.add('text-xl', 'font-semibold', 'text-gray-800', 'mb-2');
                title.textContent = activity.name;
                activityCard.appendChild(title);

                const location = document.createElement('p');
                location.classList.add('text-sm', 'text-gray-600', 'mb-2');
                location.innerHTML = `<span class="font-semibold">Ubicació:</span> ${activity.location}`;
                activityCard.appendChild(location);

                const date = document.createElement('p');
                date.classList.add('text-sm', 'text-gray-600', 'mb-4');
                const formattedDate = new Date(activity.date * 1000).toLocaleDateString('es-ES');
                date.innerHTML = `<span class="font-semibold">Data:</span> ${formattedDate}`;
                activityCard.appendChild(date);

                const description = document.createElement('p');
                description.classList.add('text-sm', 'text-gray-700', 'leading-relaxed');
                description.textContent = activity.description;
                activityCard.appendChild(description);

                activityCard.id = activity.id;

                activitiesContainer.appendChild(activityCard);
            });

            locationFilter.addEventListener('change', function () {
                const selectedLocation = locationFilter.value;
                filterActivities(selectedLocation);
            });
        });
});

function deleteActivity(activityId) {
    const activityElement = document.getElementById(activityId);
    activityElement.remove();

    fetch(`https://6644bc6db8925626f88fb8d6.mockapi.io/api/v1/activities/${activityId}`, {
        method: 'DELETE'
    })
        .then(response => response.json())
        .then(data => {
            console.log(`Actividad con ID ${activityId} eliminada.`);
        })
        .catch(error => {
            console.error('Error al eliminar la actividad:', error);
        });
}

function filterActivities(selectedLocation) {
    const activityCards = document.querySelectorAll('.bg-gray-300');

    activityCards.forEach(card => {
        const location = card.querySelector('.font-semibold').nextSibling.textContent.trim().toLowerCase();
        const isAllSelected = selectedLocation === 'all';
        const matchesLocation = location.includes(selectedLocation.toLowerCase());
        
        if (isAllSelected || matchesLocation) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}
