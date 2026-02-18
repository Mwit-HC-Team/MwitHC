console.log("Linked!")
const signup_form = document.getElementById("signup-form")
const login_form = document.getElementById("login-form")
const confirmation_page = document.getElementById("confirmation-page")
const username_input = document.getElementById("username")
const email_input = document.getElementById("email")
const password_input = document.getElementById("password")
const notification_btn = document.getElementById("notification-button")
const history_btn = document.getElementById("history-button")
const profile_btn = document.getElementById("profile-button")
const info_btn = document.getElementById("info-button")
const edit_form = document.getElementById("edit-info-form")
const name_edit = document.getElementById("profile-edit-name")
const nickname_edit = document.getElementById("profile-edit-nickname")
const id_edit = document.getElementById("profile-edit-id")
const room_edit = document.getElementById("profile-edit-room")
const img_edit = document.getElementById("profile-edit-img")
const display_img = document.getElementById("profile-image")
const dashboard_name = document.getElementById("dashboard-name")
const dashboard_nickname = document.getElementById("dashboard-nickname")
const dashboard_room = document.getElementById("dashboard-classroom")
const dashboard_studentID = document.getElementById("dashboard-studentid")
const regulations_return_btn = document.getElementById("regulations-return")
const regulations_btn = document.getElementById("regulations-button")
const notification_page = document.getElementById("status-button")
const contact_us_btn = document.getElementById("contact-us-button")
const contact_submit = document.getElementById("contact-submit")
const contact_us_form = document.getElementById("contact-form")
const contact_info = document.getElementById("textarea-form");
const history_redirection = document.getElementById("webserial-btn");

(function() {
    emailjs.init("vTCLQZ4fqNscTa6nQ");
})();


if (window.localStorage.getItem("list")) 
{
    list_info = JSON.parse(window.localStorage.getItem("list"))
}
else
{
    list_info = new Array()
}

if (history_redirection)
{
    function history_webserial()
    {
        //this is for the solo model
        window.location.replace("http://192.168.4.1/webserial")
    }
    history_redirection.addEventListener("click", history_webserial)
}

if (contact_us_form)
{
    contact_us_form.addEventListener("submit", function(event){
        event.preventDefault()
        alert("your request has been sent!")
        const curr_usr = window.localStorage.getItem("username")
        const existing_user = list_info.findIndex(user => user[0] === curr_usr)
        emailjs.send("service_5cj7muc","template_o9g4flf",{
            name: list_info[existing_user][0],
            message: contact_info.value,
            title: "Help Requested",
            email: "user email",
        });
    })
}

if (notification_page)
{
    console.log("notif")
    function regulations_redirect()
    {
        console.log("clicked noti")
        window.location.replace("https://mwit-hc-team.github.io/MwitHC/MwitHC-Regulations.html")
    }
    function contact_redirect()
    {
        console.log("clicked con")
        window.location.replace("https://mwit-hc-team.github.io/MwitHC/MwitHC-ContactUs.html")
    }
    regulations_btn.addEventListener("click", regulations_redirect)
    contact_us_btn.addEventListener("click", contact_redirect)
}

if (regulations_return_btn)
{
    regulations_return_btn.addEventListener("click", function(){
        console.log("going back")
        window.location.replace("https://mwit-hc-team.github.io/MwitHC/MwitHC-Notification.html")
    })
}

if (info_btn)
{
    const curr_usr = window.localStorage.getItem("username")
    const existing_user = list_info.findIndex(user => user[0] === curr_usr)
    if (existing_user != -1)
    {
        console.log("all list : " + list_info[existing_user])
        console.log("test 1 : " + list_info[existing_user][0])
        
        display_img.src = list_info[existing_user][1]

        display_img.alt = "image here"
        dashboard_name.textContent = "Name : " + list_info[existing_user][2]
        dashboard_nickname.textContent = "Nickname : " + list_info[existing_user][3]
        dashboard_room.textContent = "Student ID : " + list_info[existing_user][4]
        dashboard_studentID.textContent = "Room : " + list_info[existing_user][5]
    }
    else
    {
        console.log("No Edits")
        display_img.src = "add-new-user.png"
        display_img.alt = "CLICK PROFILE"
        dashboard_name.textContent = "CLICK PROFILE"
        dashboard_nickname.textContent = "CLICK PROFILE"
        dashboard_room.textContent = "CLICK PROFILE"
        dashboard_studentID.textContent = "CLICK PROFILE"
    }
}

