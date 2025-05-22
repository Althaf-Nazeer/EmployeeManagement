//ACTUAL BUSINESS LOGIC COMES HERE (IN SERVICE)

import EmployeeRepository from "../repositories/employee.repository";
import Employee from "../entities/employee.entity";
import Address from "../entities/address.entity";
import { CreateAddressDto } from "../dto/createAddressDto";
class EmployeeService {
    constructor(private employeeRepository) {}

    async createEmployee( email: string, name: string, age: number, address: CreateAddressDto) : Promise<Employee> {
        const newEmployee=new Employee();
        newEmployee.name=name;
        newEmployee.email=email;
        newEmployee.age=age;
        newEmployee.address= address as CreateAddressDto;
        return this.employeeRepository.create(newEmployee);
    }

    async getAllEmployees(): Promise<Employee[]> {
        return this.employeeRepository.findMany();
    }

    async getEmployeeById(id: Number): Promise<Employee> {
        return this.employeeRepository.findOneById(id);
    }

    async updateEmployee(id: Number, name:string, email:string):Promise<void>{
        const existingEmployee = await this.employeeRepository.findOneById(id);
        if (existingEmployee) {
            const employee = new Employee();
            employee.name = name;
            employee.email = email;
            await this.employeeRepository.update(id, employee);
        }
    }

    async deleteEmployee(id: Number): Promise<void> {
        const existingEmployee = await this.employeeRepository.findOneById({id});
        if (existingEmployee){
            await this.employeeRepository.delete({id});
    }
}

    
}

export default EmployeeService;