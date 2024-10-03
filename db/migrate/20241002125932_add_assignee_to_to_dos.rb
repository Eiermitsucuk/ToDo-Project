class AddAssigneeToToDos < ActiveRecord::Migration[6.0]
  def change
    add_column :to_dos, :assignee_id, :integer
  end
end
