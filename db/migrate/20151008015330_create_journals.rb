class CreateJournals < ActiveRecord::Migration
  def change
    create_table :journals do |t|
      t.datetime :timestamp
      t.string :name
      t.string :facts

      # t.timestamps null: false
    end
  end
end


# Journal.new(timestamp: Time.now, name: 'Alex', facts: '[["assert","95D131AF-62CC-4C68-8202-B970EBBCC977","assignment/user","D0DF1923-964B-4CF9-ACAE-C4D8CCA42EE0"],["assert","95D131AF-62CC-4C68-8202-B970EBBCC977","assignment/date","2015-10-08"]]' )

