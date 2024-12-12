document.addEventListener('DOMContentLoaded', function() {
    const columns = ['to_do_list', 'in_progress_list', 'done_list'];

    columns.forEach(function(column) {
        new Sortable(document.getElementById(column), {
            group: 'shared',
            animation: 150,
            onEnd: function(evt) {
                const itemId = evt.item.dataset.id;
                const newStatus = evt.to.dataset.status;

                fetch(`/to_dos/${itemId}/update_status`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                    },
                    body: JSON.stringify({ status: newStatus })
                })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error("Error updating status");
                        }
                        alert.response;
                    })
                    .then (data => {
                        console.log(data.message);
                    })
                    .catch(error => {
                        console.error("Network error", error);
                    });
            }
        });
    });
});


// database_authenticable, helpers, application_controller, rememberable, gem "pundit",