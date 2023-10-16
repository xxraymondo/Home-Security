let phoneNumberValidation =document.getElementById("phoneNumberValidation");
let emailValidation =document.getElementById("emailValidation");
let validateBtn=document.getElementById("validateBtn");
let validateEmailBtn=document.getElementById("validateEmailBtn");
let submition=document.getElementById("submition");
let emailVerificationResult;
let NumberVerificationResult;

let state;
let city;
//submit enable or disable logic start
 submition.disabled=true
function enableBtn(){
  if(emailVerificationResult&&NumberVerificationResult){
    submition.disabled=false
    console.log("true");
  }else{
    submition.disabled=true
  }
}
emailValidation.addEventListener("keyup",function(){
   submition.disabled=true
})
phoneNumberValidation.addEventListener("keyup",function(){
  submition.disabled=true
})
validateBtn.addEventListener("click", function(){

    getNumber(phoneNumberValidation.value) 
 
})
validateEmailBtn.addEventListener("click", function(){

    emailVerification(emailValidation.value) 
   
})

//submit enable or disable logic end


async function getNumber(obj) {

    const response = await fetch(`http://apilayer.net/api/validate?access_key=7739278fe4e4738dd8f6fdc7959990e4&number=${obj}&country_code=EG&format=1`, {
        method: "POST", // or 'PUT'
        mode: "cors",
    
        body: JSON.stringify(obj),
      });
    const data = await response.json();
    console.log(data);
    if(data.valid==true){
      NumberVerificationResult=true;
      console.log(true);
      enableBtn()
    }else{
      NumberVerificationResult=false;
      window.alert("verification failed please use number without country code ")
    }
  }

 async function emailVerification(email){
      // caccd9e5b0094d468f8d1cb738680619 working
  //c6c8a0f3145c485994d38bc9325168dc not working
    const response = await fetch(`https://emailvalidation.abstractapi.com/v1/?api_key=caccd9e5b0094d468f8d1cb738680619&email=${email}`, {
        method: "GET", // or 'PUT'
        mode: "cors",
      });
      
      const data = await response.json();
      console.log(data);
      if(data.error){
        window.alert("error: "+data.error.message+" button will be enabled")
        enableBtn()
      }else{

        if(data.deliverability=="DELIVERABLE"){
          console.log("VALID")
          emailVerificationResult=true;
          enableBtn()
        }else{  
          emailVerificationResult=false;
          window.alert("email verification failed");
          enableBtn()
            }
      }
  }
function checkboxVerification(){
  var checkboxes = document.querySelectorAll('input[type="checkbox"]');
  var checkedOne = Array.prototype.slice.call(checkboxes).some(x => x.checked);
  return checkedOne
}
function valthisform()
{
    var checkboxs=document.getElementsByName("features");
    var okay=false;
    for(var i=0,l=checkboxs.length;i<l;i++)
    {
        if(checkboxs[i].checked)
        {
            okay=true;
            break;
        }
    }
   return okay;
}
document.getElementById("myForm").addEventListener("submit", async (e) => {
   
    e.preventDefault();
    if(!valthisform()){
      window.alert("Please select at least one feature");
      return false;
    }
    var array = []
var checkboxes = document.querySelectorAll('input.features[type=checkbox]:checked')

for (var i = 0; i < checkboxes.length; i++) {
  array.push(checkboxes[i].value)
}
    let features =array.toString() 
    let formData = new FormData(myForm);
    formData.append(features, myForm[features])
    formData.append(city, myForm[city])
    formData.append(state, myForm[state])
    const response = await fetch(`https://bluemodo.leadspediatrack.com/post.do?lp_campaign_id=64b9ccf73e38c&lp_campaign_key=mYFhzwtX7LKWBGgD34Tb&lp_response=json`, {
        method: "POST", // or 'PUT'
        // data:formData,
         body: formData,
        }).then(response =>  response.json())
        .then(result =>window.alert(result.result) )
          .catch(error => console.log('error', error));
        });

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
    if(!questionTwoAnswer.value||!questionSevenAnswer.value||!phoneNumberValidation.value||!emailValidation.value||!firstName.value||!lastName.value){
        
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