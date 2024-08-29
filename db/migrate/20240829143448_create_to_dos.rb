class CreateToDos < ActiveRecord::Migration[7.1]
  def change
    create_table :to_dos do |t|
      t.string :title
      t.text :description
      t.integer :status
      t.datetime :createTime

      t.timestamps
    end
  end
end
