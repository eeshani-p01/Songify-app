/*List of details of song , declaring an object to store detail of each song */
var songs = [

  {
    'name':'Faded',
    'artist':'Alan Walker',
    'album':'-',
    'duration':'3:32',
    'fileName':'song5.mp3',
    'image':'image5.jpg',
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
     'name':'I Hate U , I Love U',
     'artist':['Gnash ',' Olivia OBrien'],
     'album':'A força do querer, vol. 1',
     'duration':'3:46',
     'fileName':'song.mp3',
     'image':'image1.jpg',
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
     'name':'Love the way you lie(feat.Rihaana)',
     'artist':'Eminem , Rihaana',
     'album':'Recovery',
     'duration':'4:23',
     'fileName':'song3.mp3',
     'image':'image3.jpg',
   }
 ]

  var songNumber=1;       //initializing the default songnumber
  var willLoop=0;
  var willShuffle=0;
  var currentSongNumber=0;
  var mute=0;

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

    function randomExcluded(min, max, excluded) {
        var n = Math.floor(Math.random() * (max-min) + min);
        if (n >= excluded) n++;
        return n;
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

    function changeVolume(val){
           var aud=document.querySelector('audio');
           aud.volume=val;
           if(val==0)
           {
               $('.favolume').addClass('fa-volume-off').removeClass('fa-volume-up')
               console.log('volume0');
           }
           else {
             $('.favolume').addClass('fa-volume-up').removeClass('fa-volume-off')
             console.log('volume high');
           }
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
            //currentSongNumber=position;
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

/*    function timejump() {
      var aud=document.querySelector('audio');
      aud.currentTime=aud.duration-5;
    }*/

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


             $('.welcome-screen button').on('click', function() {
                 var name = $('#name-input').val();
                 if (name.length > 3) {
                     var message = "Welcome, " + name;
                     $('.main .user-name').text(message);
                     $(".welcome-screen").slideUp(400);
                     setTimeout(function(){
                       $('.welcome-screen').addClass('hidden');

                     }, 280);
                     setTimeout(function(){
                       $(".main").slideUp(300);
                       $('.main').removeClass('hidden');
                     },50);
                 } else {
                     $('.input-wrapper').addClass('error');
                 }
             });

             $('.play-icon').on('click', function() {
                 toggleSong();
             });
             $('body').on('keypress', function(event) {
                 var target=event.target;
                         if (event.keyCode == 32 && target.tagName!='INPUT') {
                             toggleSong();
                         }
             });
             $('.player-progress').click(function(event){
               var $this=$(this);
               var widthclicked= event.pageX-$this.offset().left;
               //console.log(event.pageX);  gives the position from left whereever clicked
               //console.log($this.offset().left);      gives the positon from left where 'this' start and always fixed
               //console.log(widthclicked);
               var totalwidth=$this.width();
               //console.log(totalwidth);           gives the total width of the player and always fixed
               var width=(widthclicked/totalwidth)*100;
               var song=document.querySelector('audio');
               song.currentTime=(song.duration*width)/100;
               //console.log(song.currentTime);
             });

//Js for Volume icon
              $('#volume1').on('change',function(){
                  changeVolume(this.value);
              });
              $('.favolume').hover(function(){
                  $('#volume1').removeClass('hidden')
                  $('#volume1').mouseleave(function(){
                    $('#volume1').addClass('hidden')
                  })
              });
              $('.favolume').on('click',function(){
                  changeVolume(mute);
                  mute=1-mute;
              });

             $('.fa-repeat').on('click',function() {
                 $('.fa-repeat').toggleClass('disabled')
                 willLoop = 1 - willLoop;

             });
             $('.fa-random').on('click',function() {
                 $('.fa-random').toggleClass('disabled')
                 willShuffle = 1 - willShuffle;
             });

             $('audio').on('ended',function(){
                 var audio=document.querySelector('audio');
                 if(willShuffle==1)
                 {
                      var nextsongno=randomExcluded(1,5,songNumber);      //calling function to get random value
                      console.log(nextsongno);
                      var nextsong=songs[nextsongno-1];
                      audio.src="songs/"+nextsong.fileName;
                      toggleSong();
                      changeCurrentSongDetails(nextsong);
                      songNumber=nextsongno;
                 }
                 else if(willLoop==1)
                 {
                     if(songNumber<songs.length)
                     {
                       var nextsong =songs[songNumber];
                       audio.src="songs/"+nextsong.fileName;
                       changeCurrentSongDetails(nextsong);
                       toggleSong();
                       songNumber=songNumber+1;
                     }
                     else{
                       var nextsong =songs[0];
                       audio.src="songs/"+nextsong.fileName;
                       toggleSong();
                       changeCurrentSongDetails(nextsong);
                       songNumber=1;
                     }
                 }
                 else {
                     $('.play-icon').removeClass('fa-pause').addClass('fa-play');
                     audio.currentTime=0;
                     //console.log(songNumber);
                 }
             });

                $('.fa-step-forward').on('click',function(){
                  var audio=document.querySelector('audio');
                  if(songNumber<songs.length)
                  {
                      var next=songs[songNumber];
                      audio.src="songs/"+next.fileName;
                      changeCurrentSongDetails(next);
                      toggleSong();
                      songNumber++;
                    }
                   else {
                       var next=songs[0];
                       audio.src="songs/"+next.fileName;
                       changeCurrentSongDetails(next);
                       toggleSong();
                       songNumber=1;
                   }
                });
                $('.fa-step-backward').on('click',function(){
                  var audio=document.querySelector('audio');
                  if(songNumber>1)
                  {
                      var prev=songs[songNumber-2];
                      audio.src="songs/"+prev.fileName;
                      changeCurrentSongDetails(prev);
                      toggleSong();
                      songNumber--;
   //                   console.log(songNumber);
                    }
                   else {
                       var prev=songs[songs.length-1];
                       audio.src="songs/"+prev.fileName;
                       changeCurrentSongDetails(prev);
                       toggleSong();
                       songNumber=songs.length;
                   }
                });


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
