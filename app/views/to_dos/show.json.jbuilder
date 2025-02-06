json.partial! "to_dos/to_do", to_do: @to_do
json.extract! @to_do, :id, :title, :description, :status, :deadline, :created_at, :updated_at
json.creator @to_do.creator.email
json.assignee @to_do.assignee&.mail