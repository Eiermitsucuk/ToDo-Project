class CreateTodos < ActiveRecord::Migration[7.1]
  def change
    create_table :todos do |t|
      t.string :title
      t.text :description
      t.integer :status
      t.datetime :due_date

      t.timestamps
    end
  end
end
