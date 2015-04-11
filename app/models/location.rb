class Location < ActiveRecord::Base
	def as_json(options) { 
       	title: title,
       	lat: lat,
       	lng: lng
       }
    end
end
