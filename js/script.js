// logic to hide password
function maskPassword(pass) {
    let str = ""
    for (let index = 0; index < pass.length; index++) {
        str += "*"
    }
    return str
}

// logic to copy the password
function copyText(txt) {
    navigator.clipboard.writeText(txt).then(
        () => {
            document.getElementById("alert").style.display = "inline"
            setTimeout(() => {
                document.getElementById("alert").style.display = "none"

            }, 1500)
        },
        () => {
            alert("Failed")
        },
    );
}
// logic to delete the data
const deletePassword = (website) => {
    let data = localStorage.getItem("passwords")
    let arr = JSON.parse(data);
    arrUpdated = arr.filter((e) => {
        return e.website != website
    })
    localStorage.setItem("passwords", JSON.stringify(arrUpdated))
    alert(`Successfully deleted ${website}'s Password`)
    showPassword()
}
// logic to fill the table
const showPassword = () => {
    let tb = document.querySelector("table")
    let data = localStorage.getItem("passwords")
    if (data == null || JSON.parse(data).length == 0) {
        tb.innerHTML = "Please enter Something to show"
    }
    else {
        tb.innerHTML = `<tr>
                            <th>Website</th>
                            <th>Username</th>
                            <th>Password</th>
                            <th>Action</th>
                        </tr>`
        let arr = JSON.parse(data);
        let str = ""
        for (let index = 0; index < arr.length; index++) {
            const element = arr[index];

            str += `<tr>
                        <td>${element.website}<button onclick="copyText('${element.website}')" class="btn-ssm">C</button></td>
                        <td>${element.username}<button onclick="copyText('${element.username}')" class="btn-ssm">C</button></td>
                        <td>${maskPassword(element.password)}<button onclick="copyText('${element.password}')" class="btn-ssm">C</button></td>
                        <td><button  class="btn-sm" onClick="deletePassword('${element.website}')">Delete</button></td>
                    </tr>`
        }
        tb.innerHTML = tb.innerHTML + str
    }
    website.value = ""
    username.value = ""
    password.value = ""
}


showPassword()

// logic to submit data
document.querySelector(".btn").addEventListener("click", (e) => {
    e.preventDefault()
    console.log(username.value, password.value)

    let passwords = localStorage.getItem("passwords")
    console.log(passwords)
    if (passwords == null) {
        let json = []
        json.push({ website: website.value, username: username.value, password: password.value })
        localStorage.setItem("passwords", JSON.stringify(json))
    } else {
        let json = JSON.parse(localStorage.getItem("passwords"))
        json.push({ website: website.value, username: username.value, password: password.value })
        localStorage.setItem("passwords", JSON.stringify(json))
    }
    showPassword()

})