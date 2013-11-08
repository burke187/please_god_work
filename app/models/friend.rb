class Friend < ActiveRecord::Base
	belongs_to :user
	has_many :events

  attr_accessible :first_name, :last_name, :birthday
end