class CreateToDos < ActiveRecord::Migration[7.1]
  def change
    create_table :to_dos do |t|
      t.string :title
      t.text :description
      t.integer :status
      t.datetime :createTime
      t.references :creator, foreign_key: { to_table: :users }, null: false
      t.references :assignee, foreign_key: { to_table: :users }, null: true

      t.timestamps
    end
  end
end
