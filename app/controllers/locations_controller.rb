class LocationsController < ApplicationController
  before_filter :authenticate_user!
  
  def index
    @locations = Location.where(user: current_user)
    respond_to do |format|
      format.html
      format.json { render :json => @locations.tokens(params[:q]) }
    end
  end

  def current_location
    respond_to do |format|
      format.html { redirect_to :root }
      format.js { render 'current_location' }
    end
  end

  def get_close_locations(current_lat, current_long)
    close_lats = Location.where(latitude: (current_lat - 0.3)..(current_lat + 0.3) )
    close_longs = close_lats.where(longitude: (current_long - 0.3)..(current_long + 0.3) )
    raise close_longs.to_yaml
    

    # respond_to do |format|
    #   format.html { redirect_to :root }
    #   format.js { render 'current_location' }
    # end
  end

  def showmap

    # gon.close_to_here = []
    # current_user.locations.each do |location|
    #   temp = []
    #   temp << location
    #   temp << location.latitude
    #   temp << location.longitude
    #   gon.close_to_here << temp
    # end
    # raise gon.close_to_here[0].to_yaml


    # get_close_locations(41, -73)
    gon.entries = current_user.entries
    gon.locations = current_user.locations
    gon.current_user = current_user


    gon.location_entries_array = []
    # raise current_user.locations.to_yaml

    # for each location, make an array
    # first value of array is location object, following are entry objects
    current_user.locations.each do |location|
      temp = []
      temp << location

      location.entries.reverse.each do |entry|
        temp << entry
      end

      gon.location_entries_array << temp
    end
    # raise gon.location_entries_array[0].length.to_yaml

    # gon.locations = []
      



    respond_to do |format|
      format.html { }
      format.js { render 'showmap' }
    end
  end

  def show
    @location = Location.find(params[:id])
  end

  def new
    @location = Location.new
  end

  def create
    @location = Location.new(params[:location])
    if @location.save
      redirect_to @location, :notice => "Successfully created location."
    else
      render :action => 'new'
    end
  end

  def edit
    @location = Location.find(params[:id])
  end

  def update
    @location = Location.find(params[:id])
    if @location.update_attributes(params[:location])
      redirect_to @location, :notice  => "Successfully updated location."
    else
      render :action => 'edit'
    end
  end

  def destroy
    @location = Location.find(params[:id])
    @location.destroy
    redirect_to locations_url, :notice => "Successfully destroyed location."
  end

  private

    def set_location
      @location = Location.find(params[:id])
    end

    def location_params
      params.require(:location).permit(:title)
    end
end
