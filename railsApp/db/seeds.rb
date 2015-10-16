#  create should just be able to receive a fact, parse it and save it appropriately based on what is being asked
#  index should Journal.all to JSON, and just send back that huge list of journal entries


JSON.parse(File.read(Rails.root + 'db/seeds.json')).each do |entry|
  entry['facts'] = entry['facts'].to_json
  Journal.create!(entry)
end

