class ToDo < ApplicationRecord
  enum status: { to_do: 0, in_progress: 1, done: 2 }

  before_create :set_create_time

  private

  def set_create_time
    self.createTime ||= Time.current
  end
end
