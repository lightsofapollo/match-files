watch 'spec/(.*)\.js' do
  puts `jasmine-node spec`
end

# Node is fast!
watch 'lib/(.*)\.js' do
  puts `jasmine-node spec`
end
