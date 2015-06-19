class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  class UninitializedAccessTokenError < RuntimeError
  end

  rescue_from JIRA::OauthClient::UninitializedAccessTokenError do
    redirect_to new_jira_session_path
  end
  rescue_from JIRA::HTTPError do |e|
    puts e.code
    if e.code.to_i == 401
      puts "redirect_to new_jira_session_path"
      redirect_to new_jira_session_path
    end
  end

  private

  def get_jira_client
    options = {
      :private_key_file => "key.pem",
      :consumer_key => 'timesheet'
    }

    @jira_client = JIRA::Client.new(options)

    # Add AccessToken if authorised previously.
    if session[:jira_auth]
      @jira_client.set_access_token(
        session[:jira_auth]["access_token"],
        session[:jira_auth]["access_key"])
      get_current_session if !session[:user_key]
    end
  end

  def get_current_session
    begin
      puts "********** get_current_session *************"
      context_path = @jira_client.options[:context_path]
      res = @jira_client.get("#{context_path}/rest/auth/1/session")
      json = JSON.parse res.body
      res = @jira_client.get(@jira_client.options[:rest_base_path] + "/user?key=#{json["name"]}&expand=groups")
      userJson =  JSON.parse res.body
      session[:user_key] = userJson["key"]

      user = @jira_client.User.find(session[:user_key])
      session[:display_name] = user.displayName

      team_index = userJson['groups']['items'].find_index { |group| group['name'].start_with? "Team " }
      session[:team] = team_index ? userJson['groups']['items'][team_index]['name'] : ""

      puts "********** end  *************"
    rescue JIRA::HTTPError => e
      puts e.message
    end
  end
end
