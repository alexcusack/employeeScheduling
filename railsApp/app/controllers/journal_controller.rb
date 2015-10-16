class JournalController < ApplicationController


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
    # if params['lastEntryDate'] !=  Journal.last.timestamp
    #   render json: { status: 406, updates: Journal.where("timestamp > ?", params['lastEntryDate']), lastEntry: Journal.last.timestamp.to_s }
    # end
    params['timestamp'] = Time.now
    params['facts'] = params['facts'].to_json
    entry = params.permit(:name, :facts, :timestamp)
    p entry
    newEntry = Journal.new(entry)
    p newEntry
    newEntry.save
    render json: {status: 200, lastEntry: Journal.last.timestamp.to_s }
  end


end
