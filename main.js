
    function fancyTimeFormat(time){
        // Hours, minutes and seconds
        var hrs = ~~(time / 3600);              //~~ means Math.floor
        var mins = ~~((time % 3600) / 60);
        var secs = time % 60;
        // Output like "1:01" or "4:03:59" or "123:03:59"
        var ret = "";

        if (hrs > 0) {
            ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
        }

        ret += "" + mins + ":" + (secs < 10 ? "0" : "");
        ret += "" + secs;
        return ret;
    }

    function updateCurrentTime() {
      var song = document.querySelector('audio');
      //console.log(song.currentTime);
      //console.log(song.duration);
      var currentTime=Math.floor(song.currentTime);
      currentTime = fancyTimeFormat(currentTime);
      var duration=Math.floor(song.duration);
      duration = fancyTimeFormat(duration);
      $('.time-elapsed').text(currentTime);
      $('.song-duration').text(duration);
    }

    function toggleSong(){
      var song = document.querySelector('audio');
      if (song.paused == true) {
          //console.log('Playing');
          $('.play-icon').removeClass('fa-play').addClass('fa-pause');
          song.play();
      } else {
          //console.log('Pausing');
          $('.play-icon').removeClass('fa-pause').addClass('fa-play');
          song.pause();
      }
    }

    function addClickOnSongname(songName,position){
      var song='#song'+position;
      $(song).click(function(){
          var audio = document.querySelector('audio');
          var currentSong=audio.src;
          if(currentSong.search(songName)!=-1)
            toggleSong();
          else{
            audio.src=songName;
            toggleSong();
          }
      });
    }
    window.onload = function() {
      setInterval(function(){
        updateCurrentTime();
      },1000);

      var songList =['I Hate U , I Love U','Starving','Faded','Uncover'];
      var fileName = ['song.mp3','song2.mp3','song3.mp3','song4.mp3'];
      $('#song1.song-name').text(songList[0]);
      $('#song2.song-name').text(songList[1]);
      $('#song3.song-name').text(songList[2]);
      $('#song4.song-name').text(songList[3]);



      for(var i=0 ; i<fileName.length; i++)
      {
        addClickOnSongname(fileName[i],i+1);
      }

      $('.welcome-screen button').on('click', function() {
          var name = $('#name-input').val();
          if (name.length > 2) {
              var message = "Welcome, " + name;
              $('.main .user-name').text(message);
              $('.welcome-screen').addClass('hidden');
              $('.main').removeClass('hidden');
          } else {
              $('#name-input').addClass('error');
          }
      });

      $('.play-icon').on('click', function() {
          toggleSong();
      });
      $('body').on('keypress', function(event) {
                  if (event.keyCode == 32) {
                      toggleSong();
                  }
      });
    }
