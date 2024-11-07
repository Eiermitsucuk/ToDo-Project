class ToDosController < ApplicationController
  before_action :set_to_do, only: %i[show edit update destroy]
  before_action :authenticate_user!  # Ensure only authenticated users can access

  # GET /to_dos or /to_dos.json
  def index
    @to_dos = policy_scope(ToDo).order(created_at: :desc).group_by(&:status)  # Use Pundit scope to filter todos

    respond_to do |format|
      format.html
      format.json { render json: @to_dos }
      format.pdf do
        pdf = ToDoPdf.new(@to_dos)
        send_data pdf.render, filename: 'to_dos.pdf', type: 'application/pdf', disposition: 'inline'
      end
    end
  end


  # GET /to_dos/1 or /to_dos/1.json
  def show
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
    @to_do = current_user.created_todos.build(to_do_params)  # Assign creator
    @to_do.assignee_id = params[:to_do][:assignee_id] if params[:to_do][:assignee_id].present?  # Assign to another user

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

  def update_status
    @to_do = ToDo.find(params[:id]) 
    
    if @to_do.update(status: params[:status])
      render json: { message: 'Status updated' }, status: :ok
    else
      render json: { error: 'Error updating status' }, status: :unprocessable_entity
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

  # DELETE /to_dos/1 or /to_dos/1.json
  def destroy
    authorize(@to_do)
    @to_do.destroy
    respond_to do |format|
      format.html { redirect_to to_dos_url, notice: "To do was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private

  def set_to_do
    @to_do = ToDo.find_by(id: params[:id])
    unless @to_do
      redirect_to to_dos_url, alert: "To do not found."  
    end
  end

  def to_do_params
    params.require(:to_do).permit(:title, :description, :status, :assignee_id)
  end
end
