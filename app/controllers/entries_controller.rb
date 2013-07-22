class EntriesController < ApplicationController
  def index
    @entries = Entry.search(params[:search])
  end

  def show
    @entry = Entry.find(params[:id])
  end

  def new
    @entry = Entry.new
    @huh = "hello worldo"
    @lat = params[:latitude]
    @long = params[:longitude]
  end

  def create
    @entry = Entry.new(entry_params)

    if !@entry.location
      # no location id given
      # raise "no location given".to_yaml
      location = Location.new
      location.latitude = @entry.latitude
      location.longitude = @entry.longitude
      location.address = @entry.address
      location.user = current_user
      @entry.location = location
    elsif @entry.location.user != current_user
      raise "what".to_yaml
    end

    @entry.user = current_user
    if @entry.save
      location.save
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

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_entry
      @user = Entry.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def entry_params
      params.require(:entry).permit(:place, :address, :message_type, :title, :message, :image, :latitude, :longitude, :user_id)
    end
end
