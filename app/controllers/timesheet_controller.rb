class TimesheetController < ApplicationController
  before_filter :get_jira_client
  def index
    projects =  @jira_client.Project.all
    puts projects.length
    puts session[:jira_auth]
  end
end
