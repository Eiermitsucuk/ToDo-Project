class ToDo < ApplicationRecord
  enum status: { to_do: 0, in_progress: 1, done: 2 }

  belongs_to :creator, class_name: 'User', foreign_key: :creator_id
  belongs_to :assignee, class_name: 'User', optional: true

  before_create :set_create_time

  private

  def set_create_time
    self.createTime ||= Time.current
  end
end
