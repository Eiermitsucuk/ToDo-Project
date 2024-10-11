class ToDoPdf < Prawn::Document
  def initialize(to_dos)
    super()
    @to_dos = to_dos
    header
    to_do_list
  end

  def header
    text "To Do List", size: 30, style: :bold
  end

  def to_do_list
    @to_dos.each do |status, todos|
      text "#{status.titleize}:", size: 20, style: :bold
      todos.each do |to_do|
        text "• #{to_do.title}: #{to_do.description}", size: 12
      end
      move_down 20
    end
  end
end
