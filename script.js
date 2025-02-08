// Program data
const programsData = [
    {
        id: 1,
        title: "Guru Mahima with Sadhguru",
        date: "12 Feb 2025",
        location: "Isha Yoga center, Coimbatore, India",
        type: "In-Person",
        isPaid: true,
        image: "sadhguru.png"
    },
    {
        id: 2,
        title: "Mahashivratri 2025",
        date: "26 Feb 2025",
        location: "Isha Yoga center, New Delhi, India",
        type: "Online",
        isPaid: true,
        image: "shivratri.png"
    },
    {
        id: 3,
        title: "Samyama with Sadhguru",
        date: "22 Mar 2025",
        location: "Isha Yoga center, Bengaluru, India",
        type: "Online",
        isPaid: false,
        image: "samyama.png"
    },
    {
        id: 4,
        title: "Soak in Ecstacy with Sadhguru",
        date: "20 Apr 2025",
        location: "Isha Yoga center, Bengaluru, India",
        type: "In-Person",
        isPaid: true,
        image: "sadhguru.png"
    },
    {
        id: 5,
        title: "Soak in Ecstacy with Sadhguru",
        date: "12 Feb 2025",
        location: "Isha Yoga center, New Delhi, India",
        type: "In-Person",
        isPaid: true,
        image: "sadhguru.png"
    },
    {
        id: 6,
        title: "Soak in Ecstacy with Sadhguru",
        date: "15 Aug 2025",
        location: "Isha Yoga center, Coimbatore, India",
        type: "Online",
        isPaid: false,
        image: "sadhguru.png"
    }
];

// Filter options
const filterOptions = {
    time: ['Next Week', 'This Month', 'Next Month', 'Next 3 Months'],
    language: ['Hindi', 'English', 'Kannada', 'Tamil', 'Telugu'],
    programType: ['Beginners', 'Advanced', 'Childrens', 'Health'],
    location: ['New Delhi', 'Bengaluru', 'Coimbatore']
};

// State management
let filters = {
    free: false,
    paid: false,
    online: false,
    offline: false,
    time: '',
    language: '',
    programType: '',
    location: ''
};

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    initializeFilters();
    renderPrograms(programsData);
});

// Initialize filter sections
function initializeFilters() {
    // Initialize expandable filter sections
    Object.keys(filterOptions).forEach(section => {
        const content = document.getElementById(`${section}Content`);
        content.innerHTML = filterOptions[section].map(option => `
            <div class="form-check">
                <input class="form-check-input" type="checkbox" 
                       id="${section}-${option.replace(/\s+/g, '')}"
                       data-section="${section}"
                       data-value="${option}">
                <label class="form-check-label" for="${section}-${option.replace(/\s+/g, '')}">
                    ${option}
                </label>
            </div>
        `).join('');
    });

    // Add event listeners
    document.querySelectorAll('.filter-button').forEach(button => {
        button.addEventListener('click', toggleFilterSection);
    });

    // Payment filter listeners
    document.getElementById('freeFilter').addEventListener('change', e => {
        filters.free = e.target.checked;
        updatePrograms();
    });

    document.getElementById('paidFilter').addEventListener('change', e => {
        filters.paid = e.target.checked;
        updatePrograms();
    });

    // Online/Offline filter listeners
    document.getElementById('onlineFilter').addEventListener('change', e => {
        filters.online = e.target.checked;
        updatePrograms();
    });

    document.getElementById('offlineFilter').addEventListener('change', e => {
        filters.offline = e.target.checked;
        updatePrograms();
    });

    // Add listeners for other filter checkboxes
    document.querySelectorAll('.filter-content .form-check-input').forEach(checkbox => {
        checkbox.addEventListener('change', handleFilterChange);
    });
}

// Toggle filter sections
function toggleFilterSection(event) {
    const button = event.currentTarget;
    const section = button.dataset.section;
    const content = document.getElementById(`${section}Content`);
    const icon = button.querySelector('.bi-chevron-down');
    
    content.style.display = content.style.display === 'none' ? 'block' : 'none';
    icon.classList.toggle('rotate-180');
}

