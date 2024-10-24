document.addEventListener('DOMContentLoaded', function() {
    const columns = ['to_do_list', 'in_progress_list', 'done_list'];

    columns.forEach(function(column) {
        const list = document.getElementById(column);
        if (list) {
            new Sortable(list, {
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
                    }).then(response => {
                        if (!response.ok) {
                            alert("Error updating status");
                        }
                    });
                }
            });
        }
    });
});
