// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import "@hotwired/turbo-rails"
import "controllers"
import "Custom"
document.addEventListener('DOMContentLoaded', function() {
    const dropdown = document.querySelector('.dropdown');
    const dropdownContent = dropdown.querySelector('.dropdown-content');
    const selectedStatus = document.getElementById('selected-status');
    const hiddenStatusField = document.getElementById('hidden-status-field');

    dropdown.querySelector('.dropbtn').addEventListener('click', function() {
        dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
    });

    dropdownContent.addEventListener('click', function(e) {
        if (e.target.tagName === 'A') {
            e.preventDefault();

            const statusText = e.target.textContent;
            const statusValue = e.target.getAttribute('data-status-value');

            selectedStatus.textContent = statusText;
            hiddenStatusField.value = statusValue;

            dropdownContent.style.display = 'none';
        }
    });

    document.addEventListener('click', function(e) {
        if (!dropdown.contains(e.target)) {
            dropdownContent.style.display = 'none';
        }
    });
});
