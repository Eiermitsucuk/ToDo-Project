class User < ApplicationRecord

  has_many :created_todos, class_name: 'ToDo', foreign_key: 'creator_id'
  has_many :assigned_todos, class_name: 'ToDo', foreign_key: 'assignee_id'

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
end
