// import * as $ from "../node_modules/jquery/dist/jquery.js";
let phoneNumberValidation =document.getElementById("phoneNumberValidation");
let emailValidation =document.getElementById("emailValidation");
let validateBtn=document.getElementById("validateBtn");
let validateEmailBtn=document.getElementById("validateEmailBtn");
let submition=document.getElementById("submition");
let state;
let city;
// phoneNumberValidation.addEventListener("keyup", function(e) {

//     getNumber(phoneNumberValidation.value)

// });
validateBtn.addEventListener("click", function(){

    getNumber(phoneNumberValidation.value) 
   
})
validateEmailBtn.addEventListener("click", function(){

    emailVerification(emailValidation.value) 

   
})

async function getNumber(obj) {

    const response = await fetch(`http://apilayer.net/api/validate?access_key=7739278fe4e4738dd8f6fdc7959990e4&number=${obj}&country_code=EG&format=1`, {
        method: "POST", // or 'PUT'
        mode: "cors",
    
        body: JSON.stringify(obj),
      });
    const data = await response.json();
    console.log(data);
    if(data.valid==true){
        submition.disabled = false;
    }
  }
 async function emailVerification(email){
    
    const response = await fetch(`https://emailvalidation.abstractapi.com/v1/?api_key=c6c8a0f3145c485994d38bc9325168dc&email=${email}`, {
        method: "GET", // or 'PUT'
        mode: "cors",
      });
      const data = await response.json();
      console.log(data.deliverability);
      if(data.deliverability=="DELIVERABLE"){
        console.log("VALID")
      }else{
        console.log("INVALID")

      }
    
  }


document.getElementById("myForm").addEventListener("submit", async (e) => {
   
    e.preventDefault();
    checkFields()
  
 
    var array = []
var checkboxes = document.querySelectorAll('input.features[type=checkbox]:checked')

for (var i = 0; i < checkboxes.length; i++) {
  array.push(checkboxes[i].value)
}

let features =array.toString() 

    let formData = new FormData(myForm);
    
    let entities=Object.fromEntries(formData)

    entities.features = features
    entities.city=city;
    entities.state=state;
    // ...or iterate through the name-value pairs
    // console.log(entities)
    const myFormdata = new URLSearchParams();
    for (const pair of formData) {
        myFormdata.append(pair[0], pair[1]);
    }
    console.log(myFormdata);
   entities= myFormdata
    
     console.log(entities);
    const response = await fetch(`https://bluemodo.leadspediatrack.com/post.do?lp_campaign_id=64b9ccf73e38c&lp_campaign_key=mYFhzwtX7LKWBGgD34Tb`, {
        method: "POST", // or 'PUT'
        mode: "cors",
         body: entities,
      }).then(response => response.text()).then(result => console.log(result))
        .catch(error => console.log('error', error));
    const data = await response.json();
    console.log(data);


  }

  
  );
  function checkFields(){
    let questionTwoAnswer=document.getElementById("questionTwoAnswer");
    let questionSevenAnswer=document.getElementById("questionSevenAnswer");
    let firstName=document.getElementById("firstName");
    let lastName=document.getElementById("lastName");
    let phoneNumberValidation =document.getElementById("phoneNumberValidation");
    let emailValidation =document.getElementById("emailValidation");
    if(!city||!state){
        window.alert("please enter valid zipcode")
        return false;
    }
    if(!questionTwoAnswer.value||!questionSevenAnswer.value||!phoneNumberValidation||!emailValidation||!firstName||!lastName){
        
        window.alert("please fill all the fields")
        return false;
    }
  }
 
  let questionTwoAnswer=document.getElementById("questionTwoAnswer")
  
  questionTwoAnswer.addEventListener("keyup",async function(){
    let value=questionTwoAnswer.value;

const options = {
  method: 'GET',
  url: `https://community-zippopotamus.p.rapidapi.com/us/${value}`,
  headers: {
    'X-RapidAPI-Key': '5b33ca1881msh0bba18ef0ef4827p1661bfjsn4d4938331444',
    'X-RapidAPI-Host': 'community-zippopotamus.p.rapidapi.com'
  }
};

try {
	const response = await axios.request(options);
    let place=response.data.places;

	// console.log(place[0][ 'place name' ]);
	// console.log(place[0].state);
    city=place[0][ 'place name' ]
    state=place[0].state
    console.log(city);
    console.log(state);

} catch (error) {
	console.error(error);
    return false;
}
     return true;
  })


  let questionSevenAnswer=document.getElementById("questionSevenAnswer")
  let searchResult=document.getElementById("searchResult")
  questionSevenAnswer.onkeyup = (e)=>{
    let testArray=[]
    removeElements();

    var requestOptions = {
        method: 'GET',
      };
      
      fetch("https://api.geoapify.com/v1/geocode/autocomplete?text="+questionSevenAnswer.value+"&apiKey=870d2524b98b4478987f74c3748a5feb", requestOptions)
        .then(response => response.json())
        .then(result => {
          

                for (let i = 0; i < result.features.length; i++){
                  let address=  result.features[i].properties.address_line1.replace(",", "")
                  address+= " "
                   address+=   result.features[i].properties.address_line2.replace(",", "")
                    testArray.push(address)
               
                }
                
                testArray.slice(Math.max(testArray.length - 5, 1))
                console.log(testArray)
            for (let i of testArray) {
              if (
                
                questionSevenAnswer.value != ""
              ) {
                searchResult.style.overflowY= "scroll";
                searchResult.style.maxHeight= "400px";
                let listItem = document.createElement("li");
                listItem.classList.add("list-items");
                listItem.style.cursor = "pointer";
                listItem.style.fontSize="10px";
                

         

                
              let word = "<b>" + i.substr
              (0, questionSevenAnswer.value.length) + "</b>";
              word += i.substr(questionSevenAnswer.value.length);
              listItem.innerHTML = word;

              document.querySelector
              (".list").appendChild(listItem);
             let listLength= document.querySelectorAll('.list-items');
             for (let j = 0; j < listLength.length; j++) {
                listLength[j].addEventListener("click", function() {
                 displayNames(i);
                });
            }
              }
            } 
           
             
        
             
        })
        .catch(error => console.log('error', error));

}

function displayNames(value) {
    questionSevenAnswer.value = value;
   removeElements();
 }
 
function removeElements() {
    let items = document.querySelectorAll(".list-items");
    items.forEach((item) => {
      item.remove();
    });
  }


  //////////////////////////////////////////////////////////




