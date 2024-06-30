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
        emptyStudentInputValues();
    } else {
        return false;
    }

}

submitBtn.addEventListener("click", addStudentToList);