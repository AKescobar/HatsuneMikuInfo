"use strict";

/*Songs - Slideshow*/
// slideshow variable, this class name also initializes the slideshow  
let $slideshow = $(".cycle-slideshow");

// event listener to make the slideshow pause or resume when clicked on
$slideshow.on("click", function() {
   if ($slideshow.is(".cycle-paused"))
      $slideshow.cycle("resume");                
   else
      $slideshow.cycle("pause");
});

// event listener for previous button
$("#previous-btn").on("click", function() {
   $slideshow.cycle("stop");
   $slideshow.cycle("prev");
});

// event listener for next button
$("#next-btn").on("click", function() {
   $slideshow.cycle("stop");
   $slideshow.cycle("next");
});

/*Softwares - Mock Server*/
// function to get data from mock server
function getSoftware(){
   // variables for endpoint and server request
   let myEndpoint = "https://8d9e3c9e-cef0-4d21-b66c-61f950e2f497.mock.pstmn.io/mikuSoftware";
   let endpoint = `${myEndpoint}?t=${Date.now()}`;
   let xhr = new XMLHttpRequest();

   // event listener for load event
   xhr.addEventListener("load", function(){
   // success response
   if(this.status === 200){
      // parsing data into JSON
      const data = JSON.parse(this.responseText);
      // calling display function
      displaySoftware(data);
   }
   // error response
   else{
      // error message
      document.getElementById("software").innerHTML = "<p>There was an issue with your call to Postman. Check the endpoint and try again.</p>";
   }
});

  // xhr.responseType = "json";

   // open connection to endpoint
   xhr.open("GET", endpoint);
   // request header
   xhr.setRequestHeader("Accept", "application/json");
   // send request to server
   xhr.send();

}

// display function
function displaySoftware(data){
   // log response to console
  console.log(data);
  // empty string to start
  let string = "";
  // iterate through array and display each software 
  for(let miku of data){
   // format for information to display appended to empty string
    string += 
        `<div>
				<img src="${miku.image}" alt="${miku.alt}">
				<h3>${miku.name}</h3>
				<p>
               <span class="bold">Release Date:</span>
					${miku.releaseDate}
            </p>
            <p>
					<span class="bold">Price:</span>
					${miku.price}
				</p>
		   </div>`;
  }
  // display to page
  document.getElementById("software").innerHTML += string;
}

// call function to request data from server on load
window.onload = function(){
	 getSoftware();
};

/*Form Validation - Local Storage*/
// function to validate form
function newsletterForm(e){
   // prevent default submission of form
   e.preventDefault();

   // input variables and error span variable
   let name = document.getElementById("my-name");
   let email = document.getElementById("my-inbox");
   let software = document.getElementById("my-sw");
   let errorSpans = document.querySelectorAll(".message");

   // clear error messages
   name.classList.remove("errorInput");
   email.classList.remove("errorInput");
   software.classList.remove("errorInput");
   for(let span of errorSpans){
		span.classList.remove("error");
	}

   // boolean to track validity of form
   let isValid = true; 

   // validate each form input
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

   // if the form is valid, write user object
   if(isValid){
      let user = {
         name: name.value,
         email: email.value,
         software: software.value
      };
      
      // write user to storage
      // if the user exists 
      if(localStorage.getItem("newUser")){
         // display user 
         displayUser();

         // clear form
         name.value = "";
         email.value = "";
         software.value = "";
      }
      // if the user does not exist
      else{
         // stringify JSON
         let userString = JSON.stringify(user);
         // save to strage with a key
         localStorage.setItem("newUser", userString);

         // display user
         displayUser();
         
         // clear form
         name.value = "";
         email.value = "";
         software.value = "";
      }
   }
}

// funtion to display user info
function displayUser(){
   // variable for output
   let outputP = document.getElementById("displayUser");
   // empty string
   let output = "";

   // if the newUser exists
   if(localStorage.getItem("newUser")){
      // get user from storage
      let userString = localStorage.getItem("newUser");
      // parse string into JSON
      let user = JSON.parse(userString);

      // output message
       output = `Hello and nice to meet you ${user.name}! We will reach out to ${user.email} about Hatsune Miku ${user.software} monthly.`;
   }
   //display to page
   outputP.innerHTML = output;
}

// event listener for form submission
document.getElementById("my-submit").addEventListener("click", newsletterForm);

/*Accordion*/
// function
 $(function(){
   // jquery ui
   $("#accordion").accordion({
      // make all sections collapsable 
      collapsible: true
   });
  });