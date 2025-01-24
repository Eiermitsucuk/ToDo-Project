class ToDosController < ApplicationController
  before_action :set_to_do, only: %i[show edit update destroy update_status]
  before_action :authorize_todo, only: %i[show edit update destroy]

  # GET /to_dos or /to_dos.json
  def index
    # Fetch todos, group by status, and order by deadline (earliest first) and created_at
    @to_dos = policy_scope(ToDo).order(deadline: :asc, created_at: :desc).group_by(&:status)

    respond_to do |format|
      format.html
      format.json do
        response.headers["Cache-Control"] = "no-store"
        render json: @to_dos
        end
      format.pdf do
        pdf = ToDoPdf.new(@to_dos)
        send_data pdf.render, filename: 'to_dos.pdf', type: 'application/pdf', disposition: 'inline'
      end
    end
  end

  # GET /to_dos/1 or /to_dos/1.json
  def show
    @to_do = ToDo.find(params[:id])

    respond_to do |format|
      format.html
      format.json { render json: @to_do.to_json(include: { creator: { only: :email }, assignee: { only: :email } }) }
    end
  end

  # GET /to_dos/new
  def new
    @to_do = ToDo.new
  end

  # GET /to_dos/1/edit
  def edit
  end

  # POST /to_dos or /to_dos.json
  def create
    @to_do = current_user.created_todos.build(to_do_params) # Assign creator
    @to_do.assignee_id = params[:to_do][:assignee_id] if params[:to_do][:assignee_id].present? # Assign to another user

    respond_to do |format|
      if @to_do.save
        format.html { redirect_to to_do_url(@to_do), notice: "To do was successfully created." }
        format.json { render :show, status: :created, location: @to_do }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @to_do.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /to_dos/1 or /to_dos/1.json
  def update
    respond_to do |format|
      if @to_do.update(to_do_params)
        format.html { redirect_to to_do_url(@to_do), notice: "To do was successfully updated." }
        format.json { render :show, status: :ok, location: @to_do }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @to_do.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH /to_dos/1/update_status
  def update_status
    if @to_do.update(status: params[:status])
      render json: { message: 'OkiDokiDostlar' }, status: :ok
    else
      render json: { error: 'Error updating status' }, status: :unprocessable_entity
    end
  end

  # DELETE /to_dos/1 or /to_dos/1.json
  def destroy
    @to_do = ToDo.find_by(id: params[:id])
      if @to_do.destroy
        head :no_content
      else
        head :not_found
      end
  end

  private

  def set_to_do
    @to_do = ToDo.find_by(id: params[:id])
    unless @to_do
      respond_to do |format|
        format.html { redirect_to to_dos_url, alert: "To do not found." }
        format.json { render json: { error: "To do not found" }, status: :not_found }
      end
    end
  end

  def authorize_todo
    authorize @to_do
  end

  def to_do_params
    # Permit deadline alongside other attributes
    params.require(:to_do).permit(:title, :description, :status, :assignee_id, :deadline)
  end
end
