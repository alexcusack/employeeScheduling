class JournalController < ApplicationController


  def index
    status = 200
    @lastEntry = Journal.last.timestamp.to_s
    @journalEntries = Journal.all
    if params['date'] && params['date'] == @lastEntry.to_s
      @journalEntries = []
      status = 304
    end
    render json: {status: status, updates: @journalEntries, lastEntry: @lastEntry}
  end


  def create
    if params['lastEntryDate'].slice(0,19) !=  Journal.last.timestamp.to_s.slice(0,19)
      render json: { status: 406, updates: Journal.where("timestamp > ?", params['lastEntryDate']), lastEntry: Journal.last.timestamp.to_s }
      return
    end
    params['timestamp'] = Time.now
    params['facts'] = params['facts'].to_json
    entry = params.permit(:name, :facts, :timestamp)
    newEntry = Journal.new(entry)
    newEntry.save
    render json: {status: 200, lastEntry: Journal.last.timestamp.to_s }
  end


end
