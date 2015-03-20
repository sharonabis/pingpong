class MapsController < ApplicationController
	 def index
    	@data = Location.all
  	end
    def new
  		@location = Location.new
  	end

  	def create
  		Location.create(location_params)
  		redirect_to maps_path
  	end

  	def location_params
  		params.require(:location).permit(:title, :lng, :lat)
  	end
end
