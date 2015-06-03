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
        session[:jira_auth]["access_key"]
      )
    end
  end
end
