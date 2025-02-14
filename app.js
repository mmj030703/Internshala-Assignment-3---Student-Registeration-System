// Constant Variables
const studentName = document.querySelector("#student-name");
const studentClass = document.querySelector("#student-class");
const studentRollNo = document.querySelector("#student-roll");
const studentEmailId = document.querySelector("#student-email");
const studentContactNo = document.querySelector("#contact-no");
const submitBtn = document.querySelector(".submit-btn");
const studentDataList = document.querySelector(".student-data-list");
const noStudentsAvailableElement = document.querySelector('.student-data-table-container .no-student-data');
const studentTable = document.querySelector('.student-table');

// Global Variables
let studentIdCounter = (+localStorage.getItem('studentIdCounter') + 1) || 0;
const students = JSON.parse(localStorage.getItem("students")) || [];



// function to add or remove vertical scrollbar to students data list
function addOrRemoveVerticalScrollbar() {
    if (studentTable.scrollHeight > studentTable.clientHeight) {
        studentTable.style.overflowY = "scroll";
    } else {
        studentTable.style.overflowY = "hidden";
    }
}

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
function createStudentDataRow(name, classValue, rollno, emailId, contactNo, studentId) {
    // Creating Elements
    const studentDataRow = document.createElement('tr');
    const studentIdCell = document.createElement('td');
    const studentNameCell = document.createElement('td');
    const studentClassCell = document.createElement('td');
    const studentRollNoCell = document.createElement('td');
    const studentEmailIdCell = document.createElement('td');
    const studentContactNoCell = document.createElement('td');
    const studentNameInput = document.createElement('input');
    const studentClassInput = document.createElement('input');
    const studentRollNoInput = document.createElement('input');
    const studentEmailIdInput = document.createElement('input');
    const studentContactNoInput = document.createElement('input');
    const studentButtonsCell = document.createElement('td');
    const editBtn = document.createElement("button");
    const removeBtn = document.createElement("button");

    // Adding Classes to Elements
    studentDataRow.classList.add("student-data-row");
    studentNameCell.classList.add("table-cell");
    studentIdCell.classList.add("table-cell", "student-id");
    studentClassCell.classList.add("table-cell");
    studentRollNoCell.classList.add("table-cell");
    studentEmailIdCell.classList.add("table-cell");
    studentContactNoCell.classList.add("table-cell");
    studentButtonsCell.classList.add("table-cell", "buttons");
    studentNameInput.classList.add("student-name");
    studentClassInput.classList.add("student-class");
    studentRollNoInput.classList.add("student-rollno");
    studentEmailIdInput.classList.add("student-emailid");
    studentContactNoInput.classList.add("student-contactno");

    // Adding data to the Elements
    studentNameInput.value = name.trim().toLowerCase();
    studentIdCell.textContent = (studentId === 0 ? '0' : studentId) || studentIdCounter;  
    studentClassInput.value = classValue.trim().toLowerCase();
    studentRollNoInput.value = rollno.trim().toLowerCase();
    studentEmailIdInput.value = emailId.trim().toLowerCase();
    studentContactNoInput.value = contactNo.trim().toLowerCase();
    editBtn.innerHTML = "<i title='Edit' class='btn edit fa-solid fa-pen-to-square'></i>";
    removeBtn.innerHTML = '<i title="Remove" class="btn remove fa-solid fa-trash"></i>';

    // Adding properties to input fields
    studentNameInput.setAttribute('readonly', true);
    studentClassInput.setAttribute('readonly', true);
    studentRollNoInput.setAttribute('readonly', true);
    studentEmailIdInput.setAttribute('readonly', true);
    studentContactNoInput.setAttribute('readonly', true);

    // Appending the Elements - Creating the actual structure of the Student row
    studentNameCell.appendChild(studentNameInput);
    studentClassCell.appendChild(studentClassInput);
    studentRollNoCell.appendChild(studentRollNoInput);
    studentEmailIdCell.appendChild(studentEmailIdInput);
    studentContactNoCell.appendChild(studentContactNoInput);
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

        const studentObj = {
            id: studentIdCounter,
            name: name,
            class: classValue,
            rollNo: rollno,
            emailId: emailId,
            contactNo: contactNo
        }

        localStorage.setItem('studentIdCounter', `${studentIdCounter++}`);

        students.push(studentObj);
        localStorage.setItem('students', JSON.stringify(students));

        if (students.length !== 0) {
            noStudentsAvailableElement.style.display = "none";
        }

        addOrRemoveVerticalScrollbar();

        popupMessage("Student added successfully!", "#00af00");
        emptyStudentInputValues();
    } else {
        return false;
    }

}

