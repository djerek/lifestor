json.array!(@bios) do |bio|
  json.extract! bio, :image, :story
  json.url bio_url(bio, format: :json)
end