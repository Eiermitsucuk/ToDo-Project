class ToDo < ApplicationRecord
  enum status: { to_do: 0, in_progress: 1, done: 2 }

  belongs_to :creator, class_name: 'User', foreign_key: :creator_id
  belongs_to :assignee, class_name: 'User', optional: true

  validates :creator, presence: true
  validates :deadline, presence: false # Set to `true` if deadlines are mandatory
  validate :deadline_cannot_be_in_the_past, if: :deadline?

  before_create :set_create_time

  # Scopes for filtering by deadline
  scope :overdue, -> { where("deadline < ?", Time.current) }
  scope :upcoming, -> { where("deadline >= ?", Time.current) }

  private

  # Set the create time to the current time if not already set
  def set_create_time
    self.createTime ||= Time.current
  end

  # Custom validation for deadline
  def deadline_cannot_be_in_the_past
    if deadline.present? && deadline < Time.current
      errors.add(:deadline, "can't be in the past")
    end
  end
end
