// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Search functionality
const btnSearch = document.querySelector('.btn-search');
if (btnSearch) {
    btnSearch.addEventListener('click', function (e) {
        e.preventDefault();
        const searchBar = document.querySelector('.search-bar');
        const searchInput = searchBar.querySelector('input[type="text"]');
        const dateSelect = searchBar.querySelectorAll('select')[0];
        const timeSelect = searchBar.querySelectorAll('select')[1];

        console.log('Search:', {
            query: searchInput.value,
            date: dateSelect.value,
            time: timeSelect.value
        });

        // Here you would typically send this data to a server
        alert('Fitur pencarian akan segera tersedia!');
    });
}

// Button click handlers
const btnExplore = document.querySelector('.btn-explore');
if (btnExplore) {
    btnExplore.addEventListener('click', function () {
        document.querySelector('.sports-section').scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
}

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe feature cards and venue cards
document.querySelectorAll('.feature-card, .venue-card, .sport-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Set today's date as default for date select
const dateSelect = document.querySelector('.search-item select');
if (dateSelect && dateSelect.options[0]) {
    // This is handled by the HTML default selection
}

// File upload handler for venue photo
const venuePhotoInput = document.querySelector('#venue-photo');
if (venuePhotoInput) {
    venuePhotoInput.addEventListener('change', function (e) {
        const file = e.target.files[0];
        if (file) {
            const uploadContent = document.querySelector('.file-upload-content');
            if (uploadContent) {
                const uploadText = uploadContent.querySelector('.upload-text');
                if (uploadText) {
                    uploadText.textContent = file.name;
                }
            }
        }
    });
}

// Time slot selection for detail page
document.querySelectorAll('.time-slot').forEach(slot => {
    slot.addEventListener('click', function () {
        document.querySelectorAll('.time-slot').forEach(s => s.classList.remove('selected'));
        this.classList.add('selected');
    });
});

// Date picker label update
const datePicker = document.querySelector('#datePicker');
const dateLabel = document.querySelector('.date-label');
if (datePicker && dateLabel) {
    // Set default to today
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    datePicker.value = todayStr;
    dateLabel.textContent = 'Hari Ini';

    // Make label clickable
    dateLabel.addEventListener('click', function (e) {
        e.stopPropagation();
        datePicker.showPicker ? datePicker.showPicker() : datePicker.click();
    });

    datePicker.addEventListener('change', function () {
        const selectedDate = new Date(this.value);
        const today = new Date();
        const todayStr = today.toISOString().split('T')[0];
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        const tomorrowStr = tomorrow.toISOString().split('T')[0];

        if (this.value === todayStr) {
            dateLabel.textContent = 'Hari Ini';
        } else if (this.value === tomorrowStr) {
            dateLabel.textContent = 'Besok';
        } else {
            const options = { day: 'numeric', month: 'long', year: 'numeric' };
            dateLabel.textContent = selectedDate.toLocaleDateString('id-ID', options);
        }
    });
}

// Time picker label update
const timePicker = document.querySelector('#timePicker');
const timeLabel = document.querySelector('.time-label');
if (timePicker && timeLabel) {
    // Set default time to evening (20:00)
    timePicker.value = '20:00';
    timeLabel.textContent = '20:00';

    // Make label clickable
    timeLabel.addEventListener('click', function (e) {
        e.stopPropagation();
        timePicker.showPicker ? timePicker.showPicker() : timePicker.click();
    });

    timePicker.addEventListener('change', function () {
        if (this.value) {
            const [hours, minutes] = this.value.split(':');
            const timeStr = `${hours}:${minutes}`;
            timeLabel.textContent = timeStr;
        } else {
            timeLabel.textContent = '20:00';
        }
    });
}

console.log('SportifyField website loaded successfully!');
