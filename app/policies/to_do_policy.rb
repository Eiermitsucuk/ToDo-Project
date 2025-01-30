class ToDoPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      if user.admin? || user.project_manager?
        scope.all
      else
        scope.where(assignee_id: user.id)
      end
    end
  end

  def destroy?
    user.admin?
  end

  def edit?
    user.admin? || user.project_manager?
  end
  def show?
    user.admin? || user.project_manager? || record.assignee_id == user.id
  end

  def update?
    user.admin? || user.project_manager?
  end
end
