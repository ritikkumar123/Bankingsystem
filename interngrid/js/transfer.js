 
 //handle modal click event

 document.querySelector('.modal_wrapper').addEventListener('click',(e)=>{
            
    if(e.target.classList.contains("modal_wrapper")){
        document.querySelector('.container').style.display="block";
        document.querySelector('.modal_wrapper').style.display = "none";
        document.querySelector('.person_name').textContent = "";
        document.querySelector('.balance').textContent = "";
    }
})



 //handle money transfer
 const amount = document.querySelector('#amount');
 const from_email = document.querySelector("#from");
 const to_email = document.querySelector("#to")
 const form = document.querySelector('form');
 const balance = document.querySelector('.balance');
 

 // add evet listener to form
 form.addEventListener('submit',async (e)=>{
     e.preventDefault();
     console.log(from_email.value,to_email.value)
     // console.log(balance.textContent.replace(" ",""))
     if(!from_email.value || !amount.value || !to_email.value){
         return alert("All fields must be entered!")
     }
     
     else if(Number(amount.value) > Number(balance.textContent.replace("₹ ",""))){
         
         return alert("Amount must be lesser or equal to current balance.")
     }

     // make an network request

     try{
         const r = await axios.put('https://bankingserver.herokuapp.com/transfer',{from:from_email.value,to:to_email.value,amount:amount.value,timestamp:new Date().getTime()});
         if(r.status ===200){
             document.querySelector('.form').innerHTML = '<p>Transaction Successfull</p>'
         }
     }
     catch(e){
        if (e.response && e.response.data) {
            alert(e.response.data.message);
        }
     }
     
 })
