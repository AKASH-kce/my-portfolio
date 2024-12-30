document.addEventListener('DOMContentLoaded', () => {
    // function showContactPopup() {
    //     const contactPopup = document.querySelector('.contact-popup');
    //     if (contactPopup) {
    //         contactPopup.style.display = 'flex';
    //     }
    // }

    function closeContactPopup() {
        const contactPopup = document.querySelector('.contact-popup');
        if (contactPopup) {
            contactPopup.style.display = 'none';
        }
    }

    const popupClose = document.querySelector('.popup-close');
    if (popupClose) {
        popupClose.addEventListener('click', closeContactPopup);
    }

    const smileDiv = document.querySelector('.smile');
    if (smileDiv) {
        smileDiv.addEventListener('click', showContactPopup);
    }
});

document.addEventListener('DOMContentLoaded', () => {

    // Function to show the contact popup
    function showContactPopup() {
        const contactPopup = document.querySelector('.contact-popup');
        if (contactPopup) {
            contactPopup.style.display = 'flex'; // Show the popup
        }
    }

    // Function to close the contact popup
    function closeContactPopup() {
        const contactPopup = document.querySelector('.contact-popup');
        if (contactPopup) {
            contactPopup.style.display = 'none'; // Hide the popup
        }
    }

    // Adding event listener to the popup close button
    const popupClose = document.querySelector('.popup-close');
    if (popupClose) {
        popupClose.addEventListener('click', closeContactPopup);
    }

    // Adding event listener to the "Contact" menu item
    const contactMenuItem = document.querySelector('li p');  // Assuming it's the "Contact" item
    if (contactMenuItem) {
        contactMenuItem.addEventListener('click', showContactPopup);  // Show popup on click
    }

    // Handle menu toggle for mobile
    let menuIcon = document.querySelector('.fa-bars'); // Correct the class for menu icon
    let navbar = document.querySelector('.navbar');
    
    if (menuIcon) {
        menuIcon.onclick = () => {
            menuIcon.classList.toggle('fa-x');
            navbar.classList.toggle('active');
        };
    }

    // Scroll behavior for active navigation links
    let sections = document.querySelectorAll('section');
    let navLinks = document.querySelectorAll('header nav a');
    
    window.onscroll = () => {
        sections.forEach(sec => {
            let top = window.scrollY;
            let offset = sec.offsetTop - 150;
            let height = sec.offsetHeight;
            let id = sec.getAttribute('id');

            if (top >= offset && top < offset + height) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    const activeLink = document.querySelector(`header nav a[href*=${id}]`);
                    if (activeLink) {
                        activeLink.classList.add('active');
                    }
                });
            }
        });
    };

    // GitHub API call to fetch projects
    const apiUrls = [
        'https://api.github.com/users/AKASH-kce/repos',
        'https://api.github.com/users/AKASH-SETTUKANNU/repos'
    ];

    Promise.all(apiUrls.map(url => fetch(url).then(response => response.json())))
    .then(responses => {
        const container = document.getElementById('github-projects-container');
        if (!container) {
            console.error('Projects container not found!');
            return;
        }

        responses.forEach(repos => {
            repos.forEach(repo => {
                const repoCard = document.createElement('div');
                repoCard.classList.add('github-projects-box');
                const icon = document.createElement('i');
                icon.classList.add('fa-solid', 'fa-code', 'fa-brands', 'fa-github', 'github-icon-heading');
                const title = document.createElement('h4');
                title.classList.add('github-project-heading');
                title.textContent = repo.name;
                const link = document.createElement('a');
                link.classList.add('github-project-link');
                link.href = repo.html_url;
                link.target = '_blank';
                link.textContent = 'View Project';

                repoCard.appendChild(icon);
                repoCard.appendChild(title);
                repoCard.appendChild(link);

                container.appendChild(repoCard);
            });
        });
    })
    .catch(error => {
        console.error('Error fetching GitHub projects:', error);
    });

});
