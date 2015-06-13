class TimeLog < ActiveRecord::Base
  def to_s
    "<TimeLog date: #{date}, name: #{name}, key: #{key}, hours: #{hours}>"
  end
end
