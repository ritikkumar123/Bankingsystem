// Add a click event on New User Button
const fab_btn_user = document.querySelector('.fab_btn_add');
let isUserModal = false;

fab_btn_user.addEventListener('click',()=>{
    // Display New User modal after clicking button
    if(!isUserModal){
        document.querySelector('.new_user').innerHTML="close";

        document.querySelector('.new_modal_wrapper').style.display="flex";
        isUserModal = true;
    }
    else{
        document.querySelector('.new_user').innerHTML="add";

        document.querySelector('.new_modal_wrapper').style.display="none";
        isUserModal = false;

    }

    
})
// Add New User functionality

const newUserForm = document.querySelector('#new_user');

newUserForm.addEventListener('submit', async (e)=>{
    e.preventDefault();
    const name = newUserForm['name'].value;
    const email = newUserForm['email'].value;
    const intialAmount = newUserForm['intitial'].value;
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(!name || !email || !intialAmount){
        return alert('Make sure all Fields must be filled out!');
    }

    // Now validate the email
    if(!re.test(email)){
        return alert('Invalid Email Address');
    }


    // Check intial amount must be greater or equal to 100
    if(!intialAmount>=100 || !intialAmount===0){
        return alert('Make sure intial amount must be greater or 100 else enter 0')
    }

    // all fine make a network request to add new user to database

    try{
        const r = await axios.post('https://bankingserver.herokuapp.com/user/new',{name,email,balance:intialAmount,account_number:new Date().getTime()})
        if (r.status === 200) {
                
        document.querySelector('.new_user').innerHTML="add";

        document.querySelector('.new_modal_wrapper').style.display="none";
        isUserModal = false;
        location.reload();
        }
    }
    catch(e){
        if (e.response && e.response.data) {
            alert(e.response.data.message);
        }
    }


})