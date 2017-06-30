
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
      var songs = [
         {
           'name':'I Hate U , I Love U',
           'artist':'gnash',
           'album':'',
           'duration':'3:46',
           'fileName':'song.mp3',
           'image':'',
         },
         {
           'name':'Starving',
           'artist':'',
           'album':'',
           'duration':'',
           'fileName':'song.mp3',
           'image':'',
         },
         {
           'name':'Faded',
           'artist':'',
           'album':'',
           'duration':'',
           'fileName':'song.mp3',
           'image':'',
         },
         {
           'name':'Uncover',
           'artist':'',
           'album':'',
           'duration':'',
           'fileName':'song.mp3',
           'image':'',
         }
       ]
       for(var i=0 ; i<songs.length; i++)
       {
         var obj = songs[i];
         var name='#song'+(i+1);
         var song=$(name);
         song.find('.song-name').text(obj.name);
         song.find('.song-artist').text(obj.artist);
         song.find('.song-album').text(obj.album);
         song.find('.song-length').text(obj.duration);
         addClickOnSongname(obj.fileName,i+1);
       }
     }
/*
      var songList =['I Hate U , I Love U','Starving','Faded','Uncover'];
      var fileName = ['song.mp3','song2.mp3','song3.mp3','song4.mp3'];
      var artistList = ['Artist1','Artist2','Artist3','Artist4'];

      for(var i=0 ; i<fileName.length; i++)
      {
        var name='#song'+(i+1);
        var song=$(name);
        song.find('.song-name').text(songList[i]);
        song.find('.song-artist').text(artistList[i]);
        addClickOnSongname(fileName[i],i+1);
      }
    }
*/
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
