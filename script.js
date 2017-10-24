function getUserProfile(form){
  var username = form[0].value;
  console.log(username);

  $.ajax({
  type: 'GET',
  url: 'https://api.github.com/users/'+username,
  datatype: 'json' 
  })
  .done(function(response){

    $('.profiledata').css('opacity', 1);
    $('.avatar').attr('src', response.avatar_url);
    $('.login').text(response.login);
    $('.id').text(response.id);
    $('.name').text(response.name);
    $('.location').text(response.location);
    $('.repositories').text(response.public_repos);
    $('.followers').text(response.followers);
    $('.following').text(response.following);
    $('.from').text(response.created_at);
    $('.profilelink').attr('href', response.html_url);

  })

};

