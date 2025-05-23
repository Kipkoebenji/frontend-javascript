interface Student{
    firstName: string;
    lastName: string;
    age: number;
    location: string;
}

const student1: Student = {
  firstName: "John",
  lastName: "Doe",
  age: 21,
  location: "Nairobi",
};

const student2: Student = {
  firstName: "Jane",
  lastName: "Smith",
  age: 22,
  location: "Mombasa",
};

const studentsList: Student[] = [student1, student2];

const table = document.createElement("table");
table.border = "1";
const headerRow = document.createElement("tr");

const header1 = document.createElement("th");
header1.textContent = "First Name";
const header2 = document.createElement("th");
header2.textContent = "Location";

headerRow.appendChild(header1);
headerRow.appendChild(header2);
table.appendChild(headerRow);

// Loop through studentsList and add rows
studentsList.forEach((student) => {
  const row = document.createElement("tr");

  const firstNameCell = document.createElement("td");
  firstNameCell.textContent = student.firstName;

  const locationCell = document.createElement("td");
  locationCell.textContent = student.location;

  row.appendChild(firstNameCell);
  row.appendChild(locationCell);

  table.appendChild(row);
});

// Append the table to the document body
document.body.appendChild(table);
