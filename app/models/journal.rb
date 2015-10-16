class Journal < ActiveRecord::Base

  validates :timestamp, presence: true
  validates :name, presence: true
  validates :facts, presence: true

end
