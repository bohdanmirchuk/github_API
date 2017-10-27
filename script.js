$('#getUser button').on("click", function (event){
  var username = event.currentTarget.parentElement.children[0].value;

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

$('#createGist').click(function (event) {
  var username = event.currentTarget.parentElement.children[0].value;
  var password = event.currentTarget.parentElement.children[1].value;
  var description = event.currentTarget.parentElement.children[2].value;
  var filename = event.currentTarget.parentElement.children[3].value;
  var content = event.currentTarget.parentElement.children[4].value;
  $.ajax({
    type: 'POST',
    url: 'https://api.github.com/gists',
    headers: {Authorization: "Basic " + btoa(username + ":" + password)},
    contentType: "application/json",
    data: '{"description": "'+description+'", "public": true, "files": {"'+filename+'": {"content": "'+content+'"}}}',    
    statusCode: {
      404: function() {
      $('#post p.sorry').css('display', 'block');
      $('#post p.new-gist').css('display', 'none');
      }
    }
  })
  .done(function(response){
    $('#post p.sorry').css('display', 'none');
    $('#post p.new-gist').css('display', 'block');
    $('#post p.new-gist a').text(description);
    $('#post p.new-gist a').attr('href', 'https://gist.github.com/'+username+'/'+response.id);
  })
  return false;
})

$('#getHeaders').on('click', function(event){
  var username = event.currentTarget.parentElement.children[0].value;

  $.ajax({ 
    url: 'https://api.github.com/users/'+username,
    type: 'HEAD',
    statusCode: {
      404: function() {
        $('#head p.sorry').css('display', 'block');
        $('.headers-list').css('display', 'none');
        }
      }
    })
    .done(function(data, textStatus, xhr) {
      $('.headers-list').css('display', 'block');
      $('#head p.sorry').css('display', 'none');
      console.log(xhr.getAllResponseHeaders());
      $('.headers-list').text(xhr.getAllResponseHeaders());
    })
})

$('#addFollowing').on('click', function(event){
  var username = event.currentTarget.parentElement.children[0].value;
  var password = event.currentTarget.parentElement.children[1].value;
  var following = event.currentTarget.parentElement.children[2].value;
  $.ajax({
    url: 'https://api.github.com/user/following/'+following,
    type: 'PUT',
    headers: {Authorization: "Basic " + btoa(username + ":" + password)},
    contentType: "application/json",
      statusCode: {
      404: function() {
      $('#put p.sorry').css('display', 'block');
      $('#post p.new-following').css('display', 'none');
      }
    }
  })
  .done(function(){
  $('#put p.sorry').css('display', 'none');
  $('#put p.new-following').css('display', 'block');
  $('#put p.new-following a').attr('href', 'https://github.com/'+username+'?tab=following');

  })
})

function convertDate(date){
  var arr = date.split('-');
  var monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];
  return monthNames[arr[1]-1]+' '+arr[0];
}