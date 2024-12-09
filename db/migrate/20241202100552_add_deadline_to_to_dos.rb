class AddDeadlineToToDos < ActiveRecord::Migration[7.1]
  def change
    add_column :to_dos, :deadline, :datetime
  end
end
