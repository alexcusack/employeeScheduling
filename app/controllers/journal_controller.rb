class JournalController < ApplicationController
  before_action :set_item, only: [:show, :update, :destroy]
  before_action :allow_cross_domain

  def index
    status = 200
    @lastEntry = Journal.last.timestamp.to_s
    if params['date'] == 'undefined'
      @journalEntries = Journal.all
    end
    if params['date'] == @lastEntry.to_s
      @journalEntries = []
      staus = 204
    end
    if params['date'] < @lastEntry.to_s
      @journalEntries = Journal.where("timestamp > ?", params['date'])
      staus = 206
    end
    render json: {status: status, updates: @journalEntries, lastEntry: @lastEntry}
  end


  def create
    if params['timestamp'] > Journal.last.timestamp
      params['facts'].each do |fact|
        newEntry = Journal.new(timestamp: params['timestamp'], name: params['actionType'], facts: params['facts'].to_json)
        p 'new entry created'
        p newEntry
      end
      render json: {status: 200}
    elsif # verify fact compatability
      # need to check update compatability somewhere in here
      render json: {status: 201, updates: []}
    else # non-compatible fact
      render json: { status: 400, updates: [], error: 'incompatable fact' }
    end
  end


private

  def allow_cross_domain
    headers['Access-Control-Allow-Origin']  = '*'
    headers['Access-Control-Allow-Methods'] = 'POST, GET, PUT, PATCH, DELETE, OPTIONS'
    headers['Access-Control-Allow-Headers'] = 'Origin, Content-Type, Accept, Authorization, Token'
  end

  # def journal_params
  # end

end
