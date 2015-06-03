class TimesheetController < ApplicationController
  before_filter :get_jira_client
  def index
    projects = @jira_client.Project.all

    projects.each do |project|
      puts "Project -> key: #{project.key}, name: #{project.name}"
    end
  end
end
