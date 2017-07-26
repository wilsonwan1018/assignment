$(document).ready(function(){

	/* Login & Signup Toggle */

	var cardToggle = 0;



$('.toggle-link').on('click', function(event){
    event.preventDefault();
		if(cardToggle == 0 ){
			$(this).text('Login');
			$('.login-box').animate({
				right: '350px'
			});
			$('.signup-box').animate({
				right: '0'
			});	

			cardToggle = 1;

		}else{
			$(this).text('Signup');
			$('.login-box').animate({
				right: '0'
			});
			$('.signup-box').animate({
				right: '-350px'
			});

			cardToggle = 0;
		}
	})

})


      function initMap() {
        var uluru = {lat: 22.339146, lng: 114.185361};
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 18,
          center: uluru
        });
        var marker = new google.maps.Marker({
          position: uluru,
          map: map
        });
      }
   
   
    
    <!-- ajax call database server-->
    
    
    	$(function(){
    		$("#login").click(function(e){
    			<!-- alert("D"); -->
                    $(function(){
    				var user = {};
    				user.act = "login";
    				user.ac = $("input[name='username'").val();
    				user.pw = $("input[name='password'").val();
    				<!--alert(user.ac);-->
                    
    				$.ajax({
    					url: "http://localhost:5000/index.html",
    					type: "POST",
    					data: user,
                        datatype: "json",
                        success: function(result){
                            alert(result);
                            console.log(result);
                            if(result == "LOGIN OK"){
							   //document.getElementById("nav_login").innerHTML=user.ac;
							   $(logoffbtn).show();
                               if (typeof(Storage) !== "undefined") {
    // Store
                                localStorage.setItem("current_user",user.ac);
    // Retrieve
                                document.getElementById("nav_login").innerHTML = localStorage.getItem("current_user");
                                alert("current_user: "+localStorage.getItem("current_user"));
                                } else {
                                document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Storage...";
                                }
                            }
                                else if(result == "LOGIN FAIL"){
                                    document.getElementById("login_result").innerHTML="invalid Login";
                                }
                            if(result.status == 200){
                                console.log("hope can see here");
                            }

                        },
                        error: function(result){
                            console.log(result);
							document.getElementById("login_result").innerHTML="Connection Error";
                        }
    				});
                });
                    //return false;
                     /*if(typeof(Storage) !== "undefined"){
                        localStorage.setItem("current_user",$("input[name='username']").val());
                        
                        
                        alert("current_user = "+localStorage.getItem("current_user"));
                        //window.location.assign("./frontpage.html")

                    }else{
                        document.getElementById("result").innerHTML = "Sorry your browser does not support Web Storage...";
                    } */
                    
    				return false;
    			});
    		$("#sign_up").click(function(e){
    			var user = {};
    			user.act = "signup";
    			user.ac = $("input[name='log_ac']").val();
    			user.pw = $("input[name='sign_pw']").val();
    			user.email = $("input[name='email']").val();
    			alert(user.ac);
    			alert(user.pw);
    			alert(user.email);



    			if(user.ac == "" || user.pw == "" || $("input[name='confirm-password']").val() == "" || user.email == ""){
    				alert("Please input all information!");
    			}else if ($("input[name='confirm-password']").val() != user.pw){
    				alert("Please input same password at repeat password!");
    			}else {
    				$.ajax({
    					url: "http://127.0.0.1:5000/index.html",
    					type: "POST",
    					data: user,
                        success: function(result){
                            alert(result);
                            console.log(result);
                            if(result.status == 200){
                                console.log("hope can see here");
                            }
                        },
                        error: function(result){
                            console.log(result);
                        }
    				});
    			}
    			return false;
    		});

            $("#show_fav").click(function(e){
                var user = {};
                user.act = "showFav";
                user.ac =  localStorage.getItem("current_user");
                if(user.ac == ""){
                    alert("Please Login First!");                    
                }else {
                    $.ajax({
                        type: "json",
                        url: "http://127.0.0.1:5000/index.html",
                        type: "POST",
                        data: user,
                        success: function(result){
                            alert(result);
                            if(result=="no_user"){
                                alert("Please Login First");
                            }
                            else{
                                $(current_fav).show();
                                document.getElementById("current_fav").src= result;
                            }
                            //console.log(JSON.parse('result'));
                            //var current_poster = JSON.parse('result');
                            //alert(current_poster.fav);

                            if(result.status == 200){
                                console.log("hop can see here");
                            }
                        },
                        error: function(result){
                            console.log(result);
                            alert(result);
                        }
                        
                    });
                }
            });
            $("#remove_fav").click(function(e){
                var user = {};
                user.act = "delFav";
                user.ac =  localStorage.getItem("current_user");
                if(user.ac == ""){
                    alert("Please Login First!");                    
                }else {
                    $.ajax({
                        type: "json",
                        url: "http://127.0.0.1:5000/index.html",
                        type: "POST",
                        data: user,
                        success: function(result){
                            if(result!="no_user"){
                            if(result=="Successfully Delete")
                                console.log("Successfully Delete");
                            //console.log(JSON.parse('result'));
                            //var current_poster = JSON.parse('result');
                            //alert(current_poster.fav);

                            if(result.status == 200){
                                console.log("hop can see here");
                            }
                        }else {
                            alert("Please Login First");
                        }
                        },
                        error: function(result){
                            console.log(result);
                            alert(result);
                        }
                        
                    });
                }
            });
		});
		function add_fav(x){
            alert("Add to favorite");
			var current_poster = x;
			alert(current_poster);
			var user = {};
			user.act = "addFav"
			user.ac = localStorage.getItem("current_user");
			user.poster = document.getElementById(x).src;
            alert(user.ac);
            alert(user.poster);
			$.ajax({
				url: "http://127.0.0.1:5000/index.html",
				type: "POST",
				data: user,
				success: function(result){
                    if(result!="no_user"){
					alert(result);
					console.log(result);
					if(result.status == 200){
						console.log("hope can see here");
                    }
                }else{
                    alert("Please Login First");
                }
                 },
                 error: function(result){
                        console.log(result);
				 }
			});
			
		};
    	
        
function logoff(){ //Logo-off 
	localStorage.removeItem("current_user");
	//alert("You are Log off!");
	$(logoffbtn).hide;
    location.reload();
}; //end of Logo-off


