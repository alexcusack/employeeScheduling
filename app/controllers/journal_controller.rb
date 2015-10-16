require 'json'
class JournalController < ApplicationController
  before_action :allow_cross_domain

  def index
    status = 200
    @lastEntry = Journal.last.timestamp.to_s
    @journalEntries = Journal.all
    if params['date'] && params['date'] == @lastEntry.to_s
      p 'no updates'
      @journalEntries = []
      status = 304
    end
    render json: {status: status, updates: @journalEntries, lastEntry: @lastEntry}
  end


  def create
    p 'IN post /journal'
    if params['lastEntryDate'] !=  Journal.last.timestamp
      render json: { status: 406, updates: Journal.where("timestamp > ?", params['lastEntryDate']), lastEntry: Journal.last.timestamp.to_s }
    end
    entry = params['facts']
    newEntry = Journal.new(timestamp: entry['timestamp'], name: entry['name'], facts: entry['facts'])
    newEntry.save
    render json: {status: 200, updates: params['facts'], lastEntry: Journal.last.timestamp.to_s }
  end


private

  def allow_cross_domain
    headers['Access-Control-Allow-Origin']  = '*'
    headers['Access-Control-Allow-Methods'] = 'POST, GET, PUT, PATCH, DELETE, OPTIONS'
    headers['Access-Control-Allow-Headers'] = 'Origin, Content-Type, Accept, Authorization, Token'
  end

end
