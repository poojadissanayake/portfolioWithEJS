// loading all the pages on single page 
fetch('about.html')
    .then(response => response.text())
    .then(html => {
        document.getElementById('about').innerHTML = html;
    })
    .catch(error => console.error('Error loading the aboutme:', error));

fetch('projects.html')
    .then(response => response.text())
    .then(html => {
        document.getElementById('projects').innerHTML = html;
    })
    .catch(error => console.error('Error loading projects', error));

fetch('contact.html')
    .then(response => response.text())
    .then(html => {
        document.getElementById('contact').innerHTML = html;
    })
    .catch(error => console.error('Error loading contact form', error));


// getting the current year for copyright in footer
let day = new Date();
let year = day.getFullYear();

document.getElementById("year").innerHTML = year;