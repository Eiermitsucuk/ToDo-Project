# frozen_string_literal: true
class ToDoPolicy < ApplicationPolicy
  # Define scope for fetching todos
  class Scope < Scope
    def resolve
      user.admin? ? scope.all : scope.where(assignee_id: user.id)
    end
  end

  # Only admins can delete todos
  def destroy?
    user.admin?
  end

  # Authorization for viewing a specific todo
  def show?
    user.admin? || record.assignee_id == user.id
  end
end
