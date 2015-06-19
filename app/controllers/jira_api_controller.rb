class JiraApiController < ApplicationController
  before_filter :get_jira_client

  def search_issue
    term = params[:term]
    begin
      key_search = @jira_client.Issue.find(term, {:fields => "summary,assignee,status"})
    rescue JIRA::HTTPError => e
      puts "There is no issue with key = '#{term}'"
    end
    assigned_to = issues_assigned_to("'#{term}'", jql_options)
    last_viewed = issues_last_viewed
    text_search = issues_jql("summary ~ '#{term}' AND status = Open", jql_options)

    json = { :key_search => issues_with_fields(key_search),
             :assigned_to => assigned_to.map(&method(:issues_with_fields)),
             :last_viewed => last_viewed.map(&method(:issues_with_fields)),
             :text_search => text_search.map(&method(:issues_with_fields)) }

    render :json => json.to_json
  end

  def issues_standard
    mine = issues_assigned_to_me.map(&method(:issues_with_fields))    
    #my_team = issues_assigned_to_my_team.map(&method(:issues_with_fields))
    #my_testing = issues_my_testing.map(&method(:issues_with_fields))
    #admin = issues_admin.map(&method(:issues_with_fields))
    history = issues_last_viewed.map(&method(:issues_with_fields))
    result = { :mine => mine,
               #:myTeam => my_team,
               #:myTesting => my_testing,
               #:admin => admin,
               :history => history }

    render :json => result.to_json
  end

  def issues_admin_json
    render :json => issues_admin.map(&method(:issues_with_fields)).to_json
  end

  def issues_admin
    issues_jql("project = ATM", jql_options.except(:max_results)).reverse
  end

  def issues_last_viewed_json
    render :json => issues_last_viewed.map(&method(:issues_with_fields)).to_json
  end

  def issues_last_viewed
    issues_jql("issue in issueHistory()", jql_options.merge({:max_results => 6}))
  end

  def issues_my_testing_json
    render :json => issues_my_testing.map(&method(:issues_with_fields)).to_json
  end

  def issues_my_testing
    unresolved_issues_jql("'Integration tester' = currentUser()", jql_options)
  end

  def issues_assigned_to_me_json
    render :json => issues_assigned_to_me.map(&method(:issues_with_fields)).to_json
  end

  def issues_assigned_to_me
    issues_assigned_to("currentUser()", jql_options.except(:max_results))
  end

  def issues_assigned_to_my_team_json
    render :json => issues_assigned_to_my_team.map(&method(:issues_with_fields)).to_json
  end

  def issues_assigned_to_my_team
    unresolved_issues_jql("assignee in (membersOf('#{session[:team]}'))", jql_options.except(:max_results))
  end

  def issues_assigned_to(term, options)
    unresolved_issues_jql("assignee = #{term}", options)
  end

  def unresolved_issues_jql(query, options)
    issues_jql("#{query} AND resolution = Unresolved ", options)
  end

  def issues_jql(query, options)
    puts "#{query} ORDER BY lastViewed,updatedDate"
    @jira_client.Issue.jql("#{query} ORDER BY lastViewed,updatedDate", options)
  end

  def jql_options
    { :fields => ["summary","assignee","status"],
      :max_results => 10 }
  end

  def issues_with_fields(issue)
    return nil if issue.nil?
    { :key => issue.key,
      :assignee => issue.assignee.displayName,
      :summary => issue.summary,
      :status => issue.status.name }
  end


end
