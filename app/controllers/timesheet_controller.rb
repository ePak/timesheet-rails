class TimesheetController < ApplicationController
  before_filter :get_jira_client

  def index
    @projects = @jira_client.Project.all
    @logs = TimeLog.take(10)
  end
end
