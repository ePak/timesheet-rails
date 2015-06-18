class JiraApiController < ApplicationController
  before_filter :get_jira_client

  def search_issue
    term = params[:term]
    begin
      key_search = @jira_client.Issue.find(term, {:fields => "summary,assignee,status"})
    rescue JIRA::HTTPError => e
      puts "There is no issue with key = '#{term}'"
    end
    assigned_to = issue_assigned_to("'#{term}'", jql_options)
    last_viewed = issue_last_viewed
    text_search = issue_jql("summary ~ '#{term}' AND status = Open", jql_options)

    json = { :key_search => issue_with_fields(key_search),
             :assigned_to => assigned_to.map(&method(:issue_with_fields)),
             :last_viewed => last_viewed.map(&method(:issue_with_fields)),
             :text_search => text_search.map(&method(:issue_with_fields)) }

    render :json => json.to_json
  end

  def issue_admin_json
    render :json => issue_admin.reverse.map(&method(:issue_with_fields)).to_json
  end

  def issue_admin
    issue_jql("project = ATM", jql_options.except(:max_results))
  end

  def issue_last_viewed_json
    render :json => issue_last_viewed.map(&method(:issue_with_fields)).to_json
  end

  def issue_last_viewed
    issue_jql("issue in issueHistory()", jql_options.merge({:max_results => 6}))
  end

  def issue_my_testing_json
    render :json => issue_my_testing.map(&method(:issue_with_fields)).to_json
  end

  def issue_my_testing
    unresolved_issue_jql("'Integration tester' = currentUser()", jql_options)
  end

  def issue_assigned_to_me_json
    render :json => issue_assigned_to_me.map(&method(:issue_with_fields)).to_json
  end

  def issue_assigned_to_me
    issue_assigned_to("currentUser()", jql_options.except(:max_results))
  end

  def issue_assigned_to_my_team_json
    render :json => issue_assigned_to_my_team.map(&method(:issue_with_fields)).to_json
  end

  def issue_assigned_to_my_team
    unresolved_issue_jql("assignee in (membersOf('#{session[:team]}'))", jql_options.except(:max_results))
  end

  def issue_assigned_to(term, options)
    unresolved_issue_jql("assignee = #{term}", options)
  end

  def unresolved_issue_jql(query, options)
    issue_jql("#{query} AND resolution = Unresolved ", options)
  end

  def issue_jql(query, options)
    puts "#{query} ORDER BY lastViewed,updatedDate"
    @jira_client.Issue.jql("#{query} ORDER BY lastViewed,updatedDate", options)
  end

  def jql_options
    { :fields => ["summary","assignee","status"],
      :max_results => 10 }
  end

  def issue_with_fields(issue)
    return nil if issue.nil?
    { :key => issue.key,
      :assignee => issue.assignee.displayName,
      :summary => issue.summary,
      :status => issue.status.name }
  end


end
