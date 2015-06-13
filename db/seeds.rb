# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

require 'date'
require 'time_log'

TimeLog.create(date: Date.today - 4, name: 'admin', key: 'DEMO-1', hours: '8')
TimeLog.create(date: Date.today - 3, name: 'admin', key: 'DEMO-1', hours: '6')
TimeLog.create(date: Date.today - 3, name: 'admin', key: 'DEMO-2', hours: '2')
TimeLog.create(date: Date.today - 2, name: 'admin', key: 'DEMO-1', hours: '3')
TimeLog.create(date: Date.today - 2, name: 'admin', key: 'DEMO-3', hours: '5')
TimeLog.create(date: Date.today - 1, name: 'admin', key: 'DEMO-6', hours: '8')
TimeLog.create(date: Date.today, name: 'admin', key: 'DEMO-5', hours: '3')



