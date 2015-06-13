class CreateTimeLogs < ActiveRecord::Migration
  def change
    create_table :time_logs do |t|
      t.date    :date
      t.string  :name
      t.string  :key
      t.float   :hours

      t.timestamps null: false
    end
  end
end
