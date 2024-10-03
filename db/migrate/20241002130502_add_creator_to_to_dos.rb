class AddCreatorToToDos < ActiveRecord::Migration[6.1]
  def change
    add_column :to_dos, :creator_id, :integer
  end
end
