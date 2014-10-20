var audioObj = {
		audioNode : $(".js_audio"),
		audio : null,
		audioState : true, //默认暂停
		interval: 0,
		init : function(){
			 var options_audio = {
		      	loop: true,
		      	preload: "auto",
		    	src: audioObj.audioNode.attr('data-src')
		    }
	        audioObj.audio = new Audio(); 
	        for(var key in options_audio){
	            if(options_audio.hasOwnProperty(key) && (key in audioObj.audio)){
	                audioObj.audio[key] = options_audio[key];
	            }
	        }
	        audioObj.audio.load();
	        audioObj.playState();
	        audioObj.Event();
			audioObj.play();
		},
		Event : function(){
			if(audioObj.audioNode.length<=0) return;

			$(audioObj.audio).on("progress",function(){
		    	console.log("正在加载");
		    	var range = audioObj.audio.buffered;
				var bt = range.end(0);
		    	var mt = parseInt(audioObj.audio.duration);
				var percent = parseInt(bt * 100 / mt);
				$('.loading').css('width', percent + '%');
		    })


		    $(audioObj.audio).on("loadeddata",function(){
		    	console.log(audioObj.audio.duration);
		    })


			audioObj.audioNode.find('.btn_audio1').on('click',audioObj.contorl);

	        $(audioObj.audio).on('play',function(){
		       	audioObj.audioState = false;
	     	 	audioObj.interval = setInterval('audioObj.playState()', 1000);
		       	console.log("播放开始");
		    })

	        $(audioObj.audio).on('pause',function(){
		       	audioObj.audioState = true;
		       	console.log("播放停止");
		    })


		    $(audioObj.audio).on("ended",function(){
		    	audioObj.audio.pause();
		    	audioObj.audio.loop =false;
		    	console.log("播放结束");
		    })
		},
		contorl : function(){
			 if(!audioObj.audioState){
		        audioObj.stop();
		     }else{
		        audioObj.play();
		     }
		},
		playState : function(){
			if(!audioObj.audioState){
				var ct = parseInt(audioObj.audio.currentTime);//当前播放的位置
				var mt = parseInt(audioObj.audio.duration);
				var left = mt - ct;
				var min = parseInt(left / 60);
				var sec = left % 60;
				if(min < 10) {
					min = '0' + min;
				}
				if(sec < 10) {
					sec = '0' + sec;
				}
				$('.time').text('-' + min + ':' + sec);
				var percent = parseInt(ct * 100 / mt);
				$('.progress').css('width', percent + '%');
			}
		}, 
	    play : function(ct){
	    	if(ct>0){
	    		audioObj.audio.currentTime=ct * audioObj.audio.duration / 100;
	    	}
	    	audioObj.audioState = false;
	     	if(audioObj.audio) audioObj.audio.play();
	    },
	  	stop  : function(){
	     	audioObj.audioState = true;
	     	if(audioObj.audio) audioObj.audio.pause(); 
	   }
	}	
	audioObj.init();
	$(document).one("touchstart", function(){
   	 	audioObj.play();
	});