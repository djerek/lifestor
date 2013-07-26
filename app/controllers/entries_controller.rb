class EntriesController < ApplicationController
  def index
    @entries = Entry.search(params[:search])
  end

  def show
    @entry = Entry.find(params[:id])
  end

  def new
    @entry = Entry.new
    gon.location_ids = []
    current_user.locations.each do |location|
      gon.location_ids << location.id
    end

    gon.locations = Hash.new
    current_user.locations.each do |location|
      the_id = location.id
      gon.locations[the_id] = location
    end
    # raise gon.locations[31].to_yaml
  end

  def create
    make_new_location = Location.where(id: entry_params[:location_tokens]).blank?

    @entry = Entry.new(entry_params)

    # if !@entry.location
    #   # no location id given
    #   # raise "no location given".to_yaml
    #   location = Location.new
    #   location.latitude = @entry.latitude
    #   location.longitude = @entry.longitude
    #   location.address = @entry.address
    #   location.title = @entry.title
    #   location.user = current_user
    #   @entry.location = location
    # elsif @entry.location.user != current_user
    #   raise "what".to_yaml
    # end
    # @entry.location.id = location_tokens

    # raise entry_params[:location_tokens].to_yaml

    @entry.location_id = entry_params[:location_tokens]

    # if making a new location: take lat and long and address
    # if Location.where(id: @entry.location_id).blank?


    @entry.user = current_user
    # raise @entry.location.id.to_yaml
    if @entry.save

      if make_new_location
        loca = Location.where(id: @entry.location_id).take
        loca.latitude = @entry.latitude
        loca.longitude = @entry.longitude
        loca.address = @entry.address
        loca.user_id = current_user.id
        loca.save
      end

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

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_entry
      @user = Entry.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def entry_params
      params.require(:entry).permit(:location_tokens, :place, :address, :message_type, :title, :message, :image, :latitude, :longitude, :user_id)
    end
end