function manipulateStudentDataRow(e) {
    const target = e.target;

    if (target.className === "btn edit fa-solid fa-pen-to-square") {
        const parentElement = target.parentElement.parentElement.parentElement;

        // Accessing input fields from parentElement
        const nameInput = parentElement.querySelector('.student-name');
        const classInput = parentElement.querySelector('.student-class');
        const rollNoInput = parentElement.querySelector('.student-rollno');
        const emailIdInput = parentElement.querySelector('.student-emailid');
        const contactNoInput = parentElement.querySelector('.student-contactno');

        // As soon as edit button is clicked focus should go to that row's name input
        nameInput.focus();

        // Changing properties of input fields
        nameInput.removeAttribute('readonly');
        classInput.removeAttribute('readonly');
        rollNoInput.removeAttribute('readonly');
        emailIdInput.removeAttribute('readonly');
        contactNoInput.removeAttribute('readonly');

        target.className = "btn save fa-solid fa-floppy-disk";

    } else if (target.className === "btn save fa-solid fa-floppy-disk") {
        const parentElement = target.parentElement.parentElement.parentElement;

        // Accessing input fields from parentElement
        const nameInput = parentElement.querySelector('.student-name');
        const classInput = parentElement.querySelector('.student-class');
        const rollNoInput = parentElement.querySelector('.student-rollno');
        const emailIdInput = parentElement.querySelector('.student-emailid');
        const contactNoInput = parentElement.querySelector('.student-contactno');
        const studentIdCell = parentElement.querySelector('.student-id');

        if (validateStudentData(nameInput.value, classInput.value, rollNoInput.value, emailIdInput.value, contactNoInput.value)) {
            // Changing properties of input fields
            nameInput.setAttribute('readonly', true);
            classInput.setAttribute('readonly', true);
            rollNoInput.setAttribute('readonly', true);
            emailIdInput.setAttribute('readonly', true);
            contactNoInput.setAttribute('readonly', true);
            const studentId = studentIdCell.textContent;

            target.className = "btn edit fa-solid fa-pen-to-square";

            students.forEach(student => {
                if (student.id == studentId) {
                    student.name = nameInput.value;
                    student.class = classInput.value;
                    student.rollNo = rollNoInput.value;
                    student.emailId = emailIdInput.value;
                    student.contactNo = contactNoInput.value;
                }
            });

            localStorage.setItem('students', JSON.stringify(students));

            popupMessage("Student Data updated!", "#00af00");
        } else {
            return false;
        }
    }

    if (target.classList.contains("remove")) {
        const parentElement = target.parentElement.parentElement.parentElement;
        const studentIdCell = parentElement.querySelector('.student-id');
        let targetIndex = null;

        parentElement.remove();

        students.forEach((student, index) => { 
            if (student.id == studentIdCell.textContent) {
                targetIndex = index;
            }
        });

        students.splice(targetIndex, 1);

        localStorage.setItem('students', JSON.stringify(students));

        popupMessage("Student data deleted!", "#00af00");

        if (students.length === 0) noStudentsAvailableElement.style.display = "block";
        addOrRemoveVerticalScrollbar();
    }
}


// Code Execution starts here
if (students.length !== 0) {
    noStudentsAvailableElement.style.display = "none";
    students.forEach(student => {
        const studentDataRow = createStudentDataRow(student.name, student.class, student.rollNo, student.emailId, student.contactNo, student.id);
        studentDataList.append(studentDataRow);
    });
} else {
    noStudentsAvailableElement.style.display = "block";
}

addOrRemoveVerticalScrollbar();

submitBtn.addEventListener("click", addStudentToList);
studentDataList.addEventListener("click", manipulateStudentDataRow);