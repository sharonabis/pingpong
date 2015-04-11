class MapsController < ApplicationController
  skip_before_action :verify_authenticity_token
	  
    def index
    	@data = Location.all
  	end

    def new
  		@location = Location.new
  	end

  	def create
  		@location = Location.new(location_params)
      @location.save
  		redirect_to maps_path
  	end

  	def location_params
  		params.require(:location).permit(:title, :lng, :lat)
  	end
end
