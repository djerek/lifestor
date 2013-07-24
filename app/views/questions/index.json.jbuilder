json.array!(@questions) do |question|
  json.extract! question, :content, :is_active
  json.url question_url(question, format: :json)
end