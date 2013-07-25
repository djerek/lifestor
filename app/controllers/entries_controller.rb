class EntriesController < ApplicationController
  def index
    # I think we may actually want all entries to show up by default, with search as an add-on
    #@entries = Entry.all
    @entries = Entry.titlesearch(params[:titlesearch])
    @entries = Entry.messagesearch(params[:messagesearch]) if params[:messagesearch].present?
    @entries = Entry.writtenonsearch(params[:writtenonsearch]) if params[:writtenonsearch].present?
    @entries = Entry.tagssearch(params[:tagssearch]) if params[:tagssearch].present?
    @entries_by_date = @entries.group_by(&:written_on)
    #@names = @entry
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

    @lat = params[:latitude]
    @long = params[:longitude]
  end

  def create
    @entry = Entry.new(entry_params)
    @entry.user = current_user

    if !@entry.location
      # no location id given
      # raise "no location given".to_yaml
      location = Location.new
      location.latitude = @entry.latitude
      location.longitude = @entry.longitude
      location.address = @entry.address
      location.title = @entry.title
      location.user = current_user
      @entry.location = location
    elsif @entry.location.user != current_user
      raise "what".to_yaml
    end

    @entry.user = current_user

    if @entry.save
      location.save
      redirect_to locations_showmap_path, :notice => "Successfully created entry."
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
        :remote_image_url, :latitude, :longitude, :tag_list, :written_on, :user_id,
        answers_attributes: [:content, :question_id])
      # :tag_tokens
    end
end