// Handle filter changes
function handleFilterChange(event) {
    const { section, value } = event.target.dataset;
    
    // Toggle the filter value
    filters[section] = event.target.checked ? value : '';
    
    // Uncheck other options in the same section
    if (event.target.checked) {
        document.querySelectorAll(`[data-section="${section}"]`).forEach(checkbox => {
            if (checkbox !== event.target) {
                checkbox.checked = false;
            }
        });
    }
    
    updatePrograms();
}

// Update programs based on filters
function updatePrograms() {
    let filteredPrograms = programsData;

    // Apply free/paid filters
    if (filters.free || filters.paid) {
        filteredPrograms = filteredPrograms.filter(program => 
            (filters.free && !program.isPaid) || (filters.paid && program.isPaid)
        );
    }

    // Apply online/offline filters
    if (filters.online || filters.offline) {
        filteredPrograms = filteredPrograms.filter(program => 
            (filters.online && program.type === "Online") || 
            (filters.offline && program.type === "In-Person")
        );
    }

    renderPrograms(filteredPrograms);
}

// Render programs to the grid
function renderPrograms(programs) {
    const grid = document.getElementById('programsGrid');
    grid.innerHTML = programs.map(program => `
        <div class="col-md-6">
            <div class="program-card">
                <div class="d-flex gap-3">
                    <div class="program-image">
                        <img src="${program.image}" alt="${program.title}" class="img-fluid rounded">
                    </div>
                    <div class="flex-grow-1">
                        <h3 class="h5 mb-3">${program.title}</h3>
                        <div class="mb-3">
                            <div class="d-flex align-items-center mb-2">
                                <i class="bi bi-calendar me-2"></i>
                                <span>${program.date}</span>
                            </div>
                            <div class="d-flex align-items-center">
                                 <i class="bi bi-geo-alt me-2"></i>
                                <span>${program.location}</span>
                            </div>
                        </div>
                        <div>
                            <span class="tag ${program.type === 'Online' ? 'tag-online' : 'tag-offline'}">
                                ${program.type}
                            </span>
                            <span class="tag ${program.isPaid ? 'tag-paid' : 'tag-free'}">
                                ${program.isPaid ? 'Paid' : 'Free'}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

document.addEventListener('DOMContentLoaded', function() {
    // Create search section wrapper
    const searchSection = document.createElement('div');
    searchSection.className = 'search-section';
    
    // Move search input into the wrapper
    const searchInput = document.querySelector('.search-input');
    const searchInputParent = searchInput.parentElement;
    searchSection.appendChild(searchInput);
    
    // Create filter toggle button for mobile
    const filterToggle = document.createElement('button');
    filterToggle.className = 'filter-toggle d-md-none';
    filterToggle.innerHTML = '<i class="bi bi-funnel"></i> Filters';
    searchSection.appendChild(filterToggle);
    
    // Replace the original search container with the new wrapper
    searchInputParent.appendChild(searchSection);

    // Add close button to filters container
    const filtersContainer = document.querySelector('.filters-container');
    const filtersHeader = document.createElement('div');
    filtersHeader.className = 'filters-header d-md-none';
    filtersHeader.innerHTML = `
        <h3>Filters</h3>
        <button class="close-filters" aria-label="Close filters">×</button>
    `;
    filtersContainer.insertBefore(filtersHeader, filtersContainer.firstChild);

    // Toggle filters
    filterToggle.addEventListener('click', function() {
        filtersContainer.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    // Close filters
    document.querySelector('.close-filters').addEventListener('click', function() {
        filtersContainer.classList.remove('active');
        document.body.style.overflow = '';
    });

    // Close filters when clicking outside
    document.addEventListener('click', function(event) {
        if (filtersContainer.classList.contains('active') && 
            !filtersContainer.contains(event.target) && 
            !filterToggle.contains(event.target)) {
            filtersContainer.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Prevent closing when clicking inside filters
    filtersContainer.addEventListener('click', function(event) {
        event.stopPropagation();
    });

    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 450 && filtersContainer.classList.contains('active')) {
            filtersContainer.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});
