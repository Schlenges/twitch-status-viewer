var channels = ['thepracticaldev', 'noobs2ninjas','freecodecamp', 'thelarkinn', 'noopkat', 'kyleshevlin'];
var baseUrl = "https://wind-bow.glitch.me/twitch-api/";

channels.forEach(function(channel){

    // Get User Info
    $.ajax({
        url: baseUrl + "users/" + channel,
        type: 'GET', 
        dataType: 'json',
        success: function(data) { 
            div = document.createElement("div");
            div.className = 'container channel';
            div.id = channel;
            document.querySelector("#channels").appendChild(div);
            $(`<a href="https://twitch.tv/${channel}"><img src="${data.logo}" alt="logo" class="logo"></a>`).appendTo(`#${channel}`);
            $(`<h3><a href="https://twitch.tv/${channel}">${data.display_name}</a></h3>`).appendTo(`#${channel}`);
            $(`<p class="bio">${data.bio}</p>`).appendTo(`#${channel}`);

            checkStatus();
        }
    });

    // Check Status
    function checkStatus(){
        $.ajax({
            url: baseUrl + "streams/" + channel,
            type: 'GET', 
            dataType: 'json',
            success: function(data) {
              if (data.stream == null) {
                $('<p class="status">offline</p>').appendTo(`#${channel}`);
              } else {
                $('<p class="status">online</p>').appendTo(`#${channel}`);
                $(`#${channel}`).css('background', '#6441a4');
              }
            }
        });
    }
});