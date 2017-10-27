$('#getUser').submit( function (event){
  var username = event.currentTarget[0].value;

  $.ajax({
    type: 'GET',
    url: 'https://api.github.com/users/'+username,
    statusCode: {
      404: function() {
        $('.avatar').attr('src', 'img/Octocat.png');
        $('.profiledata').css('opacity', 0);
        $('div.sorry').css('opacity', 1);
        }
    }
  })
  .done(function(response){

    $('div.sorry').css('opacity', 0);
    $('.profiledata').css('opacity', 1);
    $('.avatar').attr('src', response.avatar_url);
    $('.login').text(response.login);
    $('.id').text(response.id);
    $('.name').text(response.name);
    $('.location').text(response.location);
    $('.repositories').text(response.public_repos);
    $('.repositories').attr('href', response.html_url+'?tab=repositories');
    $('.followers').text(response.followers);
    $('.followers').attr('href', response.html_url+'?tab=followers');
    $('.following').text(response.following);
    $('.following').attr('href', response.html_url+'?tab=following');
    $('.from').text(convertDate(response.created_at));
    $('.profilelink').attr('href', response.html_url);
  })
  return false;
})

$('#createGist').submit(function (event) {
  var url = 'https://api.github.com/users/';
  var username = event.currentTarget[0].value;
  var password = event.currentTarget[1].value;
  var description = event.currentTarget[2].value;
  var filename = event.currentTarget[3].value;
  var content = event.currentTarget[4].value;
  console.log(url, username, password, description, filename, content);
  // var header = { Authorization: "Basic " + btoa(username + ":" + password)};

  $.ajax({
    type: 'POST',
    url: url+username+'/gists',
    headers: {Authorization: "Basic " + btoa(username + ":" + password)},
    contentType: "application/json",
    data: {
            "description": description,
            "public": true,
            "files": {
                filename: {
                  "content": content
                }
            }
          },    
    statusCode: {
      404: function() {
      $('#post p.sorry').css('display', 'block');
      console.log(url, username, password, description, filename, content);

    }
    }
  })
  .done(function(response){
    console.log(response)
  })
  return false;
})

function convertDate(date){
  var arr = date.split('-');
  var monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];
  return monthNames[arr[1]-1]+' '+arr[0];
}