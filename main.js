/*List of details of song , declaring an object to store detail of each song */
var songs = [
   {
     'name':'I Hate U , I Love U',
     'artist':['Gnash ',' Olivia OBrien'],
     'album':'A força do querer, vol. 1',
     'duration':'3:46',
     'fileName':'song.mp3',
     'image':'image1.jpg',
   },
   {
     'name':'How would you feel',
     'artist':'Ed Sheeran',
     'album':'Divide',
     'duration':'4:40',
     'fileName':'song2.mp3',
     'image':'image2.jpg',
   },
   {
     'name':'Love the way you lie(feat.Rihaana)',
     'artist':'Eminem , Rihaana',
     'album':'Recovery',
     'duration':'4:23',
     'fileName':'song3.mp3',
     'image':'image3.jpg',
   },
   {
     'name':'Let it go',
     'artist':'James Bay',
     'album':'Chaos and the Calm',
     'duration':'4:21',
     'fileName':'song4.mp3',
     'image':'image4.jpg',
   },
   {
     'name':'Faded',
     'artist':'Alan Walker',
     'album':'-',
     'duration':'3:32',
     'fileName':'song5.mp3',
     'image':'image5.jpg',
   }
 ]

  var songNumber=1;       //initializing the default songnumber

    function fancyTimeFormat(time){               //function to change the time format to hh:mm:ss
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

    function updateCurrentTime() {              //function to change
      var song = document.querySelector('audio');
      //console.log(song.currentTime);
      //console.log(song.duration);
      var currentTime=Math.floor(song.currentTime);
      var duration=Math.floor(song.duration);
      var bar=(currentTime*100)/duration;
      currentTime = fancyTimeFormat(currentTime);
      duration = fancyTimeFormat(duration);
      $('.time-elapsed').text(currentTime);
      $('.song-duration').text(duration);
      Progressbar(bar);
    }

    function Progressbar(bar){
          var ele = document.querySelector('.progress-filled');
          ele.style.width= bar +"%";
          //console.log(bar);
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

    function addClickOnSongname(songObj,position){
      var song="#song"+position;
      var songName=songObj.fileName;
      $(song).click(function(){
          var audio = document.querySelector('audio');
          if(songNumber!== position)    //check for !== weak and strong equality??
          {
            audio.src="songs/"+songName;
            songNumber=position;
            changeCurrentSongDetails(songObj);
          }
            toggleSong();
      });
    }

   function changeCurrentSongDetails(songObj){
      $('.current-song-image').attr('src',"images/"+songObj.image);
      $('.current-song-name').text(songObj.name);
      $('.current-song-album').text(songObj.album);
    }

    //when the html document is loaded completely, after that, this function will execute
    window.onload = function() {

      changeCurrentSongDetails(songs[0]);
      setInterval(function(){
        updateCurrentTime();
      },1000);

       for(var i=0 ; i<songs.length; i++)
       {
         var obj = songs[i];
         var name='#song'+(i+1);
         var song=$(name);
         song.find('.song-name').text(obj.name);
         song.find('.song-artist').text(obj.artist);
         song.find('.song-album').text(obj.album);
         song.find('.song-length').text(obj.duration);
         addClickOnSongname(obj,i+1);
       }

       $('#songs').DataTable({        //adding datatables
         paging:false,
      /*   scrollY:250,
         scroller:true*/
       });
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
