// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import "@hotwired/turbo-rails"
import "controllers"
import "Custom"
document.addEventListener('DOMContentLoaded', function() {
    const dropdown = document.querySelector('.dropdown');
    const dropdownContent = dropdown.querySelector('.dropdown-content');
    const selectedStatus = document.getElementById('selected-status');
    const hiddenStatusField = document.getElementById('hidden-status-field');

    // Toggle dropdown content visibility
    dropdown.querySelector('.dropbtn').addEventListener('click', function() {
        dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
    });

    // Update the status when an option is clicked
    dropdownContent.addEventListener('click', function(e) {
        if (e.target.tagName === 'A') {
            e.preventDefault(); // Prevent default link behavior

            const statusText = e.target.textContent;
            const statusValue = e.target.getAttribute('data-status-value');

            // Update the selected status text and hidden field value
            selectedStatus.textContent = statusText;
            hiddenStatusField.value = statusValue;

            // Hide the dropdown content after selection
            dropdownContent.style.display = 'none';
        }
    });

    // Close dropdown if clicked outside
    document.addEventListener('click', function(e) {
        if (!dropdown.contains(e.target)) {
            dropdownContent.style.display = 'none';
        }
    });
});
