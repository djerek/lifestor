json.array!(@questions) do |question|
  json.extract! question, :content
  json.url question_url(question, format: :json)
end