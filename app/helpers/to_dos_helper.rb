module ToDosHelper
  def deadline_class(to_do)
    return "text-danger" if to_do.deadline && to_do.deadline < Time.current
    return "text-warning" if to_do.deadline && to_do.deadline < Time.current + 3.days

    "text-success"
  end
end
