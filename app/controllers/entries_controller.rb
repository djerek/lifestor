class EntriesController < ApplicationController
  def index
    # I think we may actually want all entries to show up by default, with search as an add-on
    @entries = Entry.all
    # @entries = Entry.search(params[:search])
    @entries_by_date = @entries.group_by(&:written_on)
  end

  def show
    @entry = Entry.find(params[:id])
  end

  def new
    @entry = Entry.new
    @questions = Question.all.select {|q| q.is_active }
    @questions.each do |q|
      @entry.answers.build(question: q)
    end
  end

  def create
    @entry = Entry.new(entry_params)
    @entry.user = current_user
    
    if @entry.save
      redirect_to @entry, :notice => "Successfully created entry."
    else
      render :action => 'new'
    end
  end

  def edit
    @entry = Entry.find(params[:id])
  end

  def update
    @entry = Entry.find(params[:id])
    if @entry.update_attributes(params[:entry])
      redirect_to @entry, :notice  => "Successfully updated entry."
    else
      render :action => 'edit'
    end
  end

  def destroy
    @entry = Entry.find(params[:id])
    @entry.destroy
    redirect_to entries_url, :notice => "Successfully destroyed entry."
  end

  def tags
    @tags = ActsAsTaggableOn::Tag.where("tags.name LIKE ?", "%#{params[:q]}%")
    respond_to do |format|
      format.json { render :json => @tags.map {|t| {:id => t.id, :name => t.name }}}
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_entry
      @user = Entry.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def entry_params
      params.require(:entry).permit(:message_type, :title, :message, :image, 
        :remote_image_url, :latitude, :longitude, :tag_list, :written_on, 
        answers_attributes: [:content, :question_id])
      # :tag_tokens
    end
end
