// Constant Variables
const studentName = document.querySelector("#student-name");
const studentClass = document.querySelector("#student-class");
const studentRollNo = document.querySelector("#student-roll");
const studentEmailId = document.querySelector("#student-email");
const studentContactNo = document.querySelector("#contact-no");
const submitBtn = document.querySelector(".submit-btn");
const studentDataList = document.querySelector(".student-data-list");

// Global Variables
let studentIdCounter = 0;



// function to create a popup element
function createPopupElement(message) {
    // Creating Elements 
    const popupElement = document.createElement('div');
    const popupMessage = document.createElement('p');

    // Adding text to it
    popupMessage.textContent = message;

    // Adding classes to elements
    popupElement.classList.add("popup");

    // Appending elements
    popupElement.appendChild(popupMessage);

    return popupElement;
}

// function to popup a message
function popupMessage(message, textColor) {
    const popupElement = createPopupElement(message);

    // Appending popup to the body
    document.body.appendChild(popupElement);

    // Changing text color of popupElement
    popupElement.style.color = textColor;

    /* Removing Popup after some time  */
    setTimeout(() => {
        popupElement.remove();
    }, 3000);
}



// function to empty student input fields
function emptyStudentInputValues() {
    studentName.value = "";
    studentClass.value = "";
    studentRollNo.value = "";
    studentEmailId.value = "";
    studentContactNo.value = "";
}

// function to validate student data from input fields
function validateStudentData(name, classValue, rollno, emailId, contactNo) {
    // Checking whether any field is empty or not 
    switch ("") {
        case name.trim():
            popupMessage("Name field should not be empty!", "#ff0000");    // #ff0000 - red
            return false;
        case classValue.trim():
            popupMessage("Class field should not be empty!", "#ff0000");
            return false;
        case rollno.trim():
            popupMessage("Roll No field should not be empty!", "#ff0000");
            return false;
        case emailId.trim():
            popupMessage("Email Id field should not be empty!", "#ff0000");
            return false;
        case contactNo.trim():
            popupMessage("Contact No field should not be empty!", "#ff0000");
            return false;
    }

    // Validating separate fields
    if (!(/^[A-Za-z\s]+$/.test(name))) {
        popupMessage("Name field should only contain Alphabets!", "#ff0000");
        return false;
    }
    if (!(/^[A-Za-z.\s]+$/.test(classValue))) {
        popupMessage("Class field should only contain Alphabets and Dot(.)!", "#ff0000");
        return false;
    }
    if (!(/^[0-9]+$/.test(rollno))) {
        popupMessage("Roll No field should only contain Numbers!", "#ff0000");
        return false;
    }
    if (!/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(emailId)) {
        popupMessage("Enter an correct Email!", "#ff0000");
        return false;
    }
    if (!(/^[0-9]+$/.test(contactNo))) {
        popupMessage("Contact No field should only contain Numbers!", "#ff0000");
        return false;
    }
    if (!(contactNo.length === 10)) {
        popupMessage("Contact No field should have 10 digits!", "#ff0000");
        return false;
    }

    return true;
}


// function to create the row element for student data
function createStudentDataRow(name, classValue, rollno, emailId, contactNo) {
    // Creating Elements
    const studentDataRow = document.createElement('tr');
    const studentNameCell = document.createElement('td');
    const studentIdCell = document.createElement('td');
    const studentClassCell = document.createElement('td');
    const studentRollNoCell = document.createElement('td');
    const studentEmailIdCell = document.createElement('td');
    const studentContactNoCell = document.createElement('td');
    const studentButtonsCell = document.createElement('td');
    const editBtn = document.createElement("button");
    const removeBtn = document.createElement("button");

    // Adding Classes to Elements
    studentDataRow.classList.add("student-data-row");
    studentNameCell.classList.add("table-cell");
    studentIdCell.classList.add("table-cell");
    studentClassCell.classList.add("table-cell");
    studentRollNoCell.classList.add("table-cell");
    studentEmailIdCell.classList.add("table-cell");
    studentContactNoCell.classList.add("table-cell");
    studentButtonsCell.classList.add("table-cell");
    editBtn.classList.add("btn", "edit");
    removeBtn.classList.add("btn", "remove");

    // Adding data to the Elements
    studentNameCell.textContent = name;
    studentIdCell.textContent = studentIdCounter++;
    studentClassCell.textContent = classValue;
    studentRollNoCell.textContent = rollno;
    studentEmailIdCell.textContent = emailId;
    studentContactNoCell.textContent = contactNo;
    editBtn.innerHTML = "<i class='fa-solid fa-pen-to-square'></i>";
    removeBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';

    // Appending the Elements - Creating the actual structure of the Student row
    studentButtonsCell.append(editBtn, removeBtn);
    studentDataRow.append(studentIdCell, studentNameCell, studentClassCell, studentRollNoCell, studentEmailIdCell, studentContactNoCell, studentButtonsCell);
    
    return studentDataRow;
}
    

// function to add student element to the student data list
function addStudentToList(e) {
    e.preventDefault();
    
    // Accessing the values
    const name = studentName.value;
    const classValue = studentClass.value;
    const rollno = studentRollNo.value;
    const emailId = studentEmailId.value;
    const contactNo = studentContactNo.value;

    if (validateStudentData(name, classValue, rollno, emailId, contactNo)) {
        const studentDataRow = createStudentDataRow(name, classValue, rollno, emailId, contactNo);
        studentDataList.append(studentDataRow);
        popupMessage("Student added successfully!", "#00af00");
        emptyStudentInputValues();
    } else {
        return false;
    }

}

submitBtn.addEventListener("click", addStudentToList);