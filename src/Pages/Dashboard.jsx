import React, { useState, useEffect } from 'react';
import { Box, Button, Table, Thead, Tbody, Tr, Th, Td, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, FormControl, FormLabel, Input, Select } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [employees, setEmployees]=useState([]);
  const [addModel, setaddModel]=useState(false);
  const [editModel, seteditModel]=useState(false);
  const [selectedEmployee, setSelectedEmployee]=useState(null);
  const [formData, setFormData]=useState({
    firstName: '',
    lastName: '',
    email: '',
    salary: ''
});
const [error, setError] = useState('');
const navigate = useNavigate();
const fetchEmployees = async () => {
    try {
        const response = await fetch('https://kind-jade-panther-belt.cyclic.app/');
        const data = await response.json();
        setEmployees(data);
    }
    catch (error) {
        setError(error.message);
    }
};
useEffect(()=>{
    fetchEmployees();
}, []);

const handleInputChange=(e)=>{
    const{name, value}=e.target;
    setFormData({
        ...formData,
        [name]:value
    });
};

//add employee data
const handleAddEmployee=async()=>{
    try {
      const requestBody={
        FirstName: formData.firstName,
        LastName: formData.lastName,
        Email: formData.email,
        Salary: formData.salary,
        Department: formData.department
    };
    const response = await fetch('https://kind-jade-panther-belt.cyclic.app/employee', {
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body: JSON.stringify(requestBody)
    });
    if(response.ok){
        const data = await response.json();
        console.log('Employee added successfully:', data);
        fetchEmployees();
        setaddModel(false);
    }else{
        throw new Error('Failed to add employee');
    }
    } catch (error) {
      console.error('Error adding employee:', error.message);
      setError(error.message);
    }
};

//edit employee data
const handleEditEmployee=(employeeId)=>{
    const employee=employees.find(emp=>emp.id===employeeId);
    setSelectedEmployee(employee);
    seteditModel(true);
};

//delete employee data
const handleDeleteEmployee=(employeeId)=>{
    const updatedEmployees=employees.filter(emp=>emp.id!==employeeId);
    setEmployees(updatedEmployees);
};

//logout
const handleLogout = () => {
    navigate('/');
};

return (
    <Box textAlign="center" mt={10}>
        <Button onClick={() => setaddModel(true)}>Add Employee</Button>
        <Button ml={10} onClick={handleLogout}>Logout</Button>

        <Table variant="striped" mt={6}>
            <Thead>
            <Tr>
                <Th>First Name</Th>
                <Th>Last Name</Th>
                <Th>Email</Th>
                <Th>Salary</Th>
                <Th>Actions</Th>
            </Tr>
            </Thead>
            <Tbody>
            {employees.map((employee)=>(
                <Tr key={employee._id}>
                <Td>{employee.FirstName}</Td>
                <Td>{employee.LastName}</Td>
                <Td>{employee.Email}</Td>
                <Td>{employee.Salary}</Td>
                <Td>
                    <Button bg={'none'} onClick={()=>handleEditEmployee(employee.id)}>Edit</Button>
                    <Button bg={'none'} onClick={()=>handleDeleteEmployee(employee.id)}>Delete</Button>
                </Td>
                </Tr>
            ))}
            </Tbody>
        </Table>

        <Modal isOpen={addModel} onClose={() => setaddModel(false)}>
            <ModalOverlay/>
            <ModalContent>
                <ModalHeader>Add Employee</ModalHeader>
                <ModalCloseButton/>
                <ModalBody>

                    <FormControl>
                        <FormLabel>First Name</FormLabel>
                        <Input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} />
                        </FormControl>
                        <FormControl>
                        <FormLabel>Last Name</FormLabel>
                        <Input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} />
                        </FormControl>
                        <FormControl>
                        <FormLabel>Email</FormLabel>
                        <Input type="email" name="email" value={formData.email} onChange={handleInputChange} />
                        </FormControl>
                        <FormControl mt={4}>
                        <FormLabel>Department</FormLabel>
                        <Select placeholder="Select department" name="department" value={formData.department} onChange={handleInputChange}>
                            <option value="Tech">Tech</option>
                            <option value="Marketing">Marketing</option>
                            <option value="Operations">Operations</option>
                        </Select>
                        </FormControl>
                        <FormControl>
                        <FormLabel>Salary</FormLabel>
                        <Input type="number" name="salary" value={formData.salary} onChange={handleInputChange} />
                    </FormControl>

                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={handleAddEmployee}>Save</Button>
                    <Button onClick={() => setaddModel(false)}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>

        <Modal isOpen={editModel} onClose={() => seteditModel(false)}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Edit Employee</ModalHeader>
                <ModalCloseButton />
                    <ModalBody>
                    <FormControl>
                        <FormLabel>Number</FormLabel>
                            <Input  />
                            </FormControl>
                            <FormControl>
                            <FormLabel>First Name</FormLabel>
                            <Input defaultValue={selectedEmployee?.firstName} />
                            </FormControl>
                            <FormControl>
                            <FormLabel>Last Name</FormLabel>
                            <Input defaultValue={selectedEmployee?.lastName} />
                            </FormControl>
                            <FormControl>
                            <FormLabel>Email</FormLabel>
                            <Input type="email" defaultValue={selectedEmployee?.email} />
                            </FormControl>
                            <FormControl>
                            <FormLabel>Salary</FormLabel>
                            <Input type="number" defaultValue={selectedEmployee?.salary} />
                        </FormControl>
                    </ModalBody>
                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={() => seteditModel(false)}>
                    Save
                    </Button>
                    <Button onClick={() => seteditModel(false)}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    </Box>
  );
};

export default Dashboard;
