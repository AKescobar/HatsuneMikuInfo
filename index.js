"use strict";

/*Songs*/
let $slideshow = $(".cycle-slideshow");

$slideshow.on("click", function() {
   if ($slideshow.is(".cycle-paused"))
      $slideshow.cycle("resume");                
   else
      $slideshow.cycle("pause");
});

$("#previous-btn").on("click", function() {
   $slideshow.cycle("stop");
   $slideshow.cycle("prev");
});

$("#next-btn").on("click", function() {
   $slideshow.cycle("stop");
   $slideshow.cycle("next");
});
/*Softwares - Mock Server*/
function getSoftware(){
   let myEndpoint = "https://8d9e3c9e-cef0-4d21-b66c-61f950e2f497.mock.pstmn.io/mikuSoftware";
   let endpoint = `${myEndpoint}`;
   let xhr = new XMLHttpRequest();

   xhr.addEventListener("load", function(){
      if(this.status === 200){
			displaySoftware(this.response);
		}
      else{
         document.getElementById("software").innerHTML = "<p>There was an issue with your call to Postman. Check the endopint and try again.</p>";
		}
	});

   xhr.responseType = "json";

   xhr.open("GET", endpoint);

   xhr.send();

}

function displaySoftware(data){
  console.log(data);
  let string = "";
  for(let miku of data){
    string += 
        `<div>
				<img src="${miku.image}" alt="${miku.alt}">
				<h3>${miku.name}</h3>
				<p>
               <span class="bold">Release Date:</span>
					${miku.releaseDate}
					<span class="bold">Price:</span>
					${miku.price}
				</p>
		   </div>`;
  }
  document.getElementById("software").innerHTML += string;
}

window.onload = function(){
	 getSoftware();
};

/*Form Validation*/
function newsletterForm(e){
   e.preventDefault();

   let name = document.getElementById("my-name");
   let email = document.getElementById("my-inbox");
   let software = document.getElementById("my-sw");
   let errorSpans = document.querySelectorAll(".message");

   name.classList.remove("errorInput");
   email.classList.remove("errorInput");
   software.classList.remove("errorInput");
   for(let span of errorSpans){
		span.classList.remove("error");
	}

   let isValid = true; 

   if(name.value === ""){
		name.classList.add("errorInput");
		errorSpans[0].classList.add("error");
      errorSpans[0].innerHTML = `Please enter your name!`;
		isValid = false;
	}

   if(email.value === ""){
		email.classList.add("errorInput");
		errorSpans[1].classList.add("error");
      errorSpans[1].innerHTML = `Please enter your email!`;
		isValid = false;
	}

   if(software.value === ""){
		software.classList.add("errorInput");
		errorSpans[2].classList.add("error");
      errorSpans[2].innerHTML = `Please select a software!`;
		isValid = false;
	}

   if(isValid){
      let user = {
         name: name.value,
         email: email.value,
         software: software.value
      };
   
      if(localStorage.getItem("newUser")){
         displayUser();

         name.value = "";
         email.value = "";
         software.value = "";
      }
      else{
         let userString = JSON.stringify(user);
         localStorage.setItem("newUser", userString);

         displayUser();
         
         name.value = "";
         email.value = "";
         software.value = "";
      }
   }
}

function displayUser(){
   let outputP = document.getElementById("displayUser");
   let output = "";
   if(localStorage.getItem("newUser")){
      let userString = localStorage.getItem("newUser");
      let user = JSON.parse(userString);

       output = `Hello and nice to meet you ${user.name}! We will reach out to ${user.email} about Hatsune Miku ${user.software} monthly.`;
   }
   outputP.innerHTML = output;
}
document.getElementById("my-submit").addEventListener("click", newsletterForm);

/*Accordion*/
 $(function(){
   $("#accordion").accordion({
      collapsible: true
   });
  });