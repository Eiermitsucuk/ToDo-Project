class Todo < ApplicationRecord
  enum status: { to_do: 0, in_progress: 1, done: 2 }
end