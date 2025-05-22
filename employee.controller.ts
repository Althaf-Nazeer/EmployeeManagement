import EmployeeService from "../services/employee.service";
import EmployeeRepository from "../repositories/employee.repository";
import {Request, Response, Router, NextFunction} from "express";
import employeeRouter from "../routes/employee.route";
import HttpException from "../exception/httpException";
import { isEmail } from "../validators/emailValidator";
import { Validate } from "class-validator";
import { plainToInstance } from "class-transformer";
import { CreateEmployeeDto } from "../dto/createEmployeeDto";
import { UpdateEmployeeDto } from "../dto/updateEmployeeDto";

class EmployeeController {
    constructor(private employeeService: EmployeeService, router:Router){
        router.post("/",this.createEmployee.bind(this));
        router.get("/", this.getAllEmployees.bind(this));
        router.get("/:id", this.getEmployeeById.bind(this));
        router.put("/:id", this.updateEmployee.bind(this));
        router.delete("/:id", this.deleteEmployee.bind(this));
    }

    public async createEmployee(req:Request, res: Response, next: NextFunction) {
            try {
      const createEmployeeDto = plainToInstance(CreateEmployeeDto, req.body);
      const errors = await Validate(CreateEmployeeDto);
      if (errors.length > 0) {
        console.log(JSON.stringify(errors));
        throw new HttpException(400, JSON.stringify(errors));
      }
      const savedEmployee = await this.employeeService.createEmployee(
        createEmployeeDto.email,
        createEmployeeDto.name,
        createEmployeeDto.age,
        createEmployeeDto.address
      );
      res.status(201).send(savedEmployee);
    } catch (error) {
      next(error);
    }
    }

    async getAllEmployees(req: Request, res: Response) {
        const employees = await this.employeeService.getAllEmployees();
        res.status(200).send(employees);
    }

    public async getEmployeeById(req:Request, res:Response, next: NextFunction) {
    try {
        
        const id = Number(req.params.id);
        const employee = await this.employeeService.getEmployeeById(id);
        if (!employee) {
            throw new HttpException(404,'employee not found');
        }
        res.status(200).send(employee);
    }
     catch (err){
        console.log(err);
        next(err);
    }
}

    // public async createEmployee(req:Request, res: Response, next: NextFunction) {
    //         try {
    //   const createEmployeeDto = plainToInstance(CreateEmployeeDto, req.body);
    //   const errors = await Validate(CreateEmployeeDto);
    //   if (errors.length > 0) {
    //     console.log(JSON.stringify(errors));
    //     throw new HttpException(400, JSON.stringify(errors));
    //   }
    //   const savedEmployee = await this.employeeService.createEmployee(
    //     createEmployeeDto.email,
    //     createEmployeeDto.name,
    //     createEmployeeDto.age,
    //     createEmployeeDto.address
    //   );
    //   res.status(201).send(savedEmployee);
    // } catch (error) {
    //   next(error);
    // }
    // }

    public async updateEmployee(req: Request, res: Response, next : NextFunction) {
        try {
            const updateEmployeeDto = plainToInstance(UpdateEmployeeDto, req.body)
        }
    }
    

    // async updateEmployee(req:Request, res:Response) {
    //     const id = Number(req.params.id);
    //     const name = req.body.name;
    //     const email = req.body.email;
    //     await this.employeeService.updateEmployee(id, email, name);
    //     res.status(200).send();
    // }

    async deleteEmployee(req:Request, res:Response) {
        const id = Number(req.params.id);
        await this.employeeService.deleteEmployee(id);
        res.status(200).send();
    }

}


export default EmployeeController;