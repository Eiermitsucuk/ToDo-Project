class DropTodosTable < ActiveRecord::Migration[7.1]
  def up
    drop_table :todos
  end

  def down
    create_table :todos do |t|
      t.string :title
      t.text :description
      t.integer :status
      t.datetime :due_date
      t.timestamps
    end
  end
end