if (edit_form)
{
    edit_form.addEventListener("submit", (e) =>{
        e.preventDefault()
        alert("your information has been completed!")
        const display_img = img_edit.value
        const name_edit_info = name_edit.value
        const nickname_edit_info = nickname_edit.value
        const room_edit_info = room_edit.value
        const id_edit_info = id_edit.value
        //fix if broken
        //display_img_use.src = display_img

        const curr_usr = window.localStorage.getItem("username")
        let url_display
        if (img_edit.files && img_edit.files[0])
        {
            const file = img_edit.files[0]
            const reader = new FileReader()

            reader.onloadend = function()
            {
                url_display = reader.result
                console.log(url_display)
                const curr_content = new Array(curr_usr, url_display, name_edit_info, nickname_edit_info, room_edit_info, id_edit_info)
                console.log(url_display,name_edit_info,nickname_edit_info,room_edit_info,id_edit_info)
                    
                const existing_user = list_info.findIndex(user => user[0] === curr_usr)
                if (existing_user != -1)
                {
                    list_info[existing_user] = curr_content
                }
                else
                {
                    list_info.push(curr_content)
                }
                const list_str = JSON.stringify(list_info)
                window.localStorage.setItem("list", list_str)

                window.location.replace("https://mwit-hc-team.github.io/MwitHC/MwitHC-Dashboard.html")
            }
            reader.readAsDataURL(file)
        }

    })
}

if (info_btn)
{
    console.log("dashboard")
    function notification_redirect()
    {
        console.log("nt")
        window.location.replace("https://mwit-hc-team.github.io/MwitHC/MwitHC-Notification.html")
    }
    function profile_redirect()
    {
        console.log("pf")
        window.location.replace("https://mwit-hc-team.github.io/MwitHC/MwitHC-Profile.html")
    }
    function history_redirect()
    {
        console.log("hs")
        window.location.replace("https://mwit-hc-team.github.io/MwitHC/MwitHC-History.html")
    }

    notification_btn.addEventListener("click", notification_redirect)
    profile_btn.addEventListener("click", profile_redirect)

    //the profile hell
    const parsed_list = JSON.parse(window.localStorage.getItem("list"))
    //console.log(parsed_list)
    if (parsed_list)
    {
        for (let i = 0; i < parsed_list.length; i += 1)
        {
            console.log(parsed_list[i])
            //fix the data clog when two more data in the same user
        }
        console.log(parsed_list)
    }
}

if (confirmation_page)
{
    const user_val = window.localStorage.getItem("username")
    const pass_val = window.localStorage.getItem("password")
    const email_val = window.localStorage.getItem("email")

    const stored_key_map = localStorage.getItem("map-key")
    const existed_data = stored_key_map ? JSON.parse(stored_key_map) : [];

    const key_map = new Map(existed_data)
    key_map.set(user_val, pass_val)
    const str_key_map = JSON.stringify(Array.from(key_map.entries()))

    window.localStorage.setItem("username", user_val)
    window.localStorage.setItem("password", pass_val)
    window.localStorage.setItem("map-key" , str_key_map)
    window.localStorage.setItem("email", email_val)
    console.log("comfirm p")
    
    var cooldowner = 3
    const timerElement = document.getElementById("timer");

    var counting = setInterval(function() {
        if (cooldowner >= 0) {
            if (timerElement) {
                timerElement.innerHTML = cooldowner;
            }
            cooldowner -= 1;
        } else {
            clearInterval(counting); // Stop the clock!
            window.location.replace("https://mwit-hc-team.github.io/MwitHC/MwitHC-Login.html");
        }
    }, 1000);
}

if (signup_form)
{
    signup_form.addEventListener("submit", async (e) => {
    e.preventDefault()
    const user_val = username_input.value
    const pass_val = password_input.value
    const email_val = email_input.value

    window.localStorage.setItem("username", user_val)
    window.localStorage.setItem("password", pass_val)
    window.localStorage.setItem("email", email_val)

    try {
        await emailjs.send("service_5cj7muc","template_cjvniqo",{
        title: "Email Verification",
        name: user_val,
        email: email_val,
        message: `Your wifi is HangerCounter_AI 
        Your wifi password is 12345678 

        Click here to confirm: https://mwit-hc-team.github.io/MwitHC/MwitHC-Confirm.html`        
        });
        alert("sign up form sent! please check your email for confirmation")
        window.location.replace("https://mwit-hc-team.github.io/MwitHC/MwitHC-Login.html",);
    } catch (error) {
        alert("Email failed to send. Error: " + JSON.stringify(error));
    }
});
}

if (login_form)
{
    login_form.addEventListener("submit", (e) =>{

    e.preventDefault()
    alert("logging you in")
    const user_log = document.getElementById("username").value;
    const pass_log = document.getElementById("password").value;

    const stored_map = window.localStorage.getItem("map-key")
    console.log(user_log + " and " + pass_log)
    console.log("updated")
    if (stored_map)
    {
        console.log("stored exist")
        const acess_map = new Map(JSON.parse(stored_map))
        if (acess_map.has(user_log))
        {
            console.log("acess map")
            console.log(acess_map)
            console.log(acess_map.get(user_log))
            if (pass_log == acess_map.get(user_log))
            {
                alert("Welcome back " + user_log + " !")
                window.location.replace("https://mwit-hc-team.github.io/MwitHC/MwitHC-Dashboard.html");
            }
            else
            {
                alert("Incorrect name or password")
            }
        }
        else
        {
            alert("account is not found, did you click the confirmation link yet")
        }
    }
});
}





















