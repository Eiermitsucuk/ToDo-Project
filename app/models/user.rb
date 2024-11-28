class User < ApplicationRecord
  ROLES = %w[user project_manager admin].freeze

  has_many :created_todos, class_name: 'ToDo', foreign_key: 'creator_id'
  has_many :assigned_todos, class_name: 'ToDo', foreign_key: 'assignee_id'

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  validates :role, inclusion: { in: ROLES }

  def project_manager?
    role == 'project_manager'
  end

  def admin?
    role == 'admin'
  end
end
